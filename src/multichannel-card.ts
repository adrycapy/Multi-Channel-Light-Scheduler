import { HomeAssistant } from "custom-card-helpers";
import { LitElement, PropertyValues, TemplateResult, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import "./chart-canvas";
import { cardStyles } from "./styles";
import { CardConfig, ChannelConfig, ScheduleNode, SchedulerPayload } from "./types";

const WS_GET_CONFIG = "multichannel_scheduler/get_config";
const WS_SAVE_SCHEDULE = "multichannel_scheduler/save_schedule";

@customElement("multichannel-scheduler-card")
export class MultichannelSchedulerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private config: CardConfig = { type: "custom:multichannel-scheduler-card" };
  @state() private channels: ChannelConfig[] = [];
  @state() private nodes: ScheduleNode[] = [];
  @state() private selectedIndex = -1;
  @state() private activeChannelId = 1;
  @state() private loading = false;
  @state() private errorMessage = "";

  private saveTimer: number | undefined;
  private loadedOnce = false;

  static override styles = [cardStyles];

  public setConfig(config: CardConfig): void {
    this.config = config;
    const configChannels = (config.channels ?? []).slice().sort((a, b) => a.id - b.id);
    if (configChannels.length > 0) {
      this.channels = configChannels;
    }

    const channels = this.effectiveChannels;
    if (channels.length > 0) {
      this.activeChannelId = config.active_channel_id ?? channels[0].id;
    }
  }

  protected override willUpdate(changedProps: PropertyValues): void {
    if (changedProps.has("hass") && this.hass && !this.loadedOnce) {
      this.loadedOnce = true;
      void this.loadFromBackend();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? "Multichannel Light Scheduler"}</div>
          <div class="actions">
            <button @click=${this.saveNow}>Guardar</button>
          </div>
        </div>

        <div class="content">
          <multichannel-chart-canvas
            .channels=${this.effectiveChannels}
            .nodes=${this.nodes}
            .selectedIndex=${this.selectedIndex}
            .activeChannelId=${this.activeChannelId}
            .chartScale=${this.config.chart_scale ?? 1}
            @nodes-changed=${this.onNodesChanged}
            @node-selected=${this.onNodeSelected}
          ></multichannel-chart-canvas>

          ${this.renderInspector()} ${this.errorMessage
            ? html`<div class="helper">${this.errorMessage}</div>`
            : html`<div class="helper">Arrastra nodos en el gráfico o edita con precisión abajo.</div>`}
        </div>
      </ha-card>
    `;
  }

  private renderInspector(): TemplateResult {
    const node = this.nodes[this.selectedIndex];

    if (!node) {
      return html`
        <div class="inspector">
          <div class="field">
            <label>Canal activo para arrastre</label>
            ${this.renderActiveChannelSelector()}
          </div>
        </div>
      `;
    }

    return html`
      <div class="inspector">
        <div class="field">
          <label>Canal activo para arrastre</label>
          ${this.renderActiveChannelSelector()}
        </div>

        <div class="field">
          <label>Hora exacta</label>
          <input type="time" step="1" .value=${node.time} @input=${this.onTimeChanged} />
        </div>

        ${this.effectiveChannels.map((channel) => {
          const key = String(channel.id);
          const value = Number(node.values[key] ?? 0);
          return html`
            <div class="field">
              <label>${channel.name}</label>
              <input
                type="range"
                min="0"
                max="100"
                .value=${String(value)}
                @input=${(ev: Event) => this.onChannelValueChanged(ev, channel.id)}
              />
              <input
                type="number"
                min="0"
                max="100"
                .value=${String(value)}
                @input=${(ev: Event) => this.onChannelValueChanged(ev, channel.id)}
              />
            </div>
          `;
        })}

        <div class="actions">
          <button class="danger" @click=${this.deleteSelectedNode}>Eliminar nodo</button>
        </div>
      </div>
    `;
  }

  private renderActiveChannelSelector(): TemplateResult {
    const channels = this.effectiveChannels;
    return html`
      <select .value=${String(this.activeChannelId)} @change=${this.onActiveChannelChanged}>
        ${channels.map(
          (channel) => html`<option value=${String(channel.id)}>${channel.name}</option>`
        )}
      </select>
    `;
  }

  private onActiveChannelChanged(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (Number.isFinite(value)) {
      this.activeChannelId = value;
    }
  }

  private onNodesChanged(event: CustomEvent<{ nodes: ScheduleNode[]; selectedIndex: number }>): void {
    this.nodes = this.normalizeNodes(event.detail.nodes);
    this.selectedIndex = event.detail.selectedIndex;
    this.scheduleSave();
  }

  private onNodeSelected(event: CustomEvent<{ index: number }>): void {
    this.selectedIndex = event.detail.index;
  }

  private onTimeChanged(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      return;
    }

    const nodes = this.nodes.slice();
    if (!nodes[this.selectedIndex]) {
      return;
    }

    nodes[this.selectedIndex] = {
      ...nodes[this.selectedIndex],
      time: this.ensureHHMMSS(value),
    };

    this.nodes = this.normalizeNodes(nodes);
    this.selectedIndex = this.nodes.findIndex((node) => node.time === this.ensureHHMMSS(value));
    this.scheduleSave();
  }

  private onChannelValueChanged(event: Event, channelId: number): void {
    const numeric = Number((event.target as HTMLInputElement).value);
    const value = Math.max(0, Math.min(100, Math.round(Number.isFinite(numeric) ? numeric : 0)));

    const nodes = this.nodes.slice();
    if (!nodes[this.selectedIndex]) {
      return;
    }

    const current = nodes[this.selectedIndex];
    nodes[this.selectedIndex] = {
      ...current,
      values: {
        ...current.values,
        [String(channelId)]: value,
      },
    };

    this.nodes = nodes;
    this.requestUpdate();
    this.scheduleSave();
  }

  private deleteSelectedNode(): void {
    if (this.selectedIndex < 0 || this.selectedIndex >= this.nodes.length) {
      return;
    }

    const nodes = this.nodes.slice();
    nodes.splice(this.selectedIndex, 1);
    this.nodes = nodes;
    this.selectedIndex = Math.min(nodes.length - 1, this.selectedIndex);
    this.scheduleSave();
  }

  private scheduleSave(): void {
    if (this.saveTimer !== undefined) {
      window.clearTimeout(this.saveTimer);
    }

    this.saveTimer = window.setTimeout(() => {
      void this.saveNow();
    }, 220);
  }

  private async loadFromBackend(): Promise<void> {
    if (!this.hass) {
      return;
    }

    this.loading = true;
    this.errorMessage = "";

    try {
      const payload = (await this.hass.callWS({ type: WS_GET_CONFIG })) as SchedulerPayload;
      const backendChannels = payload.config?.channels ?? [];
      const backendNodes = payload.nodes ?? [];
      const configChannels = (this.config.channels ?? []).slice().sort((a, b) => a.id - b.id);

      // YAML card configuration is the source of truth for channel definitions.
      if (configChannels.length > 0) {
        const normalizedNodes = this.normalizeNodesForChannels(
          backendNodes.length > 0 ? backendNodes : this.defaultNodes(configChannels),
          configChannels
        );

        this.channels = configChannels;
        this.nodes = normalizedNodes;

        if (
          !this.areChannelsEqual(backendChannels, configChannels) ||
          !this.areNodesCompatibleWithChannels(backendNodes, configChannels)
        ) {
          await this.savePayload({
            version: 1,
            config: { channels: configChannels },
            nodes: normalizedNodes,
          });
        }
      } else if (backendChannels.length > 0) {
        this.channels = backendChannels;
        this.nodes = this.normalizeNodes(backendNodes.length > 0 ? backendNodes : this.defaultNodes(backendChannels));
      } else if (this.channels.length > 0) {
        const fallbackNodes = this.defaultNodes(this.channels);
        this.nodes = fallbackNodes;
        await this.savePayload({
          version: 1,
          config: { channels: this.channels },
          nodes: fallbackNodes,
        });
      } else {
        this.nodes = [];
      }

      if (this.channels.length > 0) {
        const hasActive = this.channels.some((channel) => channel.id === this.activeChannelId);
        if (!hasActive) {
          this.activeChannelId = this.channels[0].id;
        }
      }

      this.selectedIndex = this.nodes.length > 0 ? 0 : -1;
    } catch (error) {
      this.errorMessage = `No se pudo cargar configuración: ${String(error)}`;
    } finally {
      this.loading = false;
    }
  }

  private async saveNow(): Promise<void> {
    const channels = this.effectiveChannels;
    if (!this.hass || channels.length === 0) {
      return;
    }

    const payload: SchedulerPayload = {
      version: 1,
      config: { channels },
      nodes: this.normalizeNodesForChannels(this.nodes, channels),
    };

    await this.savePayload(payload);
  }

  private async savePayload(payload: SchedulerPayload): Promise<void> {
    try {
      this.errorMessage = "";
      await this.hass.callWS({ type: WS_SAVE_SCHEDULE, payload });
    } catch (error) {
      this.errorMessage = `No se pudo guardar: ${String(error)}`;
    }
  }

  private normalizeNodes(nodes: ScheduleNode[]): ScheduleNode[] {
    const normalized = nodes
      .map((node) => ({
        time: this.ensureHHMMSS(node.time),
        values: { ...node.values },
      }))
      .sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time));

    return normalized;
  }

  private normalizeNodesForChannels(nodes: ScheduleNode[], channels: ChannelConfig[]): ScheduleNode[] {
    const channelKeys = channels.map((channel) => String(channel.id));
    return this.normalizeNodes(nodes).map((node) => {
      const values: Record<string, number> = {};
      for (const key of channelKeys) {
        const raw = Number(node.values[key] ?? 0);
        values[key] = Math.max(0, Math.min(100, Math.round(Number.isFinite(raw) ? raw : 0)));
      }
      return {
        time: node.time,
        values,
      };
    });
  }

  private areChannelsEqual(a: ChannelConfig[], b: ChannelConfig[]): boolean {
    if (a.length !== b.length) {
      return false;
    }

    const sa = a.slice().sort((x, y) => x.id - y.id);
    const sb = b.slice().sort((x, y) => x.id - y.id);

    return sa.every((channel, index) => {
      const other = sb[index];
      return (
        channel.id === other.id &&
        channel.entity_id === other.entity_id &&
        channel.name === other.name &&
        channel.color.toUpperCase() === other.color.toUpperCase()
      );
    });
  }

  private areNodesCompatibleWithChannels(nodes: ScheduleNode[], channels: ChannelConfig[]): boolean {
    const keys = new Set(channels.map((channel) => String(channel.id)));
    return nodes.every((node) => {
      const nodeKeys = Object.keys(node.values ?? {});
      if (nodeKeys.length !== keys.size) {
        return false;
      }
      return nodeKeys.every((key) => keys.has(String(key)));
    });
  }

  private defaultNodes(channels: ChannelConfig[]): ScheduleNode[] {
    const baseValues: Record<string, number> = {};
    channels.forEach((channel) => {
      baseValues[String(channel.id)] = 0;
    });

    return [
      { time: "00:00:00", values: { ...baseValues } },
      { time: "23:59:59", values: { ...baseValues } },
    ];
  }

  private ensureHHMMSS(value: string): string {
    const parts = value.split(":").map((part) => Number(part));
    const h = Number.isFinite(parts[0]) ? parts[0] : 0;
    const m = Number.isFinite(parts[1]) ? parts[1] : 0;
    const s = Number.isFinite(parts[2]) ? parts[2] : 0;
    return [h, m, s].map((part) => String(part).padStart(2, "0")).join(":");
  }

  private timeToSeconds(time: string): number {
    const [h, m, s] = time.split(":").map((part) => Number(part));
    return h * 3600 + m * 60 + s;
  }

  public static getStubConfig(): CardConfig {
    return {
      type: "custom:multichannel-scheduler-card",
      title: "Reef Light Scheduler",
      channels: [
        {
          id: 1,
          entity_id: "light.reef_channel_1",
          name: "Channel 1",
          color: "#3B82F6",
        },
      ],
      active_channel_id: 1,
    };
  }

  public getCardSize(): number {
    const scale = Number(this.config.chart_scale ?? 1);
    const normalized = Number.isFinite(scale) ? Math.max(0.8, Math.min(2, scale)) : 1;
    return Math.max(8, Math.round(8 * normalized));
  }

  private get effectiveChannels(): ChannelConfig[] {
    const configChannels = (this.config.channels ?? []).slice().sort((a, b) => a.id - b.id);
    if (configChannels.length > 0) {
      return configChannels;
    }

    return this.channels.slice().sort((a, b) => a.id - b.id);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "multichannel-scheduler-card": MultichannelSchedulerCard;
  }
}

import { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import { LitElement, TemplateResult, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { CardConfig, ChannelConfig } from "./types";

@customElement("multichannel-scheduler-editor")
export class MultichannelSchedulerEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config: CardConfig = { type: "custom:multichannel-scheduler-card", channels: [] };

  static override styles = css`
    :host {
      display: block;
      padding: 8px 0;
    }

    .row {
      display: grid;
      gap: 8px;
      grid-template-columns: 48px 1fr 1fr 120px 40px;
      margin-bottom: 8px;
      align-items: center;
    }

    input,
    select,
    button {
      padding: 8px;
      border-radius: 8px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
    }

    button {
      cursor: pointer;
    }

    @media (max-width: 920px) {
      .row {
        grid-template-columns: 1fr;
      }
    }
  `;

  public setConfig(config: CardConfig): void {
    this.config = {
      ...config,
      channels: (config.channels ?? []).slice().sort((a, b) => a.id - b.id),
    };
  }

  protected override render(): TemplateResult {
    const channels = this.config.channels ?? [];
    const lightEntities = Object.keys(this.hass.states).filter((entityId) => entityId.startsWith("light."));

    return html`
      <div class="row">
        <input
          type="text"
          .value=${this.config.title ?? ""}
          placeholder="Título"
          @input=${(ev: Event) => this.onConfigFieldChanged("title", (ev.target as HTMLInputElement).value)}
        />
        <button @click=${this.addChannel}>Agregar canal</button>
      </div>

      ${channels.map(
        (channel) => html`
          <div class="row">
            <input type="number" min="1" max="10" .value=${String(channel.id)} @input=${(ev: Event) => this.onChannelChanged(channel.id, "id", Number((ev.target as HTMLInputElement).value))} />
            <select @change=${(ev: Event) => this.onChannelChanged(channel.id, "entity_id", (ev.target as HTMLSelectElement).value)}>
              ${lightEntities.map(
                (entityId) =>
                  html`<option value=${entityId} ?selected=${entityId === channel.entity_id}>${entityId}</option>`
              )}
            </select>
            <input type="text" .value=${channel.name} @input=${(ev: Event) => this.onChannelChanged(channel.id, "name", (ev.target as HTMLInputElement).value)} />
            <input type="color" .value=${channel.color} @input=${(ev: Event) => this.onChannelChanged(channel.id, "color", (ev.target as HTMLInputElement).value)} />
            <button @click=${() => this.removeChannel(channel.id)}>X</button>
          </div>
        `
      )}
    `;
  }

  private onConfigFieldChanged(field: keyof CardConfig, value: unknown): void {
    this.config = {
      ...this.config,
      [field]: value,
    };
    this.emitConfig();
  }

  private onChannelChanged(channelId: number, field: keyof ChannelConfig, value: unknown): void {
    const channels = (this.config.channels ?? []).map((channel) => {
      if (channel.id !== channelId) {
        return channel;
      }
      return {
        ...channel,
        [field]: value,
      };
    });

    this.config = {
      ...this.config,
      channels,
    };
    this.emitConfig();
  }

  private addChannel = (): void => {
    const channels = (this.config.channels ?? []).slice();
    if (channels.length >= 10) {
      return;
    }

    const usedIds = new Set(channels.map((channel) => channel.id));
    let newId = 1;
    while (usedIds.has(newId) && newId <= 10) {
      newId += 1;
    }

    channels.push({
      id: newId,
      entity_id: "light.",
      name: `Channel ${newId}`,
      color: "#3B82F6",
    });

    this.config = {
      ...this.config,
      channels,
    };
    this.emitConfig();
  };

  private removeChannel(channelId: number): void {
    const channels = (this.config.channels ?? []).filter((channel) => channel.id !== channelId);
    this.config = {
      ...this.config,
      channels,
    };
    this.emitConfig();
  }

  private emitConfig(): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "multichannel-scheduler-editor": MultichannelSchedulerEditor;
  }
}

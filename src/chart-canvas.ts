import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { ChannelConfig, ScheduleNode } from "./types";

const WIDTH = 1200;
const BASE_HEIGHT = 420;
const BASE_PADDING = { left: 52, right: 18, top: 20, bottom: 34 };
const MAX_SECONDS = 24 * 60 * 60 - 1;

@customElement("multichannel-chart-canvas")
export class MultichannelChartCanvas extends LitElement {
  @property({ attribute: false }) channels: ChannelConfig[] = [];
  @property({ attribute: false }) nodes: ScheduleNode[] = [];
  @property({ type: Number }) selectedIndex = -1;
  @property({ type: Number }) activeChannelId = 1;
  @property({ type: Number }) chartScale = 1;

  @state() private dragIndex = -1;

  private pointerMoveHandler = (event: PointerEvent): void => this.onPointerMove(event);
  private pointerUpHandler = (): void => this.onPointerUp();

  static override styles = css`
    :host {
      display: block;
      background: rgba(15, 23, 42, 0.4);
      border-radius: 12px;
      border: 1px solid rgba(203, 213, 225, 0.2);
      overflow: hidden;
      touch-action: none;
    }

    svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .axis-label {
      fill: #dbeafe;
      font-size: 12px;
      user-select: none;
    }

    .grid {
      stroke: rgba(148, 163, 184, 0.35);
      stroke-width: 1;
    }

    .track {
      fill: none;
      stroke-width: 2.2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .node {
      cursor: pointer;
      stroke: #e2e8f0;
      stroke-width: 1.2;
    }

    .node.selected {
      stroke-width: 2.3;
      stroke: #f8fafc;
    }
  `;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeGlobalListeners();
  }

  override render() {
    return html`
      <svg
        viewBox="0 0 ${WIDTH} ${this.chartHeight}"
        @click=${this.onBackgroundClick}
        role="img"
        aria-label="Multichannel light scheduler chart"
      >
        ${this.renderGrid()} ${this.renderTracks()} ${this.renderNodes()}
      </svg>
    `;
  }

  private renderGrid() {
    const rows = 5;
    const cols = 12;
    const padding = this.padding;
    const plotHeight = this.plotHeight;
    const plotWidth = this.plotWidth;
    const chartHeight = this.chartHeight;

    return svg`
      ${Array.from({ length: rows + 1 }, (_, i) => {
        const y = padding.top + (plotHeight / rows) * i;
        const label = 100 - Math.round((100 / rows) * i);
        return svg`
          <line class="grid" x1="${padding.left}" y1="${y}" x2="${WIDTH - padding.right}" y2="${y}"></line>
          <text class="axis-label" x="${padding.left - 8}" y="${y + 4}" text-anchor="end">${label}%</text>
        `;
      })}
      ${Array.from({ length: cols + 1 }, (_, i) => {
        const x = padding.left + (plotWidth / cols) * i;
        const hour = String((24 / cols) * i).padStart(2, "0");
        return svg`
          <line class="grid" x1="${x}" y1="${padding.top}" x2="${x}" y2="${padding.top + plotHeight}"></line>
          <text class="axis-label" x="${x}" y="${chartHeight - 10}" text-anchor="middle">${hour}:00</text>
        `;
      })}
    `;
  }

  private renderTracks() {
    if (this.nodes.length === 0) {
      return nothing;
    }

    return this.channels.map((channel) => {
      const path = this.nodes
        .slice()
        .sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time))
        .map((node, index) => {
          const x = this.secondsToX(this.timeToSeconds(node.time));
          const y = this.valueToY(Number(node.values[String(channel.id)] ?? 0));
          return `${index === 0 ? "M" : "L"}${x},${y}`;
        })
        .join(" ");

      return svg`<path class="track" d="${path}" style="stroke:${channel.color}; opacity:${this.activeChannelId === channel.id ? 1 : 0.45}"></path>`;
    });
  }

  private renderNodes() {
    const channel = this.channels.find((item) => item.id === this.activeChannelId);
    if (!channel) {
      return nothing;
    }

    const sorted = this.getSortedNodes();

    return sorted.map((node, index) => {
      const x = this.secondsToX(this.timeToSeconds(node.time));
      const y = this.valueToY(Number(node.values[String(channel.id)] ?? 0));
      const selectedClass = this.selectedIndex === index ? "selected" : "";

      return svg`
        <circle
          class="node ${selectedClass}"
          cx="${x}"
          cy="${y}"
          r="${this.selectedIndex === index ? 6.5 : 5}"
          fill="${channel.color}"
          @click=${(event: MouseEvent) => this.onNodeClick(event, index)}
          @pointerdown=${(event: PointerEvent) => this.onPointerDown(event, index)}
        ></circle>
      `;
    });
  }

  private onNodeClick(event: MouseEvent, index: number): void {
    event.stopPropagation();
    this.dispatchEvent(
      new CustomEvent("node-selected", {
        detail: { index },
        bubbles: true,
        composed: true,
      })
    );
  }

  private onBackgroundClick(event: MouseEvent): void {
    const target = event.composedPath()[0] as Element;
    if (target.tagName.toLowerCase() === "circle") {
      return;
    }

    const svgElement = this.shadowRoot?.querySelector("svg");
    if (!svgElement) {
      return;
    }

    const point = this.pointerToChart(svgElement, event.clientX, event.clientY);
    const seconds = this.xToSeconds(point.x);
    const value = this.yToValue(point.y);

    const nodes = this.getSortedNodes();
    const newNode = this.buildNode(seconds, value);
    nodes.push(newNode);
    this.sortNodesInPlace(nodes);

    const index = nodes.findIndex((node) => node.time === newNode.time);
    this.emitNodesChanged(nodes, index);
  }

  private onPointerDown(event: PointerEvent, index: number): void {
    event.stopPropagation();
    this.dragIndex = index;

    const target = event.currentTarget as Element;
    target.setPointerCapture(event.pointerId);

    window.addEventListener("pointermove", this.pointerMoveHandler);
    window.addEventListener("pointerup", this.pointerUpHandler);
  }

  private onPointerMove(event: PointerEvent): void {
    if (this.dragIndex < 0) {
      return;
    }

    const svgElement = this.shadowRoot?.querySelector("svg");
    if (!svgElement) {
      return;
    }

    const point = this.pointerToChart(svgElement, event.clientX, event.clientY);
    const seconds = this.xToSeconds(point.x);
    const value = this.yToValue(point.y);

    const channel = this.channels.find((item) => item.id === this.activeChannelId);
    if (!channel) {
      return;
    }

    const nodes = this.getSortedNodes();
    if (!nodes[this.dragIndex]) {
      return;
    }

    const dragged = { ...nodes[this.dragIndex], values: { ...nodes[this.dragIndex].values } };
    dragged.time = this.secondsToTime(seconds);
    dragged.values[String(channel.id)] = value;

    nodes[this.dragIndex] = dragged;
    this.sortNodesInPlace(nodes);

    const newIndex = nodes.findIndex(
      (item) => item.time === dragged.time && item.values[String(channel.id)] === value
    );
    this.emitNodesChanged(nodes, newIndex >= 0 ? newIndex : this.dragIndex);
  }

  private onPointerUp(): void {
    this.dragIndex = -1;
    this.removeGlobalListeners();
  }

  private removeGlobalListeners(): void {
    window.removeEventListener("pointermove", this.pointerMoveHandler);
    window.removeEventListener("pointerup", this.pointerUpHandler);
  }

  private emitNodesChanged(nodes: ScheduleNode[], selectedIndex: number): void {
    this.dispatchEvent(
      new CustomEvent("nodes-changed", {
        detail: { nodes, selectedIndex },
        bubbles: true,
        composed: true,
      })
    );
  }

  private buildNode(seconds: number, activeValue: number): ScheduleNode {
    const values: Record<string, number> = {};

    for (const channel of this.channels) {
      if (channel.id === this.activeChannelId) {
        values[String(channel.id)] = activeValue;
      } else {
        values[String(channel.id)] = this.interpolateChannelValue(this.getSortedNodes(), channel.id, seconds);
      }
    }

    return {
      time: this.secondsToTime(seconds),
      values,
    };
  }

  private interpolateChannelValue(nodes: ScheduleNode[], channelId: number, seconds: number): number {
    if (nodes.length === 0) {
      return 0;
    }
    if (nodes.length === 1) {
      return Number(nodes[0].values[String(channelId)] ?? 0);
    }

    const sorted = nodes
      .slice()
      .sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time));

    const times = sorted.map((node) => this.timeToSeconds(node.time));
    const values = sorted.map((node) => Number(node.values[String(channelId)] ?? 0));

    let normalized = seconds;
    const expandedTimes = [...times, times[0] + 86400];
    const expandedValues = [...values, values[0]];

    if (normalized < expandedTimes[0]) {
      normalized += 86400;
    }

    for (let i = 0; i < expandedTimes.length - 1; i += 1) {
      const t0 = expandedTimes[i];
      const t1 = expandedTimes[i + 1];
      if (normalized >= t0 && normalized <= t1) {
        const v0 = expandedValues[i];
        const v1 = expandedValues[i + 1];
        if (t1 === t0) {
          return Math.max(0, Math.min(100, Math.round(v0)));
        }
        const ratio = (normalized - t0) / (t1 - t0);
        return Math.max(0, Math.min(100, Math.round(v0 + ratio * (v1 - v0))));
      }
    }

    return Math.max(0, Math.min(100, Math.round(expandedValues[expandedValues.length - 1])));
  }

  private getSortedNodes(): ScheduleNode[] {
    return this.nodes
      .map((node) => ({ ...node, values: { ...node.values } }))
      .sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time));
  }

  private sortNodesInPlace(nodes: ScheduleNode[]): void {
    nodes.sort((a, b) => this.timeToSeconds(a.time) - this.timeToSeconds(b.time));
  }

  private pointerToChart(svgElement: SVGSVGElement, clientX: number, clientY: number): { x: number; y: number } {
    const rect = svgElement.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * WIDTH;
    const y = ((clientY - rect.top) / rect.height) * this.chartHeight;
    return { x, y };
  }

  private secondsToX(seconds: number): number {
    return this.padding.left + (Math.max(0, Math.min(MAX_SECONDS, seconds)) / MAX_SECONDS) * this.plotWidth;
  }

  private xToSeconds(x: number): number {
    const clampedX = Math.max(this.padding.left, Math.min(WIDTH - this.padding.right, x));
    const ratio = (clampedX - this.padding.left) / this.plotWidth;
    return Math.round(ratio * MAX_SECONDS);
  }

  private valueToY(value: number): number {
    const clamped = Math.max(0, Math.min(100, value));
    return this.padding.top + ((100 - clamped) / 100) * this.plotHeight;
  }

  private yToValue(y: number): number {
    const clampedY = Math.max(this.padding.top, Math.min(this.padding.top + this.plotHeight, y));
    const ratio = (clampedY - this.padding.top) / this.plotHeight;
    return Math.max(0, Math.min(100, Math.round(100 - ratio * 100)));
  }

  private get normalizedScale(): number {
    const scale = Number(this.chartScale);
    if (!Number.isFinite(scale)) {
      return 1;
    }

    return Math.max(0.8, Math.min(2, scale));
  }

  private get chartHeight(): number {
    return Math.round(BASE_HEIGHT * this.normalizedScale);
  }

  private get padding(): { left: number; right: number; top: number; bottom: number } {
    const scale = this.normalizedScale;
    return {
      left: BASE_PADDING.left * scale,
      right: BASE_PADDING.right * scale,
      top: BASE_PADDING.top * scale,
      bottom: BASE_PADDING.bottom * scale,
    };
  }

  private get plotWidth(): number {
    return WIDTH - this.padding.left - this.padding.right;
  }

  private get plotHeight(): number {
    return this.chartHeight - this.padding.top - this.padding.bottom;
  }

  private timeToSeconds(time: string): number {
    const [h, m, s] = time.split(":").map((part) => Number(part));
    return h * 3600 + m * 60 + s;
  }

  private secondsToTime(seconds: number): string {
    const clamped = Math.max(0, Math.min(MAX_SECONDS, seconds));
    const h = Math.floor(clamped / 3600);
    const m = Math.floor((clamped % 3600) / 60);
    const s = clamped % 60;
    return [h, m, s].map((part) => String(part).padStart(2, "0")).join(":");
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "multichannel-chart-canvas": MultichannelChartCanvas;
  }
}

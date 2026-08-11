export interface ChannelConfig {
  id: number;
  entity_id: string;
  name: string;
  color: string;
}

export interface ScheduleNode {
  time: string;
  values: Record<string, number>;
}

export interface SchedulerPayload {
  version: number;
  config: {
    channels: ChannelConfig[];
  };
  nodes: ScheduleNode[];
}

export interface CardConfig {
  type: string;
  title?: string;
  channels?: ChannelConfig[];
  active_channel_id?: number;
  chart_scale?: number;
}

export interface CanvasState {
  selectedIndex: number;
  activeChannelId: number;
}

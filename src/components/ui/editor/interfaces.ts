export interface FillPayload {
  type: string;
  isOn: boolean;
}

export interface EmojiPayload {
  timestamp: Date | null;
  value: string;
}
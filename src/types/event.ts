export const BANGKOK_TIMEZONE = "Asia/Bangkok";

export type TcasEventType = "application" | "exam" | "result" | "payment" | "other";

export interface TcasEvent {
  id: string;
  name: string;
  type: TcasEventType;
  startAt: string;
  endAt: string;
  timezone: typeof BANGKOK_TIMEZONE;
  description: string;
}

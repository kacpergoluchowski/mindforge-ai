export type NotificationIconType =
  | "achievement"
  | "challenge"
  | "course"
  | "lesson"
  | "xp";

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  description?: string;
  time: string;
  icon: NotificationIconType;
};

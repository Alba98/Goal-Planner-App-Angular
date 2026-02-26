export interface ReminderRequest {
  reminderId: number;
  title: string;
  description: string;
  reminderDateTime: string;
  isAcknowledged: boolean;
  userId: number;
}

export interface ReminderResponse {
  reminderId: number;
  title: string;
  description: string;
  reminderDateTime: string;
  isAcknowledged: boolean;
  userId: number;
  // Campos calculados para el frontend
  timeRemaining?: string;
  isOverdue?: boolean;
  isToday?: boolean;
  isTomorrow?: boolean;
  formattedDateTime?: string;
}

export interface ReminderStats {
  total: number;
  acknowledged: number;
  pending: number;
  overdue: number;
  today: number;
  tomorrow: number;
  thisWeek: number;
}
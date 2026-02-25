// models/goal.model.ts

export interface MilestoneRequest {
  milestoneId: number;
  milestoneName: string;
  description: string;
  targetDate: string;
  isCompleted: boolean;
}

export interface GoalRequest {
  goalId: number;
  goalName: string;
  description: string;
  startDate: string;
  endDate: string;
  isAchieved: boolean;
  userId: number;
  milestones: MilestoneRequest[];
}

// Para la respuesta de la API (get)
export interface MilestoneResponse {
  milestoneId: number;
  milestoneName: string;
  description: string;
  targetDate: string;
  isCompleted: boolean;
}

export interface GoalResponse {
  goalId: number;
  goalName: string;
  description: string;
  startDate: string;
  endDate: string;
  isAchieved: boolean;
  userId: number;
  milestones?: MilestoneResponse[];
  progress: number; // Campo calculado opcional para el frontend
}
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type TaskStatus = 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'RETRYING';

export interface Task {
  id: string;
  name: string;
  payload: Record<string, unknown>;
  priority: TaskPriority;
  status: TaskStatus;
  attempts: number;
  maxRetries: number;
  createdAt: Date;
  updatedAt: Date;
  error?: string;
}

export interface CreateTaskDTO {
  name: string;
  payload: Record<string, unknown>;
  priority?: TaskPriority;
  maxRetries?: number;
}

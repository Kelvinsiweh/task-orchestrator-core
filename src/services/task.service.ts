import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskDTO, TaskStatus } from '../domain/types';
import { EventBus } from '../events/event-bus';

export class TaskService {
  private tasks = new Map<string, Task>();
  private eventBus = EventBus.getInstance();

  public createTask(dto: CreateTaskDTO): Task {
    const now = new Date();
    const task: Task = {
      id: uuidv4(),
      name: dto.name,
      payload: dto.payload,
      priority: dto.priority || 'MEDIUM',
      status: 'PENDING',
      attempts: 0,
      maxRetries: dto.maxRetries ?? 3,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.set(task.id, task);
    this.eventBus.emit('task:created', task);
    return task;
  }

  public getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  public listTasks(status?: TaskStatus): Task[] {
    const all = Array.from(this.tasks.values());
    return status ? all.filter((t) => t.status === status) : all;
  }

  public async executeTask(id: string, executor: (payload: Record<string, unknown>) => Promise<void>): Promise<Task> {
    const task = this.tasks.get(id);
    if (!task) throw new Error(`Task ${id} not found`);

    task.status = 'RUNNING';
    task.attempts += 1;
    task.updatedAt = new Date();
    this.eventBus.emit('task:started', task);

    try {
      await executor(task.payload);
      task.status = 'COMPLETED';
      task.updatedAt = new Date();
      this.eventBus.emit('task:completed', task);
    } catch (err: any) {
      if (task.attempts < task.maxRetries) {
        task.status = 'RETRYING';
        this.eventBus.emit('task:retrying', task, task.attempts + 1);
      } else {
        task.status = 'FAILED';
        task.error = err.message || String(err);
        this.eventBus.emit('task:failed', task, err);
      }
      task.updatedAt = new Date();
    }

    return task;
  }
}

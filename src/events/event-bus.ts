import { EventEmitter } from 'events';
import { Task } from '../domain/types';

export type OrchestratorEvents = {
  'task:created': (task: Task) => void;
  'task:started': (task: Task) => void;
  'task:completed': (task: Task) => void;
  'task:failed': (task: Task, error: Error) => void;
  'task:retrying': (task: Task, nextAttempt: number) => void;
};

export class EventBus {
  private static instance: EventBus;
  private emitter = new EventEmitter();

  private constructor() {
    this.emitter.setMaxListeners(50);
  }

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public on<K extends keyof OrchestratorEvents>(event: K, listener: OrchestratorEvents[K]): void {
    this.emitter.on(event, listener as any);
  }

  public emit<K extends keyof OrchestratorEvents>(event: K, ...args: Parameters<OrchestratorEvents[K]>): boolean {
    return this.emitter.emit(event, ...args);
  }
}

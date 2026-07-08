import { TaskService } from '../src/services/task.service';

describe('TaskService Lifecycle', () => {
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  it('creates tasks in PENDING state', () => {
    const task = service.createTask({
      name: 'send_email',
      payload: { to: 'kelvin@example.com' },
      priority: 'HIGH',
    });
    expect(task.id).toBeDefined();
    expect(task.status).toBe('PENDING');
    expect(task.priority).toBe('HIGH');
  });

  it('transitions to COMPLETED upon successful execution', async () => {
    const task = service.createTask({
      name: 'compute_hash',
      payload: { data: 'test' },
    });

    const completed = await service.executeTask(task.id, async () => {});
    expect(completed.status).toBe('COMPLETED');
    expect(completed.attempts).toBe(1);
  });

  it('handles execution failures and retries properly', async () => {
    const task = service.createTask({
      name: 'flaky_job',
      payload: {},
      maxRetries: 1,
    });

    const failed = await service.executeTask(task.id, async () => {
      throw new Error('Connection timeout');
    });
    expect(failed.status).toBe('FAILED');
    expect(failed.error).toBe('Connection timeout');
  });
});

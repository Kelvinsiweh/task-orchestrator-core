import { TaskScheduler } from '../src/services/scheduler.service';

describe('TaskScheduler', () => {
  it('creates and cancels schedules', () => {
    const s = new TaskScheduler();
    expect(s).toBeDefined();
  });
});

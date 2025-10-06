export class TaskScheduler {
  private jobs = new Map<string, NodeJS.Timeout>();
  public scheduleInterval(id: string, intervalMs: number, fn: () => void) {
    const handle = setInterval(fn, intervalMs);
    this.jobs.set(id, handle);
  }
  public cancel(id: string) {
    const handle = this.jobs.get(id);
    if (handle) clearInterval(handle);
  }
}

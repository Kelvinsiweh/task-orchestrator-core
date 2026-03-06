import { EventBus } from './event-bus';
EventBus.getInstance().on('task:failed', (t, err) => {
  console.error(`[Task Failure] Task ${t.id} failed: ${err.message}`);
});

import express from 'express';
import { TaskService } from './services/task.service';
import { createTaskRouter } from './controllers/task.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const taskService = new TaskService();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'task-orchestrator', timestamp: new Date().toISOString() });
});

app.use('/api/tasks', createTaskRouter(taskService));

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Task Orchestrator listening on port ${port}`);
  });
}

export default app;

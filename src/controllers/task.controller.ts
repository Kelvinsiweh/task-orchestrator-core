import { Request, Response, Router } from 'express';
import { TaskService } from '../services/task.service';

export const createTaskRouter = (taskService: TaskService): Router => {
  const router = Router();

  router.post('/', (req: Request, res: Response) => {
    const { name, payload, priority, maxRetries } = req.body;
    if (!name || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Name and payload object are required.' });
    }
    const task = taskService.createTask({ name, payload, priority, maxRetries });
    return res.status(201).json(task);
  });

  router.get('/', (req: Request, res: Response) => {
    const status = req.query.status as any;
    const tasks = taskService.listTasks(status);
    return res.json(tasks);
  });

  router.get('/:id', (req: Request, res: Response) => {
    const task = taskService.getTask(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    return res.json(task);
  });

  return router;
};


router.delete('/:id', (req, res) => res.json({ status: 'cancelled' }));

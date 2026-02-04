import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { z } from 'zod';

// Task schema validation
const TaskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  tags: z.array(z.string()).optional(),
  assignee: z.string().optional(),
  comments: z.array(z.object({
    id: z.string().uuid(),
    text: z.string().min(1, "Comment cannot be empty"),
    createdAt: z.date(),
    author: z.string().optional()
  })).optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export type Task = z.infer<typeof TaskSchema>;

class TaskRepository {
  private filePath: string;

  constructor() {
    this.filePath = path.resolve(process.cwd(), 'data', 'tasks.json');
  }

  private async ensureDataDirectory() {
    const dataDir = path.dirname(this.filePath);
    await fs.mkdir(dataDir, { recursive: true });
  }

  private async readTasks(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const tasks = JSON.parse(data);
      return tasks.map((task: Task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt)
      }));
    } catch (error) {
      return [];
    }
  }

  private async writeTasks(tasks: Task[]) {
    await this.ensureDataDirectory();
    await fs.writeFile(this.filePath, JSON.stringify(tasks, null, 2));
  }

  async createTask(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const tasks = await this.readTasks();
    const newTask: Task = {
      id: uuidv4(),
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const validatedTask = TaskSchema.parse(newTask);
    tasks.push(validatedTask);
    await this.writeTasks(tasks);
    return validatedTask;
  }

  async getTasks(filters?: {
    status?: string,
    tag?: string,
    priority?: string,
    assignee?: string,
    q?: string
  }): Promise<Task[]> {
    let tasks = await this.readTasks();

    if (filters) {
      tasks = tasks.filter(task => {
        if (filters.status && task.status !== filters.status) return false;
        if (filters.tag && !task.tags?.includes(filters.tag)) return false;
        if (filters.priority && task.priority !== filters.priority) return false;
        if (filters.assignee && task.assignee !== filters.assignee) return false;
        if (filters.q) {
          const query = filters.q.toLowerCase();
          if (!task.title.toLowerCase().includes(query) &&
              !task.description?.toLowerCase().includes(query)) return false;
        }
        return true;
      });
    }

    return tasks;
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    const tasks = await this.readTasks();
    return tasks.find(task => task.id === id);
  }

  async updateTask(id: string, taskData: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Task | undefined> {
    const tasks = await this.readTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) return undefined;

    const updatedTask = {
      ...tasks[taskIndex],
      ...taskData,
      updatedAt: new Date()
    };

    const validatedTask = TaskSchema.parse(updatedTask);
    tasks[taskIndex] = validatedTask;
    await this.writeTasks(tasks);
    return validatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    const tasks = await this.readTasks();
    const initialLength = tasks.length;
    const filteredTasks = tasks.filter(task => task.id !== id);

    if (filteredTasks.length === initialLength) return false;

    await this.writeTasks(filteredTasks);
    return true;
  }

  async addComment(taskId: string, comment: { text: string, author?: string }): Promise<Task | undefined> {
    const tasks = await this.readTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex === -1) return undefined;

    const newComment = {
      id: uuidv4(),
      ...comment,
      createdAt: new Date()
    };

    tasks[taskIndex].comments = tasks[taskIndex].comments || [];
    tasks[taskIndex].comments!.push(newComment);
    tasks[taskIndex].updatedAt = new Date();

    const validatedTask = TaskSchema.parse(tasks[taskIndex]);
    await this.writeTasks(tasks);
    return validatedTask;
  }
}

export default new TaskRepository();
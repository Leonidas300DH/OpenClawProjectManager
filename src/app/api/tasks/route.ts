import { NextRequest, NextResponse } from 'next/server';
import TaskRepository from '@/lib/repositories/taskRepository';
import { z } from 'zod';

// Middleware to validate API key
export async function middleware(req: NextRequest) {
  const apiKey = req.headers.get('X-API-Key');
  const expectedApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== expectedApiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

// Task creation schema
const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional().default("TODO"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().default("MEDIUM"),
  tags: z.array(z.string()).optional(),
  assignee: z.string().optional()
});

// GET tasks with optional filters
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  const filters = {
    status: searchParams.get('status') || undefined,
    tag: searchParams.get('tag') || undefined,
    priority: searchParams.get('priority') || undefined,
    assignee: searchParams.get('assignee') || undefined,
    q: searchParams.get('q') || undefined
  };

  try {
    const tasks = await TaskRepository.getTasks(filters);
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve tasks' }, { status: 500 });
  }
}

// POST create a new task
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedTask = CreateTaskSchema.parse(body);
    const task = await TaskRepository.createTask(validatedTask);
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
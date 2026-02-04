import { NextRequest, NextResponse } from 'next/server';
import TaskRepository from '@/lib/repositories/taskRepository';
import { z } from 'zod';

// Middleware to validate API key (same as in main tasks route)
export async function middleware(req: NextRequest) {
  const apiKey = req.headers.get('X-API-Key');
  const expectedApiKey = process.env.API_KEY;

  if (!apiKey || apiKey !== expectedApiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

// Update task schema
const UpdateTaskSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  tags: z.array(z.string()).optional(),
  assignee: z.string().optional()
});

// Comment schema
const CommentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty"),
  author: z.string().optional()
});

// GET task by ID
export async function GET(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const task = await TaskRepository.getTaskById(params.id);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve task' }, { status: 500 });
  }
}

// PUT update a task
export async function PUT(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validatedTaskUpdate = UpdateTaskSchema.parse(body);
    const updatedTask = await TaskRepository.updateTask(params.id, validatedTaskUpdate);

    if (!updatedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}

// DELETE a task
export async function DELETE(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await TaskRepository.deleteTask(params.id);
    if (!deleted) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Task deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
}

// POST add a comment to a task
export async function POST(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const validatedComment = CommentSchema.parse(body);
    const updatedTask = await TaskRepository.addComment(params.id, validatedComment);

    if (!updatedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to add comment' }, { status: 500 });
  }
}
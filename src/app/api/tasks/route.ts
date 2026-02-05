import { NextRequest, NextResponse } from 'next/server';
import TaskRepository from '@/lib/repositories/taskRepository';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters = {
      status: searchParams.get('status') || undefined,
      tag: searchParams.get('tag') || undefined,
      priority: searchParams.get('priority') || undefined,
      assignee: searchParams.get('assignee') || undefined,
      q: searchParams.get('q') || undefined
    };

    const tasks = await TaskRepository.getTasks(filters);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const taskData = await request.json();
    const newTask = await TaskRepository.createTask(taskData);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
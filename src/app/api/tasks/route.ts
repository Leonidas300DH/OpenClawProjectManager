import { NextRequest, NextResponse } from 'next/server';
import TaskRepository from '@/lib/repositories/taskRepository';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
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
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
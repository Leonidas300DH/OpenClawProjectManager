export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  tags: string[];
  assignee: {
    initials: string;
    name: string;
  };
  createdAt: string;
  dueAt?: string;
}

export const demoTasks: Task[] = [
  {
    id: 'OPENCLAW-2491',
    title: 'Memory leak in the main render loop when switching contexts',
    description: 'We are observing a steady increase in heap memory usage when toggling between the Dashboard and Settings views rapidly.\n\nSteps to reproduce:\n1. Open the application\n2. Navigate to Settings\n3. Navigate back to Dashboard\n4. Repeat 20 times\n\nExpected result: Garbage collection should reclaim memory.\nActual result: Memory climbs to ~400MB and eventually crashes the tab.',
    status: 'TODO',
    priority: 'HIGH',
    tags: ['BUG', 'CORE'],
    assignee: { initials: 'JD', name: 'John Doe' },
    createdAt: '2023-10-24',
    dueAt: '2023-11-01'
  },
  {
    id: 'OPENCLAW-2505',
    title: 'Implement WebSockets for real-time updates',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    tags: ['FEAT'],
    assignee: { initials: 'JD', name: 'John Doe' },
    createdAt: '2023-10-25'
  },
  {
    id: 'OPENCLAW-2502',
    title: 'Update iconography for the sidebar navigation',
    status: 'TODO',
    priority: 'MEDIUM',
    tags: ['UI', 'DESIGN'],
    assignee: { initials: 'AL', name: 'Alice Lee' },
    createdAt: '2023-10-26'
  },
  {
    id: 'OPENCLAW-2488',
    title: 'Refactor authentication middleware',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    tags: ['BACKEND'],
    assignee: { initials: 'MK', name: 'Mike Kim' },
    createdAt: '2023-10-22'
  },
  {
    id: 'OPENCLAW-2450',
    title: 'User interview synthesis',
    status: 'DONE',
    priority: 'LOW',
    tags: ['UX'],
    assignee: { initials: 'AL', name: 'Alice Lee' },
    createdAt: '2023-10-20',
    dueAt: '2023-10-25'
  },
  {
    id: 'OPENCLAW-2511',
    title: 'Write API documentation for new endpoints',
    status: 'TODO',
    priority: 'LOW',
    tags: ['DOCS'],
    assignee: { initials: 'MK', name: 'Mike Kim' },
    createdAt: '2023-10-27'
  }
];
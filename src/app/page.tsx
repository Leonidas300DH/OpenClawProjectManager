"use client";

import React, { useState, useEffect } from 'react';
import { Task } from '@/lib/repositories/taskRepository';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({
    status: '',
    tag: '',
    priority: '',
    assignee: '',
    q: ''
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    const queryParams = new URLSearchParams(Object.entries(filters)).toString();
    const response = await fetch(`/api/tasks?${queryParams}`);
    const filteredTasks = await response.json();
    setTasks(filteredTasks);
  };

  const handleKeyboardShortcuts = (e: React.KeyboardEvent) => {
    // Keyboard shortcut examples
    if (e.ctrlKey && e.key === 'n') {
      // Create new task
      console.log('Create new task');
    }
    if (e.ctrlKey && e.key === 'f') {
      // Focus on search
      console.log('Focus on search');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cyberpunk-background text-cyberpunk-text p-8"
      onKeyDown={handleKeyboardShortcuts}
      tabIndex={0}
    >
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-cyberpunk-primary mb-6">OpenClaw Project Manager</h1>

        {/* Filter Bar */}
        <div className="mb-6 flex space-x-4">
          <select 
            className="bg-dark-800 border border-cyberpunk-secondary text-white"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">All Statuses</option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>

          <select 
            className="bg-dark-800 border border-cyberpunk-secondary text-white"
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="bg-dark-800 border border-cyberpunk-secondary text-white p-2"
            value={filters.q}
            onChange={(e) => setFilters({...filters, q: e.target.value})}
          />
        </div>

        {/* Tasks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="bg-dark-800 p-4 rounded-lg border border-cyberpunk-muted hover:border-cyberpunk-primary transition-all"
            >
              <h2 className="text-xl font-semibold text-cyberpunk-primary">{task.title}</h2>
              <p className="text-cyberpunk-text opacity-80 mt-2">{task.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span 
                  className={`px-2 py-1 rounded text-sm ${
                    task.status === 'TODO' ? 'bg-blue-600' :
                    task.status === 'IN_PROGRESS' ? 'bg-yellow-600' :
                    'bg-green-600'
                  }`}
                >
                  {task.status}
                </span>
                <span className="text-cyberpunk-muted">{task.priority}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
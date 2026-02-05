"use client";

import { useState } from 'react';
import { demoTasks, Task } from '@/lib/demoData';

export default function Home() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [tasks, setTasks] = useState<Task[]>(demoTasks);

  // Determines the status badge color
  const getStatusDotClass = (status: string) => {
    switch (status) {
      case 'TODO': return 'status-dot-todo';
      case 'IN_PROGRESS': return 'status-dot-inprogress';
      case 'DONE': return 'status-dot-done';
      default: return '';
    }
  };

  // Determines the priority text color
  const getPriorityTextClass = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'text-magenta';
      case 'MEDIUM': return 'text-yellow';
      case 'LOW': return 'text-green';
      default: return '';
    }
  };

  // Group tasks by status for Kanban view
  const tasksByStatus = {
    TODO: tasks.filter(t => t.status === 'TODO'),
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter(t => t.status === 'DONE')
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="sidebar">
        <div 
          className={`sidebar-icon ${view === 'kanban' ? 'active' : ''}`} 
          onClick={() => setView('kanban')}
          title="Board"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        </div>
        <div 
          className={`sidebar-icon ${view === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
          title="List"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <div className="sidebar-icon" title="Timeline">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1"></div>
        <div className="sidebar-icon">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="breadcrumb">
            <span className="text-gray">OpenClaw</span>
            <span className="text-dim">/</span>
            <span>Core Engine Rewrite</span>
          </div>

          {/* Filters */}
          <div className="filters flex items-center gap-3">
            <input 
              type="text" 
              placeholder="Press / to search..." 
              className="search-input font-mono"
            />
            
            <div className="btn btn-ghost">
              <span className="text-gray mr-1.5">Filter:</span> My Tasks
            </div>
            <div className="btn btn-ghost">
              <span className="text-gray mr-1.5">Sort:</span> Priority
            </div>
            
            {/* Avatar Stack */}
            <div className="flex -space-x-2 mr-3">
              <div className="avatar">JD</div>
              <div className="avatar">AL</div>
              <div className="avatar">MK</div>
            </div>

            <div className="btn btn-primary">
              + New Issue
            </div>
          </div>
        </div>

        {/* View Switcher */}
        <div className="border-b border-[var(--border-default)] flex px-6 pt-3">
          <div 
            className={`pb-3 mr-5 cursor-pointer ${view === 'kanban' 
              ? 'border-b-2 border-[var(--cyber-cyan)] text-white' 
              : 'text-[var(--text-gray)] border-b-2 border-transparent'}`}
            onClick={() => setView('kanban')}
          >
            Kanban
          </div>
          <div 
            className={`pb-3 cursor-pointer ${view === 'list' 
              ? 'border-b-2 border-[var(--cyber-cyan)] text-white' 
              : 'text-[var(--text-gray)] border-b-2 border-transparent'}`}
            onClick={() => setView('list')}
          >
            List
          </div>
        </div>

        {/* View Container */}
        <div className="flex-1 p-6 overflow-auto">
          {view === 'kanban' ? (
            <div className="kanban-board">
              {/* TODO Column */}
              <div className="kanban-column">
                <div className="kanban-column-header">
                  <div className="flex items-center gap-2">
                    <span className={`status-dot ${getStatusDotClass('TODO')}`}></span>
                    To Do 
                    <span className="bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 rounded text-xs text-[var(--text-gray)] ml-2">
                      {tasksByStatus.TODO.length}
                    </span>
                  </div>
                  <svg width="16" height="16" fill="none" stroke="currentColor" className="text-gray">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                
                <div className="space-y-3">
                  {tasksByStatus.TODO.map(task => (
                    <div key={task.id} className={`kanban-card priority-${task.priority.toLowerCase()}`}>
                      <div className="flex gap-1.5 mb-2">
                        {task.tags.map(tag => (
                          <span 
                            key={tag} 
                            className={`card-tag ${
                              tag === 'BUG' ? 'tag-bug' : 
                              tag === 'FEAT' ? 'tag-feature' : 
                              tag === 'UI' || tag === 'DESIGN' ? 'tag-design' : ''
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm mb-3">{task.title}</div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-dim font-mono">#{task.id.split('-')[1]}</span>
                        <div 
                          className="avatar w-5 h-5 text-[8px]"
                          title={task.assignee.name}
                        >
                          {task.assignee.initials}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="kanban-column">
                <div className="kanban-column-header">
                  <div className="flex items-center gap-2">
                    <span className={`status-dot ${getStatusDotClass('IN_PROGRESS')}`}></span>
                    In Progress 
                    <span className="bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 rounded text-xs text-[var(--text-gray)] ml-2">
                      {tasksByStatus.IN_PROGRESS.length}
                    </span>
                  </div>
                  <svg width="16" height="16" fill="none" stroke="currentColor" className="text-gray">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                </div>
                
                <div className="space-y-3">
                  {tasksByStatus.IN_PROGRESS.map(task => (
                    <div key={task.id} className={`kanban-card priority-${task.priority.toLowerCase()}`}>
                      <div className="flex gap-1.5 mb-2">
                        {task.tags.map(tag => (
                          <span 
                            key={tag} 
                            className={`card-tag ${
                              tag === 'BUG' ? 'tag-bug' : 
                              tag === 'FEAT' ? 'tag-feature' : 
                              tag === 'UI' || tag === 'DESIGN' ? 'tag-design' : ''
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm mb-3">{task.title}</div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-dim font-mono">#{task.id.split('-')[1]}</span>
                        <div 
                          className="avatar w-5 h-5 text-[8px]"
                          title={task.assignee.name}
                        >
                          {task.assignee.initials}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Done Column */}
              <div className="kanban-column">
                <div className="kanban-column-header">
                  <div className="flex items-center gap-2">
                    <span className={`status-dot ${getStatusDotClass('DONE')}`}></span>
                    Done 
                    <span className="bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 rounded text-xs text-[var(--text-gray)] ml-2">
                      {tasksByStatus.DONE.length}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {tasksByStatus.DONE.map(task => (
                    <div key={task.id} className={`kanban-card priority-${task.priority.toLowerCase()}`} style={{ opacity: 0.7 }}>
                      <div className="flex gap-1.5 mb-2">
                        {task.tags.map(tag => (
                          <span 
                            key={tag} 
                            className={`card-tag ${
                              tag === 'BUG' ? 'tag-bug' : 
                              tag === 'FEAT' ? 'tag-feature' : 
                              tag === 'UI' || tag === 'DESIGN' ? 'tag-design' : ''
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm mb-3">{task.title}</div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-dim font-mono">#{task.id.split('-')[1]}</span>
                        <div 
                          className="avatar w-5 h-5 text-[8px]"
                          title={task.assignee.name}
                        >
                          {task.assignee.initials}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // List View
            <table className="list-view-table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assignee</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td className="font-mono text-dim">#{task.id.split('-')[1]}</td>
                    <td>{task.title}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className={`status-dot ${getStatusDotClass(task.status)}`}></span>
                        {task.status.replace('_', ' ')}
                      </div>
                    </td>
                    <td>
                      <span className={getPriorityTextClass(task.priority)}>
                        {task.priority.charAt(0) + task.priority.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td>
                      <div 
                        className="avatar w-6 h-6 text-[10px]"
                        title={task.assignee.name}
                      >
                        {task.assignee.initials}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
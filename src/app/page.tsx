'use client'

import { useState } from 'react'

// Mock data for the kanban board
const mockData = {
  backlog: [
    {
      id: 'OP-102',
      title: 'Review Q3 analytics and retention metrics',
      priority: 'High',
      assignee: { name: 'JD', color: 'bg-orange-100', textColor: 'text-orange-600' },
      status: 'pending'
    },
    {
      id: 'OP-115',
      title: 'Update dependency packages for security patch',
      assignee: { name: 'AS', color: 'bg-blue-100', textColor: 'text-blue-600' },
      status: 'pending'
    },
    {
      id: 'OP-120',
      title: 'Research competitor pricing models',
      priority: 'Low',
      assignee: null,
      status: 'pending'
    }
  ],
  inProgress: [
    {
      id: 'OP-88',
      title: 'Implement new authentication flow with OAuth2',
      assignee: { name: 'ME', color: 'bg-indigo-200', textColor: 'text-indigo-700' },
      attachment: 'https://ui-avatars.com/api/?name=Design+Mock&background=random',
      timeLeft: '2d left',
      status: 'in-progress'
    },
    {
      id: 'OP-92',
      title: 'Mobile view responsiveness fixes',
      assignee: { name: 'LG', color: 'bg-pink-100', textColor: 'text-pink-600' },
      status: 'in-progress'
    }
  ],
  review: [
    {
      id: 'OP-75',
      title: 'API documentation update',
      assignee: null,
      status: 'review'
    }
  ]
}

// Reusable Badge component
const StatusDot = () => (
  <div className="w-2 h-2 rounded-full bg-gray-200"></div>
)

// Reusable Avatar component
const Avatar = ({ name, color = 'bg-gray-200', textColor = 'text-gray-600', border = true }: { name?: string; color?: string; textColor?: string; border?: boolean }) => {
  const borderClass = border ? 'border border-white' : ''
  return (
    <div className={`w-6 h-6 rounded-full ${color} ${textColor} flex items-center justify-center text-[10px] font-medium ${borderClass}`}>
      {name}
    </div>
  )
}

// Kanban card component
const KanbanCard = ({ task }: { task: any }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-subtle hover:border-gray-300 hover:shadow-lifted transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-gray-400 group-hover:text-indigo-500 transition-colors">{task.id}</span>
        {task.status === 'pending' && <StatusDot />}
      </div>
      <h4 className="text-sm font-medium text-gray-900 mb-3 leading-snug">{task.title}</h4>
      
      {task.attachment && (
        <div className="mb-3">
          <img 
            src={task.attachment} 
            alt="attachment" 
            className="w-full h-24 object-cover rounded-lg border border-gray-100 opacity-90 group-hover:opacity-100 transition-opacity" 
          />
        </div>
      )}
      
      <div className="flex items-center justify-between mt-4">
        {task.assignee ? (
          <div className="flex -space-x-2">
            <Avatar 
              name={task.assignee.name} 
              color={task.assignee.color} 
              textColor={task.assignee.textColor} 
            />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-gray-200 border border-gray-200"></div>
        )}
        
        {task.timeLeft && (
          <span className="text-xs text-gray-400 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg> 
            {task.timeLeft}
          </span>
        )}
        
        {task.priority && (
          <span className="text-xs text-gray-400">{task.priority}</span>
        )}
      </div>
    </div>
  )
}

// Sidebar component 
const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between flex-shrink-0 z-20">
      <div>
        {/* Logo and App Name */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="w-6 h-6 bg-gray-900 rounded-md mr-3"></div>
          <span className="font-semibold tracking-tight text-gray-900">OpenClaw</span>
        </div>

        {/* Workspace Section */}
        <div className="p-4 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Workspace</div>
          
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium bg-gray-100 text-gray-900 rounded-lg transition-colors">
            <svg className="w-4 h-4 mr-3 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            Board
          </a>
          <a href="list" className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            List View
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
            <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Timeline
          </a>
        </div>

        {/* Favorites Section */}
        <div className="mt-8 p-4 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">Favorites</div>
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg transition-colors">
            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-3"></span>
            Q3 Roadmap
          </a>
          <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></span>
            Design System
          </a>
        </div>
      </div>
      
      {/* User Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">DB</div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Daniel B.</p>
            <p className="text-xs text-gray-400">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default function Home() {
  const [activeColumn, setActiveColumn] = useState('inProgress')

  return (
    <div className="bg-gray-50 text-gray-900 h-screen flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center">
            <span className="text-gray-400 text-sm">Projects</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="font-medium text-gray-900 text-sm">OpenClaw V2</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            <button className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg shadow-subtle hover:bg-primary-hover transition-colors flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              New Issue
            </button>
          </div>
        </header>

        {/* Board Area */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-8">
          <div className="flex space-x-8 h-full">
            {/* Backlog Column */}
            <div className="w-80 flex-shrink-0 flex flex-col">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className={`text-sm font-medium ${activeColumn === 'backlog' ? 'text-gray-900' : 'text-gray-500'}`}>
                  Backlog 
                  <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {mockData.backlog.length}
                  </span>
                </h3>
                <button className="text-gray-300 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 no-scrollbar">
                {mockData.backlog.map((task) => (
                  <KanbanCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="w-80 flex-shrink-0 flex flex-col">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className={`text-sm font-medium ${activeColumn === 'inProgress' ? 'text-gray-900' : 'text-gray-500'}`}>
                  In Progress 
                  <span className="ml-2 text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {mockData.inProgress.length}
                  </span>
                </h3>
                <button className="text-gray-300 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 no-scrollbar">
                {mockData.inProgress.map((task) => (
                  <KanbanCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Review Column */}
            <div className="w-80 flex-shrink-0 flex flex-col">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className={`text-sm font-medium ${activeColumn === 'review' ? 'text-gray-900' : 'text-gray-500'}`}>
                  In Review 
                  <span className="ml-2 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {mockData.review.length}
                  </span>
                </h3>
                <button className="text-gray-300 hover:text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 no-scrollbar">
                {mockData.review.map((task) => (
                  <KanbanCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Add Column */}
            <div className="w-80 flex-shrink-0 flex flex-col">
              <div className="flex items-center justify-center h-12 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium hover:border-gray-300 hover:text-gray-500 cursor-pointer transition-colors">
                + Add Section
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
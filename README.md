# OpenClaw Project Manager 🐱‍👤

## Overview
OpenClaw Project Manager is a powerful, cyberpunk-themed task management application built with Next.js, TypeScript, and Tailwind CSS.

## Features
- 🚀 Full CRUD Task Management
- 🔍 Advanced Filtering
- 💬 Task Comments
- 🎨 Cyberpunk Dark Theme
- 🔒 API Key Authentication

## Prerequisites
- Node.js (v18+)
- npm or yarn

## Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Environment Variables
Create a `.env.local` file with:
```
API_KEY=your_secret_api_key
```

## Running the Application
```bash
npm run dev  # Development
npm run build  # Production build
npm start  # Start production server
```

## API Endpoints

### Tasks API

#### Create a Task
```bash
POST /api/tasks
Headers: 
- X-API-Key: {your_api_key}
Body:
{
  "title": "New Task",
  "description": "Task details",
  "status": "TODO",
  "priority": "MEDIUM",
  "tags": ["development"],
  "assignee": "jack"
}
```

#### Get Tasks
```bash
GET /api/tasks?status=TODO&priority=HIGH&q=search_term
Headers:
- X-API-Key: {your_api_key}
```

#### Update Task
```bash
PUT /api/tasks/{taskId}
Headers:
- X-API-Key: {your_api_key}
Body:
{
  "status": "IN_PROGRESS"
}
```

#### Delete Task
```bash
DELETE /api/tasks/{taskId}
Headers:
- X-API-Key: {your_api_key}
```

#### Add Comment
```bash
POST /api/tasks/{taskId}
Headers:
- X-API-Key: {your_api_key}
Body:
{
  "text": "Comment text",
  "author": "username"
}
```

## Keyboard Shortcuts
- `Ctrl+N`: Create new task
- `Ctrl+F`: Focus search

## Deployment
Deployed on Vercel: [Coming Soon]

## License
MIT License
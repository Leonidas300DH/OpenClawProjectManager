import React, { useState } from 'react';
import { 
  DndContext, 
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { 
  arrayMove, 
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';

import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
}

const Kanban: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Implement Drag & Drop', status: 'todo' },
    { id: '2', title: 'Design Tokens Integration', status: 'todo' },
    { id: '3', title: 'Vercel Deployment', status: 'in-progress' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over?.id);

        // Update the status of the dragged task
        const updatedTasks = [...tasks];
        const draggedTask = updatedTasks[oldIndex];
        
        // Determine the new status based on the column
        if (over?.data.current?.type === 'column') {
          draggedTask.status = over.id as Task['status'];
        }

        return arrayMove(updatedTasks, oldIndex, newIndex);
      });
    }
  };

  // Group tasks by status
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.status]) {
      acc[task.status] = [];
    }
    acc[task.status].push(task);
    return acc;
  }, {} as Record<Task['status'], Task[]>);

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 p-4 bg-cyber-dark">
        {(['todo', 'in-progress', 'done'] as const).map((status) => (
          <KanbanColumn 
            key={status} 
            id={status} 
            title={status.replace('-', ' ').toUpperCase()}
          >
            <SortableContext 
              items={groupedTasks[status]?.map(task => task.id) || []}
              strategy={rectSortingStrategy}
            >
              {groupedTasks[status]?.map((task) => (
                <KanbanCard 
                  key={task.id} 
                  task={task} 
                />
              ))}
            </SortableContext>
          </KanbanColumn>
        ))}
      </div>
    </DndContext>
  );
};

export default Kanban;
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from './Kanban';

interface KanbanCardProps {
  task: Task;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef, 
    transform, 
    transition 
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        p-4 rounded-lg 
        bg-cyber-glass hover:bg-cyber-glass-hover 
        text-cyber-white cursor-grab
        transition-all duration-200
      `}
    >
      <h3 className="font-bold text-cyber-cyan">{task.title}</h3>
      {task.description && (
        <p className="text-sm text-cyber-gray mt-2">{task.description}</p>
      )}
    </div>
  );
};

export default KanbanCard;
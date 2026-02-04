import React, { ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface KanbanColumnProps {
  id: string;
  title: string;
  children: ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ id, title, children }) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      type: 'column',
    },
  });

  return (
    <div 
      ref={setNodeRef}
      className={`
        w-72 p-4 rounded-lg 
        bg-cyber-glass transition-all duration-200
        ${isOver ? 'ring-2 ring-cyber-cyan/50' : ''}
      `}
    >
      <h2 className="text-lg font-bold text-cyber-white mb-4 capitalize">
        {title}
      </h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}; 

export default KanbanColumn;
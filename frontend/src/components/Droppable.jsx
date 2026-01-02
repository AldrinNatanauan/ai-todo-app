import { useDroppable } from '@dnd-kit/core';

export function Droppable({ id, children, className }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={className}
    >
      {children}
    </div>
  );
}

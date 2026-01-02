import { useDraggable } from '@dnd-kit/core';

export function Draggable({ id, children }) {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({ id });

  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} className="flex-1">
      {children({ listeners, attributes })}
    </div>
  );
}

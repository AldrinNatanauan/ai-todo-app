import api from '../api.js';
import {DndContext} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import {Draggable} from './Draggable.jsx';
import {Droppable} from './Droppable.jsx';
import { useState } from 'react';

export default function TodoList({ todos, setTodos }) {

  const [isDragging, setIsDragging] = useState(false);

  function handleDragEnd({ active, over }) {
    if (!over) return;

    const todoId = active.id.replace('draggable-', '');

    if (over.id === 'drop-complete') {
      toggleComplete(todoId);
    }

    if (over.id === 'drop-delete') {
      deleteTodo(todoId);
    }
  }

  const toggleComplete = (id) => {
    api.put(`/todos/complete/${id}`)
      .then(res => {
        setTodos(todos.map(todo => todo.id === id ? res.data : todo));
      });
  };

  const toggleEdit = (id) => {
    let todo = document.getElementById(`todoTitle${id}`);
    todo.contentEditable = true;
    todo.focus();
    todo.addEventListener('blur', () => {
      todo.contentEditable = false;
      api.put(`/todos/update/${id}`, { title: todo.innerText })
        .then(res => {
          setTodos(todos.map(todo => todo.id === id ? res.data : todo));
        });
    });
  };

  const deleteTodo = (id) => {
    api.delete(`/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };

  return (
    <DndContext 
      modifiers={[restrictToWindowEdges]}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event) => {
        setIsDragging(false);
        handleDragEnd(event);
      }}
      onDragCancel={() => setIsDragging(false)}
    >
      {todos.map(todo => (
        <Draggable id={`draggable-${todo.id}`}>
          {({ listeners, attributes }) => (
            <li
              key={todo.id}
              className={`flex items-center gap-2 p-2 border-b ${
                todo.completed ? 'line-through' : ''
              }`}
            >
              {/* Checkbox */}
              <input
                className="w-6 h-6"
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />

              <div className="flex items-center flex-1 min-w-0">
                {/* Title */}
                <span
                  onClick={() => toggleEdit(todo.id)}
                  id={`todoTitle${todo.id}`}
                  className="flex-1 min-w-0 cursor-pointer p-2 whitespace-normal overflow-hidden text-ellipsis"
                >
                  {todo.title}
                </span>

                {/* Drag handle */}
                <button
                  {...listeners}
                  {...attributes}
                  className="ml-auto bg-transparent p-0 cursor-grab active:cursor-grabbing"
                  style={{ outline: 'none' }}
                >
                  <i className="bxr bx-move text-[1.5rem]"></i>
                </button>
              </div>
            </li>
          )}
        </Draggable>
      ))}

      {isDragging && (
        <div className="flex gap-4 mt-4">
          <Droppable
            id="drop-complete"
            className="fixed flex right-5 top-5 h-[30vh] w-[20vh] p-4 border-2 border-green-500 rounded text-green-600"
          >
            <p className="m-auto">Complete</p>
          </Droppable>

          <Droppable
            id="drop-delete"
            className="fixed flex right-5 bottom-5 h-[30vh] w-[20vh] p-4 border-2 border-red-500 rounded text-red-600"
          >
            <p className="m-auto">Delete</p>
          </Droppable>
        </div>
      )}
    </DndContext>
  );
}
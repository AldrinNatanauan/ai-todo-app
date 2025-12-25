import { useState } from 'react';
import api from '../api';

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    api.post('/todos', { title })
      .then(res => {
        onAdd(res.data);
        setTitle('');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="border p-2 mr-2 rounded w-64"
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">Add</button>
    </form>
  );
}

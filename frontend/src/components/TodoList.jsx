import api from '../api.js';

export default function TodoList({ todos, setTodos }) {

  const toggleComplete = (id) => {
    api.put(`/todos/${id}`)
      .then(res => {
        setTodos(todos.map(todo => todo.id === id ? res.data : todo));
      });
  };

  const deleteTodo = (id) => {
    api.delete(`/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      });
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className={`flex justify-between items-center p-2 border-b ${todo.completed ? 'line-through' : ''}`}>
          <span onClick={() => toggleComplete(todo.id)} className="cursor-pointer">{todo.title}</span>
          <button onClick={() => deleteTodo(todo.id)} className="ml-2 text-red-500">Delete</button>
        </li>
      ))}
    </ul>
  );
}

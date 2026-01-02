import api from '../api.js';

export default function CompletedList({ todos, setTodos }) {

    const deleteTodo = (id) => {
        api.delete(`/todos/${id}`)
        .then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
        });
    };

    return (
        <ul>
            {todos.map(todo => (
                todo.completed ? (
                    <li key={todo.id} className={`flex justify-between items-center p-2 border-b text-green-500 : ''}`}>
                        <span className="line-through">{todo.title}</span>
                        <button onClick={() => deleteTodo(todo.id)} className="ml-2 text-red-500"><i className='bxr  bx-trash-alt'></i> </button>
                    </li>
                ) : null
            ))}
        </ul>
    );
}
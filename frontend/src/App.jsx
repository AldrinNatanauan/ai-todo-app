import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react';
import TodoList from './components/TodoList.jsx';
import AddTodo from './components/AddTodo.jsx';
import CompletedList from './components/CompletedList.jsx';
import api from './api.js';

function App() {
  const [health, setHealth] = useState("loading...");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/health").then((response) => {
        console.log("Backend response: ", response.data);
        setHealth(response.data.status);
      })
      .catch((error) => {
        console.log("API Error: ", error);
        setHealth("error");
      });

    api.get('/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Status: <span id={`status-${health}`}>{health}</span></h1>

      <div className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">AI-Powered To-Do App</h1>
        <AddTodo onAdd={handleAdd} />
      </div>

      <div className="p-4 max-w-md mx-auto">
        <TodoList todos={todos} setTodos={setTodos} />
      </div>

      <div className="p-4 max-w-md mx-auto">
        <CompletedList todos={todos} setTodos={setTodos} />
      </div>
    </>
  )
}

export default App

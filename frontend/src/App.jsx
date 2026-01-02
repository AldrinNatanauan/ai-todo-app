import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
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
      
      
      <aside className="fixed top-0 left-0 h-screen w-[15%] bg-[hsl(0,0%,10%)] p-4 flex flex-col gap-4">
        <Sidebar />
        <p className="status text-sm text-[hsl(0,0%,50%)]">Status: <span id={`status-${health}`}>{health}</span></p>
      </aside>

      <div className="flex flex-col gap-4 min-h-screen p-10 w-[60%] items-center" id="container">
        <h1 className="text-4xl font-bold mb-4 self-start">Today</h1>
        <div className="p-4 max-w-md">
          <h1 className="text-2xl font-bold mb-4">AI-Powered To-Do App</h1>
          <AddTodo onAdd={handleAdd} />
        </div>

        <div className="p-4 max-w-md w-[100%]">
          <TodoList todos={todos} setTodos={setTodos} />
        </div>

        <div className="p-4 max-w-md w-[100%]">
          <CompletedList todos={todos} setTodos={setTodos} />
        </div>
      </div>

      
    </>
  )
}

export default App

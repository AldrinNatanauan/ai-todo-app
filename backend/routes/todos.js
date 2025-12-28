import express from 'express';
import {v4 as uuidv4} from 'uuid';
import todos from '../models/todo.js';

const router = express.Router();

//GET all todos
router.get('/', (req, res) => {
    res.json(todos);
});

//POST new todo
router.post('/', (req, res) => {
    const { title } = req.body;
    if (!title){
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTodo = {
        id: uuidv4(),
        title,
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

//PUT toggle complete
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === id);
    if(index === -1){
        return res.status(404).json({ message: 'Todo not found' });
    }

    todos[index].completed = true;
    res.status(200).json(todos[index]);
});


// DELETE /api/todos/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex(todo => todo.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  todos.splice(index, 1);
  res.status(204).send();
});

export default router;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoute from './routes/health.js';
import todosRoute from './routes/todos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//ROUTES
app.use('/api/health', healthRoute);
app.use('/api/todos', todosRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
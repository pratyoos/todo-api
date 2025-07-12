import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to the To-Do API!');
});

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

export default app;

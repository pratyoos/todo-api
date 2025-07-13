import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//allowing CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Basic route for testing
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'API is healthy' });
});
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do API!');
});

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

export default app;

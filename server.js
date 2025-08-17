import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import todoRoutes from './routes/todo.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import { getDocsHtml } from './utils/getDocs.js';

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
app.get("/", (_req, res) => {
  res.type("html").send(getDocsHtml());
});

app.get("/api", (_req, res) => {
  res.type("html").send(getDocsHtml());
});

app.use('/api/todos', todoRoutes);
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);
});

export default app;

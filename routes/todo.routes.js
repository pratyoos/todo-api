import express from 'express'
const router = express.Router();
import protect from '../middleware/auth.middleware.js'
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todo.controller.js';

router.route('/')
  .get(protect, getTodos)
  .post(protect, createTodo);

router.route('/:id')
  .put(protect, updateTodo)
  .delete(protect, deleteTodo);

export default router;

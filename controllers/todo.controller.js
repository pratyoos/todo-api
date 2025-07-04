import Todo from '../models/todo.model.js';

// Create new todo
export const createTodo = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  try {
    const todo = await Todo.create({
      user: req.user._id,
      title,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all todos for logged-in user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update todo by id (only if it belongs to logged-in user)
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete todo by id (only if it belongs to logged-in user)
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
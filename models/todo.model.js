import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { _id: false });

const todoSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  },
  tags: [{
    type: String
  }],
  subtasks: [subtaskSchema],
  reminder: {
    type: Date
  }
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
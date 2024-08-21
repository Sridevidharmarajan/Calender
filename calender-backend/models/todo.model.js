// models/todo.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for todos
const todoSchema = new Schema({
  date: { type: Date, required: true },
  todos: { type: [String], required: true },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

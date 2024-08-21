// routes/todo.routes.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo.model');

// Add a new todo
router.post('/add', async (req, res) => {
  try {
    const { date, todos } = req.body;
    const newTodo = new Todo({ date, todos });
    await newTodo.save();
    res.status(201).json('Todo added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;

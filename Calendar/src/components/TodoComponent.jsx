import React, { useState, useEffect } from 'react';
import todosService from '../service/todo.js'; 

const TodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ date: '', todos: [] });

  useEffect(() => {
    // Fetch todos when the component mounts
    const fetchTodos = async () => {
      try {
        const data = await todosService.getTodos();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      await todosService.addTodo(newTodo);
      // Refresh the list after adding a new todo
      const data = await todosService.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <h1>TODO List</h1>
      <div>
        <input
          type="date"
          value={newTodo.date}
          onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
        />
        <input
          type="text"
          value={newTodo.todos.join(', ')}
          onChange={(e) => setNewTodo({ ...newTodo, todos: e.target.value.split(',').map(item => item.trim()) })}
          placeholder="Enter todo items separated by commas"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <strong>{new Date(todo.date).toLocaleDateString()}</strong>: {todo.todos.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComponent;

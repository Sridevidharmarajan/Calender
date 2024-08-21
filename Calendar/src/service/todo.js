// todos.js
import axios from 'axios';

// Base URL for the API (adjust if necessary)
const API_URL = 'http://localhost:3000/api/todos';

// Function to add a new TODO
const addTodo = async (todo) => {
  try {
    const response = await axios.post(`${API_URL}/add`, todo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

// Function to fetch all TODOs
const getTodos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export default {
  addTodo,
  getTodos
};

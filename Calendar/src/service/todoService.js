// src/service/todoService.js

const API_URL = "http://localhost:5000/api/todos"; // Replace with your actual backend URL

// Function to add a todo
export async function addTodo(todo) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    });
    
    if (!response.ok) {
      throw new Error("Failed to add todo");
    }

    const result = await response.json();
    return result; // Assuming the backend returns the added todo
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
}
export async function getTodos() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const todos = await response.json();
    return todos; 
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

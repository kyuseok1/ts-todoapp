import React, { useState, useEffect, useCallback } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./services/todoService";
import TodoList from "./components/TodoList";
import "./App.css";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async () => {
    if (title.trim() === "") return;

    try {
      const response = await createTodo(title);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTitle("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((todo) => todo._id === id);
    if (!todo) return;

    try {
      const response = await updateTodo(id, {
        ...todo,
        completed: !todo.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleUpdateTodo = async (id: string, title: string) => {
    const todo = todos.find((todo) => todo._id === id);
    if (!todo) return;

    try {
      const response = await updateTodo(id, { ...todo, title });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <div className="todo-input">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>추가</button>
      </div>
      <TodoList
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTodo}
        onUpdate={handleUpdateTodo}
      />
    </div>
  );
};

export default App;

import React, { useState, useEffect, useCallback } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./services/todoService";
import TodoList from "./components/TodoList";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
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
    <div className="flex flex-col items-center mx-auto max-w-2xl p-5 font-sans bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 drop-shadow-md">
        Todo App
      </h1>
      <div className="flex w-full mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-3 text-lg border border-gray-300 rounded-l-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="ml-0 p-3 text-lg bg-blue-500 text-white rounded-r-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          추가
        </button>
      </div>
      {loading ? (
        <div className="text-lg text-gray-500">Loading...</div>
      ) : (
        <TodoList
          todos={todos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
        />
      )}
    </div>
  );
};

export default App;

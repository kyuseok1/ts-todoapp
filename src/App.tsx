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
  dueDate?: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getTodos();
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      setError("Failed to fetch todos.");
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
      const response = await createTodo({
        title,
        dueDate: dueDate || new Date().toISOString(),
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setTitle("");
      setDueDate("");
      setError(null);
    } catch (error) {
      setError("Failed to add todo.");
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
        dueDate: todo.dueDate || "",
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
      setError(null);
    } catch (error) {
      setError("Failed to update todo.");
      console.error("Failed to update todo:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      setError(null);
    } catch (error) {
      setError("Failed to delete todo.");
      console.error("Failed to delete todo:", error);
    }
  };

  const handleUpdateTodo = async (
    id: string,
    title: string,
    dueDate: string
  ) => {
    const todo = todos.find((todo) => todo._id === id);
    if (!todo) return;

    try {
      const response = await updateTodo(id, {
        ...todo,
        title,
        dueDate: dueDate || "",
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
      setIsEditing(null);
      setEditTitle("");
      setError(null);
    } catch (error) {
      setError("Failed to update todo.");
      console.error("Failed to update todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="flex flex-col items-center mx-auto max-w-2xl p-5 font-sans bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 drop-shadow-md">
        Todo App
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex w-full mb-8">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo"
          className="flex-1 p-3 text-lg border border-gray-300 rounded-l-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-3 text-lg border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 ml-4"
        />
        <button
          onClick={handleAddTodo}
          className="ml-4 p-3 text-lg bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          추가
        </button>
      </div>
      <div className="flex mb-8">
        <button
          onClick={() => setFilter("all")}
          className={`p-2 ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-white text-black"
          } rounded-l-lg`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`p-2 ${
            filter === "completed"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          }`}
        >
          완료됨
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`p-2 ${
            filter === "incomplete"
              ? "bg-blue-500 text-white"
              : "bg-white text-black"
          } rounded-r-lg`}
        >
          미완료됨
        </button>
      </div>
      {loading ? (
        <div className="text-lg text-gray-500">Loading...</div>
      ) : (
        <TodoList
          todos={filteredTodos}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
        />
      )}
    </div>
  );
};

export default App;

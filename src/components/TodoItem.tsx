import React, { useState } from "react";

interface TodoItemProps {
  todo: {
    _id: string;
    title: string;
    completed: boolean;
  };
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleUpdate = () => {
    onUpdate(todo._id, newTitle);
    setIsEditing(false);
  };

  return (
    <li
      className={`todo-item flex items-center justify-between p-4 bg-white shadow-md rounded-lg ${
        todo.completed ? "line-through" : ""
      }`}
    >
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo._id)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        ) : (
          <span className="text-lg">{todo.title}</span>
        )}
      </div>
      <div className="todo-item-buttons space-x-2">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-3 py-1 rounded-md"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md"
          >
            편집
          </button>
        )}
        <button
          onClick={() => onDelete(todo._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md"
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

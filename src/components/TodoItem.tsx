import React, { useState, useEffect } from "react";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, dueDate: string) => void;
  isEditing: string | null;
  setIsEditing: (id: string | null) => void;
  editTitle: string;
  setEditTitle: (title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
  isEditing,
  setIsEditing,
  editTitle,
  setEditTitle,
}) => {
  const [editDueDate, setEditDueDate] = useState<string>(todo.dueDate || "");

  useEffect(() => {
    console.log(todo); // 데이터 확인
  }, [todo]);

  return (
    <li className="flex items-center justify-between p-4 mb-2 bg-white shadow rounded-lg">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo._id)}
          className="mr-4"
        />
        {isEditing === todo._id ? (
          <div className="flex items-center">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={() => onUpdate(todo._id, editTitle, editDueDate)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onUpdate(todo._id, editTitle, editDueDate);
                }
              }}
              className="border border-gray-300 p-2 rounded mr-2"
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
        ) : (
          <>
            <span
              className={`mr-4 ${todo.completed ? "line-through" : ""}`}
              onDoubleClick={() => {
                setIsEditing(todo._id);
                setEditTitle(todo.title);
                setEditDueDate(todo.dueDate || "");
              }}
            >
              {todo.title}
            </span>
            {todo.dueDate && (
              <span className="text-sm text-gray-500">
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
          </>
        )}
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onToggleComplete(todo._id)}
          className={`mr-4 p-2 rounded ${
            todo.completed
              ? "bg-green-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {todo.completed ? "완료" : "미완료"}
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="bg-red-500 text-white p-2 rounded"
        >
          삭제
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

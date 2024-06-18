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
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo._id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      ) : (
        <span>{todo.title}</span>
      )}
      <div className="todo-item-buttons">
        {isEditing ? (
          <button onClick={handleUpdate}>Update</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>편집</button>
        )}
        <button onClick={() => onDelete(todo._id)}>삭제</button>
      </div>
    </li>
  );
};

export default TodoItem;

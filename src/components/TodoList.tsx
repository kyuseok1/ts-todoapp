import React from "react";
import TodoItem from "./TodoItem";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, dueDate: string) => void;
  isEditing: string | null;
  setIsEditing: (id: string | null) => void;
  editTitle: string;
  setEditTitle: (title: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDelete,
  onUpdate,
  isEditing,
  setIsEditing,
  editTitle,
  setEditTitle,
}) => {
  return (
    <div className="w-4/5 mx-auto">
      <ul className="todo-list space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onUpdate={onUpdate}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

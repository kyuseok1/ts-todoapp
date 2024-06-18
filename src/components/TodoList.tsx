import React from "react";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: {
    _id: string;
    title: string;
    completed: boolean;
  }[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default TodoList;

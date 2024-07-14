import axios from "axios";

const API_URL = "https://restapi-ts-todo-8323deb96578.herokuapp.com/api/todos";

// const API_URL = "http://localhost:5000/api/todos";

export const getTodos = async () => {
  return await axios.get(API_URL);
};

export const createTodo = async (todo: { title: string; dueDate: string }) => {
  return await axios.post(API_URL, todo);
};

export const updateTodo = async (
  id: string,
  todo: { title: string; completed: boolean; dueDate: string }
) => {
  return await axios.put(`${API_URL}/${id}`, todo);
};

export const deleteTodo = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`);
};

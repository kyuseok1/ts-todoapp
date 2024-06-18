import axios from "axios";

const API_URL = "https://restapi-ts-todo-8323deb96578.herokuapp.com/api/todos";

export const getTodos = async () => {
  return await axios.get(API_URL);
};

export const createTodo = async (title: string) => {
  return await axios.post(API_URL, { title });
};

export const updateTodo = async (
  id: string,
  todo: { title: string; completed: boolean }
) => {
  return await axios.put(`${API_URL}/${id}`, todo);
};

export const deleteTodo = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`);
};

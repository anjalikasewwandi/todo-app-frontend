import axios from "axios";

const API_URL = "https://localhost:7089/api/Item";

export interface Item {
  title: string;
  description: string;
  status: string;
}

export async function getItems() {
  const response = await axios.get<Item[]>(API_URL); 
  return response.data; 
}

export async function getItem(title: string) {
  const response = await axios.get<Item>(`${API_URL}/${title}`); 
  return response.data; 
}

export async function createItem(item: Item) {
  const response = await axios.post<Item>(API_URL, item); 
  return response.data; 
}

export async function updateItem(title: string, item: Item) {
  await axios.put(`${API_URL}/${title}`, item); 
}

export async function deleteItem(title: string) {
  await axios.delete(`${API_URL}/${title}`); 
}

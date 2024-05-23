import axios from "axios";

const API_URL = "https://localhost:7089/api/Item";

export interface Item {
  Title: string;
  Description: string;
  Status: string;
}

export async function getItems() {
  const response = await axios.get<Item>(API_URL);
  return response.data;
}

export async function getItem(Title: string) {
  const response = await axios.get<Item>(`${API_URL}/${Title}}`);
  return response.data;
}

export async function createItem(Item: Item) {
  const response = await axios.post<Item>(API_URL, Item);
  return response.data;
}

export async function updateItem(Title: string, Item: Item) {
  await axios.put(`${API_URL}/${Title}`, Item); // Send a PUT request to the API endpoint with the user ID and updated user data
}

export async function deleteItem(Title: string) {
  await axios.delete(`${API_URL}/${Title}`); // Send a DELETE request to the API endpoint with the specified user ID
}

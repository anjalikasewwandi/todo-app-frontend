import React, { useEffect, useState } from "react";
import { getItems, deleteItem, Item } from "../services/itemService";
import ItemForm from "./ItemForm";

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchItems();
  }, []);

  const handleDelete = async (title: string) => {
    await deleteItem(title);
    setItems(items.filter((item) => item.title !== title));
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
  };

  const handleFormSubmit = (item: Item) => {
    if (editingItem) {
      setItems(items.map((i) => (i.title === item.title ? item : i)));
    } else {
      setItems([...items, item]);
    }
    setEditingItem(null);
  };

  return (
    <div>
      <h1>Items</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.title}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td className="table-buttons">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.title)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ItemForm
        editingItem={editingItem}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default ItemList;

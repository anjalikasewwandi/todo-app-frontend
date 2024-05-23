import React, { useState, useEffect } from "react";
import { updateItem, createItem, Item } from "../services/itemService";

interface ItemFormProps {
  editingItem: Item | null;
  onFormSubmit: (item: Item) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ editingItem, onFormSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setDescription(editingItem.description);
      setStatus(editingItem.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("");
    }
  }, [editingItem]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const item: Item = {
      title,
      description,
      status
    };

    try {
      if (editingItem) {
        await updateItem(editingItem.title, item);
        onFormSubmit(item);
      } else {
        const newItem = await createItem(item);
        setTitle("");
        setDescription("");
        setStatus("");
        onFormSubmit(newItem);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <input
          type="text"
          className="form-control"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editingItem ? "Update" : "Add"} Item
      </button>
    </form>
  );
};

export default ItemForm;


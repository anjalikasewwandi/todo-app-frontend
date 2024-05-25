import React, { useState, useEffect } from "react";
import { updateItem, createItem, Item } from "../services/itemService";

interface ItemFormProps {
  editingItem: Item | null;
  onFormSubmit: (item: Item) => void;
}

function ItemForm({ editingItem, onFormSubmit }: ItemFormProps) {
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

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("");
  };

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
      } else {
        const newItem = await createItem(item);
        item.title = newItem.title;
      }
      onFormSubmit(item);
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.error("Failed to update or create item", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} >
      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control custom-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control custom-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label">Status</label>
        <input
          type="text"
          className="form-control custom-input"
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

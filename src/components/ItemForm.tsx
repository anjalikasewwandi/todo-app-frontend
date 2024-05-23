import React, { useState, useEffect } from "react";
import { createItem, updateItem, Item } from "../services/itemService";

interface ItemFormProps {
  editingItem: Item | null;
  onFormSubmit: (item: Item) => void;
}

function ItemForm({ editingItem, onFormSubmit }: ItemFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(
    function handleEditingItemChange() {
      if (editingItem) {
        setTitle(editingItem.Title);
        setDescription(editingItem.Description);
        setStatus(editingItem.Status);
      }
    },
    [editingItem]
  );

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDescription(event.target.value);
  }

  function handleStatusChange(event: React.ChangeEvent<HTMLInputElement>) {
    setStatus(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const item: Item = editingItem
      ? {
          ...editingItem,
          Title: title,
          Description: description,
          Status: status,
        }
      : { Title: title, Description: description, Status: status };

    if (editingItem) {
      await updateItem(editingItem.Title, item);
    } else {
      const newItem = await createItem(item);
      item.Title = newItem.Title;
    }
    onFormSubmit(item);
    setTitle("");
    setDescription("");
    setStatus("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <input
          type="text"
          className="form-control"
          value={status}
          onChange={handleStatusChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editingItem ? "Update" : "Add"} Task
      </button>
    </form>
  );
}

export default ItemForm;

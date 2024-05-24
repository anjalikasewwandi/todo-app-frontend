import { useEffect, useState } from "react";
import { getItems, deleteItem, Item } from "../services/itemService";
import ItemForm from "./ItemForm";

function ItemList() {
  // Defining a functional component named ItemList

  // State variables to manage items and editing state
  const [items, setItems] = useState<Item[]>([]); // Initialize state variable to store list of items
  const [editingItem, setEditingItem] = useState<Item | null>(null); // Initialize state variable to store item being edited or null

  // UseEffect hook: Fetches items when the component is first displayed on the screen.
  useEffect(function fetchItems() {
    async function fetchData() {
      const items = await getItems();
      setItems(items);
    }
    fetchData();
  }, []);

  // Function to handle item deletion
  function handleDelete(title: string) {
    deleteItem(title).then(function () {
      setItems(
        items.filter(function (item) {
          return item.title !== title;
        })
      );
    });
  }

  // Function to handle editing an item
  function handleEdit(item: Item) {
    setEditingItem(item);
  }

  // Function to handle form submission for adding/editing items
  function handleFormSubmit(item: Item) {
    if (editingItem) {
      const index = items.findIndex(function (i) {
        return i.title === editingItem.title;
      });
      if (index !== -1) {
        const updatedItems = [...items];
        updatedItems[index] = item;
        setItems(updatedItems);
      }
    } else {
      setItems([...items, item]);
    }
    setEditingItem(null);
  }

  // JSX rendering of the component
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
          {items.map(function (item) {
            return (
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
            );
          })}
        </tbody>
      </table>
      <ItemForm editingItem={editingItem} onFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default ItemList;

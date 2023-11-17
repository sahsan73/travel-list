import { useState } from "react";

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
]; */

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = function (newItem) {
    setItems((items) => [...items, newItem]);
  };

  const handleDeleteItem = function (id) {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  // to toggle the packed status of item
  const handleToggleItem = function (id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = function (e) {
    e.preventDefault();
    // console.log(quantity, description);
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem);
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      {/* Please refer to MDN docs for details how "from" method works
       * "Array.from({ length: 20 }, (_, i) => i + 1)" returns an array
       * [1, 2, ...., 20]*/}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {
          Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))
          // BELOW CODE NOT WORKING -- WILL FIGURE OUT WHY!
          // Array.from({ length: 20 }, (_, i) => (
          //   <option value={i + 1} key={i + 1}>
          //     {i + 1}
          //   </option>
          // ))
        }
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      {/* The value of the input element with type "checkbox" will be true/false */}
      <input
        type="checkbox"
        value={item.packed}
        onChange={(e) => onToggleItem(item.id)}
      />
      {/* conditionally styling: if the item is packed, then we strike through that item */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={(e) => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>👜 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}

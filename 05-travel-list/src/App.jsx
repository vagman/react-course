import { useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => (item.id === id ? { ...item, packed: !item.packed } : item)));
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Statistics />
    </div>
  );
}

function Logo() {
  return <h3>🌴 Far Away 💼</h3>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥰 trip ?</h3>
      <select value={quantity} onChange={event => setQuantity(Number(event.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(element => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item item={item} key={item.id} onDeleteItem={() => onDeleteItem(item.id)} onToggleItem={onToggleItem}>
            {' '}
          </Item>
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Statistics() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your FileList, and you already have packed X (X%)</em>
    </footer>
  );
}

export default App;

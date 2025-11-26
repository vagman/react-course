import { useState } from 'react';
import Logo from './Logo.jsx';
import Form from './Form.jsx';
import PackingList from './PackingList.jsx';
import Statistics from './Statistics.jsx';

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

  function handleClearList() {
    if (window.confirm('Are you sure you want to clear the entire item   list ?')) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Statistics items={items} />
    </div>
  );
}

export default App;

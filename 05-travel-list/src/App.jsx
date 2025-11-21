const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 3, description: 'Charger', quantity: 1, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Statistics />
    </div>
  );
}

function Logo() {
  return <h3>🌴 Far Away 💼</h3>;
}

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitted');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥰 trip ?</h3>
      <select>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(element => (
          <option value={element} key={element}>
            {element}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map(item => (
          <Item item={item} key={item.id}>
            {' '}
          </Item>
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
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

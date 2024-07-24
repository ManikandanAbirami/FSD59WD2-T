import { useState } from 'react'
import './App.css'
import Home from './Home';

function App() {
  const [items, setItems] = useState([]);

  const addItem = () => {
    setItems([...items, `New item ${items.length + 1}`]);
  };

  const removeItem = () => {
    if (items.length > 0) {
      setItems(items.slice(0, -1));
    }
  };

  return (
    <div>
      <h1>React Virtual DOM Example</h1>
      <button onClick={addItem}>Add Item</button>
      <button onClick={removeItem}>Remove Item</button>
      <div id="app">
        {items.map((item, index) => (
          <div key={index} className="item">
            Item {index + 1}: {item}
          </div>
        ))}
      </div>
      <Home />
    </div>
  );
}

export default App

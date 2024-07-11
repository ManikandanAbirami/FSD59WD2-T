import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/greeting')
      .then(res => {
        setGreeting(res.data.message);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const getGreet = () => {
    axios.get('http://localhost:3000/greet')
      .then(res => {
        setGreeting(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  return (
    <div>
      <header>
        <h1>{greeting}</h1>
        <button onClick={getGreet}>Click Me</button>
      </header>
    </div>
  )
}

export default App

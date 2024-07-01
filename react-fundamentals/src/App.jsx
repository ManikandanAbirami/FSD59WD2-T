import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Users from './components/Users'

function App() {

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/users' element={<Users />}>
        </Route>
      </Routes>
    </div>
  )
}

export default App

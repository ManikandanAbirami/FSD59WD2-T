import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/Profile';
import Feed from './components/Feed';
import PrivateRoute from '../src/components/routing/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/profile' element={<PrivateRoute><Profile /> </PrivateRoute>}></Route>
            <Route path='/feed' element={<PrivateRoute><Feed /> </PrivateRoute>}></Route>
            <Route path='/' element={<Navigate to="/login"></Navigate>}></Route>
          </Routes>
        </Layout>
      </Router>
    </AuthProvider >
  )
}

export default App

import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/protectedRoute'
import Login from "./pages/Login"

const Logout = () =>{
  localStorage.clear()
  return <Navigate to="/login" />
}

const RegisterAndLogout = () => {
  localStorage.clear()
  return <Register />
}

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login/>} />
      <Route path="/logout" element={<Logout/>} />
      <Route path="/register" element={<RegisterAndLogout/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
     
    </BrowserRouter>
  )
}

export default App

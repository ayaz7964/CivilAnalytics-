import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import NavBar from './NavBar'
import Footer from './Footer'
import Login from './Login'
import SingUp from './SignUp'

export default function Routing() {
  return (
    <div>
      <NavBar />
        <Routes> 
        <Route path="/" element={<h1>AH</h1>} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SingUp/>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
    </Routes>
       <Footer/>
    </div>
  )
}

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import NavBar from './NavBar'
import Footer from './Footer'
import Login from './Login'
import SingUp from './SignUp'
import LeaderBord from './LeaderBord'
import About from './About'
import Contact from './Contact'

export default function Routing() {
  return (
    <div>
      <NavBar />
        <Routes> 
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path='/about' element = {<About/>} />
        <Route path='/contact' element = {<Contact/>} />
        <Route path="/signup" element={<SingUp/>} />
        <Route path="/leaderboard" element={<LeaderBord />} />
        {/* <Route path="/" element={<h1>Dashboard</h1>} /> */}
    </Routes>
       <Footer/>
    </div>
  )
}

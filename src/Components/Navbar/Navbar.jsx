
import React from 'react'
import navLogo from "./assets/Services-4.png"
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
  return (
    <div className='nav-container'>
        <div className='nav-logo'>
            <img src={navLogo} style={{width:"50px",height:"50px"}} alt="Logo"/>
            <span className='vidstream'>vidstream</span>
        </div>
        <div className='nav-link'>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
            <NavLink to="/movie" className={({ isActive }) => isActive ? "active-link" : ""}>Movie</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink>
        </div>
        <div className='login'>Login</div>
    </div>
  )
}

export default Navbar

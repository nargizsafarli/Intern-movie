import React from 'react'
import glubenLogo from "./assets/Gabung-Logo-1.png"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import "./Footer.css"

function Footer() {
  const currentYear = new Date().getFullYear(); 
  return (
    <div className='footer-container'>
       <h2>Subscribe Our Newsletter</h2>
       <img className='glubenLogo' src={glubenLogo}/>
       <div className='pages'>
        <span>Home</span>
        <span>About us</span>
        <span>Services</span>
        <span>Blog</span>
        <span>Contact</span>
       </div>
       <p className='lorem'>Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut elit tellus, luctus nec ullam corper mattis.</p>
       <div className='footer-link'>
        <p className='link-items'><a href=''><FaFacebook /></a></p>
        <p className='link-items'><a href=''><FaInstagram /></a></p>
        <p className='link-items'><a href=''><FaTwitter /></a></p>
        <p className='link-items'><a href=''><FaYoutube /></a></p>
       </div>

       <div className='copyright'>
           <div className='line'></div>
           <p>Copyright {currentYear} © All Right Reserved Design by Rometheme</p>
       </div>
    </div>
  )
}

export default Footer
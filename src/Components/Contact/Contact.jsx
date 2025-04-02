import React from 'react'
import "./Contact.css"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Contact() {
  return (
    <div className='constact-container'>
    <div className='contact-left'>
      <h1>Get In Touch</h1>
      <p>Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Donec maximus diam ut nunc lobortis, pulvinar sodales orci hendrerit. Curabitur luctus tellus nec est aliquam lacinia. Nulla vel risus vel mauris interdum vehicula amatug.
      </p>
      <div>
        <img/>
        <div className='contact-inf'>
          dd
        </div>

      </div>
      <h4>Our Social Media</h4>
       <div className='footer-link'>
                          <p className='link-items'><a href=''><FaFacebook /></a></p>
                          <p className='link-items'><a href=''><FaInstagram /></a></p>
                          <p className='link-items'><a href=''><FaTwitter /></a></p>
                          <p className='link-items'><a href=''><FaYoutube /></a></p>
         </div>
    </div>
    <div className='form'>


    </div>
    </div>
  )
}

export default Contact
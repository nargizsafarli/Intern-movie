import React from 'react'
import "./About.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from "./assets/Team-7.jpg"
import img1 from "./assets/Testimonial-1.jpg"
import img2 from "./assets/person3.jpg"
import img3 from "./assets/Team-8.jpg"
import img4 from "./assets/insan iste.jpg"
import curly from "./assets/Screenshot 2025-04-01 192655.png"
import { FaFacebook } from "react-icons/fa"
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function About() {

  const teamMembers = [
    { name: 'Tim Sebastian', role: 'Producer', img: img1 },
    { name: 'Johnny Slash', role: 'Screenwriter', img:img2 },
    { name: 'Michael Paul', role: 'Director', img: img3 },
    { name: 'Chloe Maria', role: 'Production Designer', img: img4 },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <div className="arrow next">›</div>,
    prevArrow: <div className="arrow prev">‹</div>,
  };

  return (
    <div className='about-container'>
      <div className='about-img'>
      <h1>About Us</h1>
      <p> <span>Home</span>/About Us</p>
      </div>

      <div className='about-person'>
        <div className='personn'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur odio ligula, varius nec augue eget, scelerisque lacinia sapien. Nam eu mi in justo gravida imperdiet.
          </p>
          <div className='person-item'>
            <div className='item-con'>
             <img src={logo} className='item-img'/>
             <div className='items'>
              <h1>Danilla Marie</h1>
              <p>Actress</p>
             </div>
            </div>
            <div><img src={curly}/></div>
          </div>
        </div>
        <div className='personn'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur odio ligula, varius nec augue eget, scelerisque lacinia sapien. Nam eu mi in justo gravida imperdiet.
          </p>
          <div className='person-item'>
            <div className='item-con'>
             <img src={logo} className='item-img'/>
             <div className='items'>
              <h1>Danilla Marie</h1>
              <p>Actress</p>
             </div>
            </div>
            <div>qirmizi img</div>
          </div>
        </div>
        
      </div>
       
       <div className='team-container'>
         <div className='team-text'>team</div>
         <h3 className='preff'>Our Professional Team</h3>

         <div className="slider-container">
      <Slider {...settings}>
        {teamMembers.map((member, index) => (
          <div key={index} className="card">
            <img src={member.img} alt={member.name} className="card-image" />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
             <div className='footer-link'>
                    <p className='link-items'><a href=''><FaFacebook /></a></p>
                    <p className='link-items'><a href=''><FaInstagram /></a></p>
                    <p className='link-items'><a href=''><FaTwitter /></a></p>
                    <p className='link-items'><a href=''><FaYoutube /></a></p>
             </div>
          </div>
        ))}
      </Slider>
    </div>
       </div>

    </div>
  )
}

export default About
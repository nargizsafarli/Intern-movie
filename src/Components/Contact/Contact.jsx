import React, { useState } from 'react';
import "./Contact.css";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import wwwImg from "./assets/Screenshot 2025-04-02 213420.png"

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  const validate = () => {
    let isValid = true;
    let newError = {};

    if (!firstName.trim()) {
      newError.firstName = "This field is required";
      isValid = false;
    }
    if (!lastName.trim()) {
      newError.lastName = "This field is required";
      isValid = false;
    }
    if (!email || !emailRegex.test(email)) {
      newError.email = "Email must be gmail.com format";
      isValid = false;
    }
    if (!subject.trim()) {
      newError.subject = "This field is required";
      isValid = false;
    }
    if (!message.trim()) {
      newError.message = "This field is required";
      isValid = false;
    }
    setError(newError);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((user) => user.email === email)) {
      alert("Bu email artıq mövcuddur");
      return;
    }

    const newUser = { firstName, lastName, email, subject, message };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Mesaj göndərildi");
  };

  return (
    <div className='contact-container'>
      <div className='contact-left'>
        <h1>Get In Touch</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className='contact-left-item'>
         <img src={wwwImg}/>
         <div className='contact-inf'>
           <div className='inf-items'>
             <h1>Phone</h1>
             <span>+123-234-1234</span>
           </div>
           <div className='inf-items'>
             <h1>Email</h1>
             <span>hello@awesomesite.com</span>
           </div>
           <div className='inf-items'>
             <h1>Website</h1>
             <span>www.domainsite.com</span>
           </div>
           <div className='inf-items'>
             <h1>Address</h1>
             <span>KLLG st, No.99, Pku City, ID 28289</span>
           </div>
         </div>
</div>
        <h4 className='ourSocial'>Our Social Media</h4>
        <div className='contact-link'>
          <a href='#'><FaFacebook /></a>
          <a href='#'><FaInstagram /></a>
          <a href='#'><FaTwitter /></a>
          <a href='#'><FaYoutube /></a>
        </div>
      </div>
      <div className='form'>
      <div className='detail-form-group'>
        <div className="form-group">
          <input type="text" placeholder="Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <span className="error">{error.firstName}</span>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Surname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <span className="error">{error.lastName}</span>
        </div>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <span className="error">{error.email}</span>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <span className="error">{error.subject}</span>
        </div>
        <div className="form-group">
          <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <span className="error">{error.message}</span>
        </div>
        <button className='send-message' onClick={handleSubmit}>Send Message</button>
      </div>
    </div>
  );
}

export default Contact;

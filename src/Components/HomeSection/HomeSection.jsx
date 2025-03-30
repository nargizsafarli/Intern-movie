import React from "react";
import "./HomeSection.css";
import { useNavigate } from "react-router-dom";

function HomeSection() {
  const navigate=useNavigate()
  return (
    <div className="homeSection-container">
      <div className="studio">A Film By Goodmov Studio</div>
      <div className="home-inf">
        <h2>48 Hours with Z</h2>
        <p>"Outrun of The Z, Outlast The Night"</p>
        <span>
          BILL SMITH | JENNIFER SHANCEZ | SYLVESTER STULHEN | HANK GRILLO |
          MERIAM BALIN
        </span>
        <button onClick={()=>navigate("/movie")} className="discover-more">Discover More</button>
      </div>
    </div>
  );
}

export default HomeSection;

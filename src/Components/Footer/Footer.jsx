import React from 'react'
import glubenLogo from "./assets/Gabung-Logo-1.png"

function Footer() {
  return (
    <div>
       <h2>Subscribe Our Newsletter</h2>
       <img src={glubenLogo}/>
       <div className='pages'>
        <span>Home</span>
        <span>Home</span>
        <span>Home</span>
        <span>Home</span>
       </div>
       <p>Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Ut elit tellus, luctus nec ullam corper mattis.</p>
    </div>
  )
}

export default Footer
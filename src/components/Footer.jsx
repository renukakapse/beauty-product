import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div className='flex flex-col'>
    <div className=' py-2 px-2 flex items-start justify-around bg-pink-100'>
       <div>
        <h2>Natural/Organic</h2>
        <ul>
          <li>📞+91-8888152671</li>
          <li>📧kapserenuka32@gmail.com</li>
          <li>⌚10-am to 8-pm</li>
        </ul>
       </div>
       <div>
        <ul>
         <h2 className='text-xl captialize '>links</h2>
          <li className='capitalize '><Link to="/">home</Link></li>
          <li className='capitalize '><Link to="/about">about</Link></li>
          <li className='capitalize '><Link to='product'>product</Link></li>
          <li className='capitalize '><Link to='contact'>contact</Link></li>
          {/* <li className='capitalize '><Link to='offer'>offer</Link></li> */}
        </ul>
       </div>
       <div>
        <h2 className='text-xl capitalize'>subscibe</h2>
        <div>
          <a href=''></a>
          <a href=''></a>
          <a href=''></a>
        </div>
       </div>
    </div>
    <div className='flex items justify-center bg-pink-300 py-2 px-3'>
      <p>Natural/Organic @copyright | 2026-2027</p>
    </div>
    </div>
  )
}

export default Footer
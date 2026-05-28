import React from 'react'

function Contact() {
  return (
    <div>
      <div className='min-h-screen bg-white-800 py-16 px-6'>
      <div className='max-w-xl mx-auto bg-pink-300 p-10 rounded-xl shadow-md'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Contact Us</h1>
        <form className='space-y-4'>
          <input type='text' placeholder='Your Name' className='w-full border p-3 rounder'/>
         <input type='text' placeholder='Your Name' className='w-full border p-3 rounder'/>
          <textarea  placeholder='Your Name' className='w-full border p-3 rounder'></textarea>
         <button className='w-full bg-pink tect-white py-3 rounded hover:bg-white-800 border-4 border-white'>Send Massage</button>
</form>
      </div>
    </div>
    </div>
  )
}

export default Contact
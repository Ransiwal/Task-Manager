import React from 'react'

import image from "../assets/image.png"

const Navbar = () => {
  return (
    <div className='bg-blue-500 flex flex-row mx-10 justify-around'>
        <img width={40} src={image} alt="image" />
        <button className='bg-red-500 rounded-xl p-1 my-2'>Logout</button>
    </div>
  )
}

export default Navbar
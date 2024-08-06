import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div className='max-w-screen-xl m-auto'>
        <Navbar />

        <Outlet />
    </div>
  )
}

export default Layout
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const DefaultLayout = () => {
  return (
    <div className='h-screen flex flex-col gap-6 justify-between p-2 md:p-4 '>
     <div>

      <Navbar/>
      <div className='h-[75vh] overflow-y-auto overflow-x-hidden'>

      <Outlet />
     </div>
     </div>
      <Footer/>
    </div>
  )
}

export default DefaultLayout
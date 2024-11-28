import React, { Children } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <>
        <Navbar/>
        <div className='container w-[80%] m-auto py-24  '>
            <Outlet/>
        </div>
        
    </>
  )
}

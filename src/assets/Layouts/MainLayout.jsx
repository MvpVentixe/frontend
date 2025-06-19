import React from 'react'
import Navbar from '/src/assets/Components/Navbar'
import Header from '/src/assets/Components/Header'
import Footer from '/src/assets/Components/Footer'
import { Outlet } from 'react-router-dom'
const MainLayout = () => {
  return (
  
  <div className='main-wrapper'>
    <Navbar/>
    <Header/>
    <main className='main'>
        <Outlet/>
    </main>
    <Footer/>
  </div>
  )
}

export default MainLayout
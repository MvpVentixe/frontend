import React from 'react'
import { Outlet } from 'react-router-dom'
import CenterLayoutHeader from '../Components/CenterLayoutHeader'

const CenteredLayout = () => {
  return (
    <div >
      <CenterLayoutHeader/>
      <main className='main-center'>
        <Outlet/>
      </main>
    </div>
  )
}

export default CenteredLayout
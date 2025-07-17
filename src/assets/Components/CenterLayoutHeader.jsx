import React from 'react'
import { Link } from 'react-router-dom'
import Events from '../Pages/Events'

const CenterLayoutHeader = () => {
  return (
    <div className='center-layout-header'>
        <>
        <Link to="/events">
          <img src="/Icons/Logo/logo.svg" alt="" />
        </Link>
        <Link className='ventixe-text' to="/events">Ventixe</Link>
        
        </>
    </div>
  )
}

export default CenterLayoutHeader
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Events from './assets/Pages/Events'

const App = () => {
  return (
    <Routes>
      <Route path='/events' element={<Events/>}/>
    </Routes>
  )
}

export default App
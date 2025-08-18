import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Events from './assets/Pages/Events'
import Bookings from './assets/Pages/Bookings'
import MainLayout from './assets/Layouts/MainLayout'
import CenteredLayout from './assets/Layouts/CenteredLayout'
import SignUp from './assets/Pages/SignUp'
import SignIn from './assets/Pages/SignIn'
import PrivateRoute from './assets/Components/PrivateRoute'
import EventDetails from './assets/Pages/EventDetails'
import AddEventForm from './assets/Pages/AddEventForm'


const App = () => {
  

  return (
    <Routes>

      <Route path='/auth' element={<CenteredLayout/>} >
      
        <Route path='signin' element={<SignIn/>} />
        <Route path='signup' element={<SignUp/>} />

      </Route>

      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Events/>}/>
        <Route path="events" element={<Events/>}/>
        <Route path='events/:id' element={<EventDetails/>}/>
        <Route 
          path="bookings" 
          element={
            <PrivateRoute>
              <Bookings/>
            </PrivateRoute> 
          }
          />
        <Route
          path='addeventform'
          element={
          <PrivateRoute>
            <AddEventForm/>
          </PrivateRoute>}
          />
          

        

      </Route>

    </Routes>
  )
}

export default App
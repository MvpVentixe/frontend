import React from 'react'
import '../Css/AddEventForm.css';

const AddEventForm = () => {
  return (
    <div className='page-container'>
        <h1>Add event</h1>
        <form action="POST" className='form-flex'>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Event title</label>
                <input type="text" className='input-style' placeholder='Event title'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Description</label>
                <input type="text" className='input-style' placeholder='Description'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Location</label>
                <input type="text" className='input-style' placeholder='Location'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Event Date & Time</label>
                <input type="datetime-local" className='input-style' placeholder='Event Date & Time'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Price</label>
                <input type="number" className='input-style' placeholder='Price'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>ImageUrl</label>
                <input type="text" className='input-style' placeholder='ImageUrl'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Category</label>
                <input type="text" className='input-style' placeholder='Category'/>
            </div>
            <button className='btn'>Add Event</button>
        </form>
    </div>
  )
}

export default AddEventForm
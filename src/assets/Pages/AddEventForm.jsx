import React, { useState } from 'react'
import '../Css/AddEventForm.css';

const AddEventForm = () => {

    const [formData, setFormData] = useState({
        title : "",
        description : "",
        location : "",
        eventdatetime : "",
        price : "",
        imageurl : "",
        category : "",
    });

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData((prev) => ({...prev,[name] : value,}));
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const res = await fetch("https://eventserviceapplication-etgsccg0b3fhhbcv.swedencentral-01.azurewebsites.net/api/Event/addevent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Title : formData.title,
                    Description : formData.description,
                    Location : formData.location,
                    EventDateTime : formData.eventdatetime,
                    Price : formData.price,
                    ImageUrl : formData.imageurl,
                    Category : formData.category,

                    }),
                });
            if(res.ok){
                alert("Event added!")
                setFormData({
                    title: "",
                    description: "",
                    location: "",
                    eventdatetime: "",
                    price: "",
                    imageurl: "",
                    category: "",
                });
            }
        } 
        
        catch (error) {
            alert("Failed to submit event. Try again.")
            console.error(error);
        }

    }

  return (
    <div className='page-container'>
        <h1>Add event</h1>
        <form className='form-flex' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Event title</label>
                <input name='title' type="text" value={formData.title} className='input-style' onChange={handleChange} placeholder='Event title'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Description</label>
                <input name='description' type="text" value={formData.description} className='input-style' onChange={handleChange} placeholder='Description'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Location</label>
                <input name='location' type="text" value={formData.location} className='input-style' onChange={handleChange} placeholder='Location'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Event Date & Time</label>
                <input name='eventdatetime' type="datetime-local" value={formData.eventdatetime} className='input-style' onChange={handleChange} placeholder='Event Date & Time'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Price</label>
                <input name='price' type="number" value={formData.price} className='input-style' onChange={handleChange} placeholder='Price'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>ImageUrl</label>
                <input name='imageurl' type="text" value={formData.imageurl} className='input-style' onChange={handleChange} placeholder='ImageUrl'/>
            </div>
            <div className='form-group'>
                <label htmlFor="" className='label-style'>Category</label>
                <input name='category' type="text" value={formData.category} className='input-style' onChange={handleChange} placeholder='Category'/>
            </div>
            <button className='btn'>Add Event</button>
        </form>
    </div>
  )
}

export default AddEventForm
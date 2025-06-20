import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



const EventDetails = () => {

  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isBooked, setIsBooked] = useState(false)
  const token = localStorage.getItem("token");
  let decoded = null;
  let userId = null;
  if (token) {
      try {
        decoded = jwtDecode(token);
        userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`https://eventserviceapplication-etgsccg0b3fhhbcv.swedencentral-01.azurewebsites.net/api/Event/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        console.log("Loaded event:", data);
        setEvent(data);
      } catch (err) {
        console.error("Failed to load event:", err);
        console.error(err);
      }
    };

    fetchEvent();
  }, [id]);

    const handleBtnClick = async ()=>{
        if (!event) {
        alert("Event not loaded yet.");
        return;
      }

    const eventId = event.id || event.Id;
        if (!eventId || !userId) {
        alert("Missing user or event ID");
        return;
      }
    try {
      const response = await fetch("https://bookingserviceapplication-examgbengsb8dkfh.swedencentral-01.azurewebsites.net/api/Booking/bookingCreation", {
        method: "POST",
        headers: 
        {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId : event.id,
          userId: userId,
        }),
        
      });

      if (response.ok) {
          setIsBooked(true);
          alert("Booking successful!");
        } else {
          const error = await response.text();
          alert("Booking failed: " + error);
        }

        } catch (error) {
          alert("An error occurred: " + error.message);
        }

  }


  if (!event) return <p>Loading...</p>;

  return (
    <div className='event-details'>
      <div className='background-img' style={{ 
              backgroundImage: `url(${event.imageUrl})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}>
        <p className='category'>{event.category}</p>
      </div>
      <h4>{event.title}</h4>
      <div className='eventinfo-group'>
        <div className='event-date'>
          <p>{new Date(event.eventDateTime).toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>

          <p>{event.location}</p>
        </div>
        <p className='event-price'>{event.price}$</p>
      </div>
      <p>{event.description}</p>
      <button onClick={handleBtnClick} className='buy-btn' disabled={isBooked}>{isBooked ? "Booked" : "Book Event"}</button>
    </div>
  )
}

export default EventDetails
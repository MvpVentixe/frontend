import React from 'react';
import '../Css/Ticket.css';

const Ticket = ({bookingId, eventName, location, date, time, attendeeName, barcodeValue }) => {

  const handleClick = async ()=>{
    try {
    const response = await fetch(`https://localhost:7189/api/booking/deleteBooking/${bookingId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Booking deleted successfully');
    } else if (response.status === 404) {
      alert('Booking not found');
    } else {
      const errorData = await response.json();
      alert(`Failed to delete booking: ${errorData.message || 'Unknown error'}`);
    }

  } catch (error) {
    console.error('Network error:', error);
    alert('Could not connect to the booking service');
  }
  }



  return (
    <div className="ticket">
      <h1>{eventName}</h1>
      <div className="details">
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
      </div>
      <div className="barcode">
        <img 
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(barcodeValue)}&size=150x50`} 
          alt="Barcode" 
        />
      </div>
      <div className="name">
        Attendee: {attendeeName}
      </div>
      <button className='signup-btn' onClick={handleClick}> Cancel booking </button>
    </div>
  );
};

export default Ticket;

import React, { useEffect, useState } from 'react';
import Ticket from '../Components/Ticket';
import { jwtDecode } from 'jwt-decode';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      try {
        const response = await fetch(`https://bookingserviceapplication-examgbengsb8dkfh.swedencentral-01.azurewebsites.net/api/Booking/bookingsByUserId/${userId}`);
        if (!response.ok) throw new Error("Failed to get bookings");

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    })();
  }, []);

  return (
    <div className='ticket-style'>
      <h2>Your Bookings</h2>
      {bookings.map(booking => (
        <Ticket
          key={booking.id}
          bookingId={booking.id}
          eventName={booking.title}
          location={booking.location}
          date={booking.eventDateTime.split('T')[0]}
          time={booking.eventDateTime.split('T')[1].slice(0, 5)}
          attendeeName={booking.fullName}
          barcodeValue={booking.qrCode}
        />
      ))}
    </div>
  );
};

export default Bookings;

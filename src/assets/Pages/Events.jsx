import { useNavigate } from 'react-router-dom'
import Searchbar from '../Components/Searchbar'
import "./Events.css"
import React, { useEffect, useState } from 'react'

const Events = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 6;
    const [events, setEvents] = useState([]);

  const fetchEvents = async ()=>{
    try {
      const response = await fetch("https://localhost:7116/api/event/allevents");
      if(!response.ok)
        {
          const errordata = await response.json();
          alert(errordata.message || "failed to load events")
          return;
        }

        const data = await response.json();
        setEvents(data);
      
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something went wrong fetching events");
    }
  }
const indexOfLastEvent = currentPage * eventsPerPage;
const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)

const paginate = (pageNumber) => setCurrentPage(pageNumber);

const handleCardClick = (id)=>{
  navigate(`/events/${id}`);
};

useEffect(()=>{
  fetchEvents();
}, []);

  return (
    <div className='event-grid'>
      <div className="searchbar-grid">
        <Searchbar/>
      </div>

        {currentEvents.map(event => (
          <div onClick={()=> handleCardClick(event.id)} key={event.id} className='event-card'>
            <div className='background-img' style={{ 
              backgroundImage: `url(${event.imageUrl})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}>
              <p className='category'>{event.category}</p>
            </div>
            <p className='event-date'> {event.date} </p>
            <p className='event-title' >{event.title}</p>
            <p className='event-price' >${event.price}</p>

          </div>

        ))}

      <div className="pagination">
        {Array.from({ length: Math.ceil(events.length / eventsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>
            {i + 1}
          </button>
        ))}
      </div>

    </div>
  )
}


export default Events
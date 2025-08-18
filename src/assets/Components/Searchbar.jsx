import React, { useState } from 'react'
import "../Css/Searchbar.css"

const Searchbar = ( {OnSearch} ) => {

  const [value, setValue] = useState("")

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {

      let data;

      if(!value.trim()){
        const res = await fetch("https://eventserviceapplication-etgsccg0b3fhhbcv.swedencentral-01.azurewebsites.net/api/Event/allevents")
        data = await res.json();
      } else {

        const response = await fetch(`https://eventserviceapplication-etgsccg0b3fhhbcv.swedencentral-01.azurewebsites.net/api/Event/onsearch/${value}`);
        if(!response.ok){
          const errordata = await response.json();
          alert(errordata.message || "failed to load search results")
          return
        }
        data = await response.json();
      }

      OnSearch(data)
      
    } catch (error) {
      
    }
  }

  return (
    <div>
        <form action="/search" onSubmit={handleSubmit} className='searchbar'>
            <input type="text" placeholder='Search name, event, etc' className='search-input' onChange={(e) => setValue(e.target.value)}/>
            <button type="submit" className='search-btn'><img src="/Icons/System/MagnifyingGlass.svg" alt="" className='search-btn-icon' /></button>
      </form>
    </div>
  )
}

export default Searchbar
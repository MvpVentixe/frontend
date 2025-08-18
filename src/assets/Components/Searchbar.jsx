import React from 'react'
import "../Css/Searchbar.css"

const Searchbar = ( {OnSearch} ) => {

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {

      const response = await fetch("url");
      if(!response.ok){
        const errordata = await response.json();
        alert(errordata.message || "failed to load search results")
        return
      }

      const data = await response.json();
      
    } catch (error) {
      
    }
  }

  return (
    <div>
        <form action="/search" onSubmit={handleSubmit} className='searchbar'>
            <input type="text" placeholder='Search name, event, etc' className='search-input'/>
            <button type="submit" className='search-btn'><img src="/Icons/System/MagnifyingGlass.svg" alt="" className='search-btn-icon' /></button>
      </form>
    </div>
  )
}

export default Searchbar
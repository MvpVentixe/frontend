import React from 'react'
import "../Css/Searchbar.css"

const Searchbar = () => {
  return (
    <div>
        <form action="/search" method="GET" className='searchbar'>
            <input type="text" placeholder='Search name, event, etc' className='search-input'/>
            <button type="submit" className='search-btn'><img src="/Icons/System/MagnifyingGlass.svg" alt="" className='search-btn-icon' /></button>
      </form>
    </div>
  )
}

export default Searchbar
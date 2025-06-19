// import { useState } from "react"
// import React from 'react'
// import { Link } from "react-router-dom"


// const Header = () => {
//   const isAuthenticated = !!localStorage.getItem('token');
//   const [isOpen, setIsOpen] = useState(false)
//   const [isHeaderOpen, setIsHeaderOpen] = useState(true)

//   const toggleDropdown = ()=>{
//     setIsOpen(prev=>!prev);
//     setIsHeaderOpen(prev=>!prev);
//   };

//   return (

//   <>
//     <div className="mobile-header-display" >

//       { isHeaderOpen && (
//         <div className='header'>
//             <Link to="/events">
//               <img src="src\assets\Icons\Logo\logo.svg" alt="Ventixe Logo" className='navbar-logo'/>
//             </Link>
//             <p>Ventixe</p>
//             <button onClick={toggleDropdown} id='header-menu-btn'>
//               <img src="src\assets\Icons\System\icon-icon-list.svg" alt="navbar button" />
//             </button>
//         </div>
//       )}
//       {isOpen && (
//         <div className='header-navbar'>
//           <Link className="navbar-a" to="/events" onClick={() => {
//               setIsOpen(false);
//               setIsHeaderOpen(true);
//             }}>
//             <button className="navbar-btn" type='button'>Events</button>
//           </Link>

//           <Link className="navbar-a" to="/bookings" onClick={() => {
//               setIsOpen(false);
//               setIsHeaderOpen(true);
//             }}>
            
//             <button className="navbar-btn" type='button'>Bookings</button>
//           </Link>

//           <Link className="navbar-a" to="auth/signin" onClick={() => {
//               setIsOpen(false);
//               setIsHeaderOpen(true);
//             }}>
//             <button className="navbar-btn" type='button'>Sign In</button>
//           </Link>

//         </div>
//       )}
      
//     </div>

//     <div className="tablet-header header" >
//         <p className="route"><span className="route-highlight">Dashboard</span> / Events</p>
//         { isAuthenticated && (
//           <Link to="/auth/signin" className="text-decoration" >
//             <button id="header-signout-btn" >
//               Sign In
//               <img src="src\assets\Icons\System\UserCircleCheck.svg" alt="" />
//             </button>
//           </Link>
//         )}
//     </div>
  
//   </>
//   )
// }

// export default Header


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChanged", handleAuthChange);
    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
    setIsHeaderOpen(prev => !prev);
  };

  return (
    <>
      <div className="mobile-header-display">
        {isHeaderOpen && (
          <div className="header">
            <Link to="/events">
              <img src="/src/assets/Icons/Logo/logo.svg" alt="Ventixe Logo" className="navbar-logo" />
            </Link>
            <p>Ventixe</p>
            <button onClick={toggleDropdown} id="header-menu-btn">
              <img src="/src/assets/Icons/System/icon-icon-list.svg" alt="navbar button" />
            </button>
          </div>
        )}

        {isOpen && (
          <div className="header-navbar">
            <Link className="navbar-a" to="/events" onClick={toggleDropdown}>
              <button className="navbar-btn" type="button">Events</button>
            </Link>

            <Link className="navbar-a" to="/bookings" onClick={toggleDropdown}>
              <button className="navbar-btn" type="button">Bookings</button>
            </Link>

            {!isAuthenticated && (
              <Link className="navbar-a" to="/auth/signin" onClick={toggleDropdown}>
                <button className="navbar-btn" type="button">Sign In</button>
              </Link>
            )}
          </div>
        )}
      </div>

      <div className="tablet-header header">
        <p className="route"><span className="route-highlight">Dashboard</span> / Events</p>
        {!isAuthenticated && (
          <Link to="/auth/signin" className="text-decoration">
            <button id="header-signout-btn">
              Sign In
              <img src="/src/assets/Icons/System/UserCircleCheck.svg" alt="sign in icon" />
            </button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Header;

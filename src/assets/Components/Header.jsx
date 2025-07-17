import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  const handleSignOut = async () => 
    {
      try {
        const response = await fetch("https://authserviceapplication-g9a7chb9hka9ded7.swedencentral-01.azurewebsites.net/api/Auth/signout", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem(token)}`
          }
        })

        if(response.ok)
          {
            localStorage.removeItem("token");
            window.dispatchEvent(new Event("authChanged"));

            alert("Signed out successfully");
            navigate("/");
          } else {
              alert('Sign out failed');
            }
        
      } catch (error) {
        console.error('Error during sign out:', error);
        alert('Something went wrong');
      }
    }

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
              <img src="/Icons/Logo/logo.svg" alt="Ventixe Logo" className="navbar-logo" />
            </Link>
            <p>Ventixe</p>
            <button onClick={toggleDropdown} id="header-menu-btn">
              <img src="/Icons/System/icon-icon-list.svg" alt="navbar button" />
            </button>
          </div>
        )}

        {isOpen && (
          <div className="header-navbar">
            <Link className="navbar-a" to="/events" onClick={toggleDropdown}>
            
              <button className="navbar-btn" type="button">Events</button>
            </Link>

            {/* <Link className="navbar-a" to="/bookings" onClick={toggleDropdown}>
              <button className="navbar-btn" type="button">Bookings</button>
            </Link> */}

            {!isAuthenticated && (
              <Link className="navbar-a" to="/auth/signin" onClick={toggleDropdown}>
                <button className="navbar-btn" type="button">Sign In</button>
              </Link>
            )}
            {isAuthenticated && (
              <>
                <Link className="navbar-a" to="/bookings" onClick={toggleDropdown}>
                <button className="navbar-btn" type="button">Bookings</button>
                </Link>
                <Link className="navbar-a" to="/auth/signin" onClick={handleSignOut}>
                  <button className="navbar-btn" type="button">Sign Out</button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <div className="tablet-header header">
        <p className="route"><span className="route-highlight">Dashboard</span> / Events</p>
        {!isAuthenticated && (
          <>
            <Link to="/auth/signin" className="text-decoration">
              <button id="header-signout-btn">
                Sign In
                <img src="/Icons/System/UserCircleCheck.svg" alt="sign in icon" />
              </button>
            </Link>
          
          </>
        )}
      </div>
    </>
  );
};

export default Header;

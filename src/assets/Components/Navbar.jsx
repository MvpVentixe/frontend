import { Link, useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isAuthenticated = !!localStorage.getItem('token');
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

  return (
    <div className='navbar'>
      <div className='navbar-flex'>
        <Link className='logo text-decoration' to="/events">
          <img src="/Icons/Logo/logo.svg" alt="Ventixe Logo"/>
          <span id='icon-names' className="logo-name"> Ventixe </span>
        </Link>
        <Link className='text-decoration' to="/events">
          <button className='navbar-btn' > <img className='navbar-icon' src="/Icons/Nav/Vector-3.svg" alt="events icon" /> <span id='icon-names'> Events </span> </button>
        </Link>

        { isAuthenticated && (
          <>
            <Link className='text-decoration' to="/bookings">
              <button className='navbar-btn' > <img className='navbar-icon' src="/Icons/Nav/Vector-8.svg" alt="booking icon" /> <span id='icon-names'> Bookings </span> </button>
            </Link>
            <button onClick={handleSignOut} className='navbar-btn' > <img className='navbar-icon' src="/Icons/Nav/Vector-1.svg" alt="sign out icon" /> <span id='icon-names'> Sign Out </span> </button>
            
          </>

        )}



        
      </div>
    </div>
  )
}

export default Navbar
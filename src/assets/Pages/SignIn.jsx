import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    });

   const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
   }
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
        try {
          const response = await fetch("https://localhost:7182/api/auth/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });

          if(!response.ok)
            {
              const errorData = await response.json();
              alert(errorData.message || "Login Failed.")
              return;

            }

          const data = await response.json();

          if(response.ok && data.token)
            {
              localStorage.setItem("token", data.token);
              window.dispatchEvent(new Event("authChanged"));
              alert(data.message)
              navigate("/")
            }
        }

        catch (error) {
          console.error("Network or unexpected error:", error);
          alert("Something went wrong. Please try again later.");
        }
   };

   

  return (
    <div className='sign-up-container'>
      <h3>Sign In</h3>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor="email">Email</label>
          <input id='email' name='email' value={formData.email} type="email" placeholder='Email' onChange={handleChange} required/>
        </div>
        
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input id='password' name='password' value={formData.password} type="password" placeholder='Password' onChange={handleChange} required/>
        </div>

        <button className='signup-btn'>Sign In</button>

      </form>

      <p> Dont have an account? <Link to="/auth/signup">Sign up</Link> </p>

    </div>
  )
}

export default SignIn
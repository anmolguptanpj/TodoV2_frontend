import React, { useEffect } from 'react'
import { useAuth } from './Context/AuthContext.js'
import  {Link, useNavigate } from 'react-router-dom'

function home() {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();


  useEffect(()=>{
    if(isAuthenticated,navigate){
      navigate("/todos");
    }
  },[isAuthenticated, navigate]);

  
  return (
    <div >
            <h1>Todo App</h1>
            <h2>Developed By Anmol Gupta</h2>
            <nav style={{display:"flex",justifyContent:"space-between"}}>
                <Link to='/login'> Login </Link>
                <Link to='/signup'> Signup </Link>
                <Link to='/forgot'> Forgot Password </Link>
            </nav>
        </div>
  )
}

export default home
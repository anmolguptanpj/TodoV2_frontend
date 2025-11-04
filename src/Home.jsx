import React from 'react'
import  {Link} from 'react-router-dom'

function home() {
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
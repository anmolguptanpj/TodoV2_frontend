import React from 'react'
import  {Link} from 'react-router-dom'
function login() {
  return (
   <div>
            <h2>Login Page</h2>
            <form>
                <input type = "email" placeholder = "Email" />
                <input type = "password" placeholder="Password" />
                <button> Login </button>
            </form>
            <Link to="/">Back to Home</Link>
        </div>
  )
}

export default login
import React from 'react'
import  {Link} from 'react-router-dom'
function forgot() {
  return (
    <div>
            <h2>Forgot Password</h2>
            <form>
                <input type="email" placeholder="Enter your email"/>
                <button> Reset Password</button>
            </form>
            <Link to="/">Back to Home</Link>
        </div>
  )
}

export default forgot
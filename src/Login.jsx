import React, { useEffect,useState } from 'react'
import  {Link} from 'react-router-dom'
import { useAuth } from './Context/AuthContext'

function Login() {
  
  

  const {login,isAuthenticated} = useAuth();
  const[formData,setFormData]=useState({
    identifier:'',
    password:'',
  })

  useEffect(()=>{
     if(isAuthenticated)window.location.href = "/todos";
  },[isAuthenticated]);

  
const updatedFormData = formData.identifier.includes('@')
    ? { email: formData.identifier, password: formData.password }
    : { username: formData.identifier, password: formData.password };

    



 

  const[message,setMessage]= useState('');

  const handlechange = async(e)=>{
    setFormData({...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:8000/api/v1/users/login",{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(updatedFormData)
      })

      const data = await response.json()
      if(response.ok){
        localStorage.setItem('accessToken',data.accessToken)
        setMessage("Login Succesfful! Redirecting......")
        console.log('Server response:',data)
        setTimeout(()=>{navigate('/todos')})
      } else {
        setMessage(data.message||"Login failed")
      }

    }catch(error){
console.error('Error:',error);
        setMessage('Something went wrong. Please try again later.');
    }

  }

  return (
   <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <input type = "text" placeholder="Username" name="identifier" value={formData.identifier} onChange={handlechange}/>
                <input type = "password" placeholder="Password" name="password" value={formData.password} onChange={handlechange} />
                <button type="submit"> Login </button>
            </form>
            <Link to="/">Back to Home</Link>

            {message && <p>{message}</p>}
        </div>

        
  )
}

export default Login;
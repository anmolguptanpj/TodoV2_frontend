import React, { useEffect } from 'react'
import { useState } from 'react'
import  {Link,useNavigate} from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()


  const [formData,setFormData]=useState(
    { 
      firstName:'',
      lastName:'',
      username:'',
      email:'',
      password:''
    }
  );

  const[message,setMessage]=useState('');


  useEffect(()=>{
    const accessToken=localStorage.getItem('accessToken');
    if(accessToken){
      navigate('/todos')
    }
  },[navigate])

  const handlechange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  }


  const handleSubmit=async(e)=>{
      e.preventDefault();

      try{
        const response = await fetch("http://localhost:8000/api/v1/users/register",{
          method:'POST',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify(formData),
          credentials:'include'
        })

        const data = await response.json()
        console.log('Server response',data);

        if(response.ok){
          localStorage.setItem('accessToken',data.accessToken);
          setMessage('Signup Successful! Redirecting...');
          console.log('Server response',data);

          setTimeout(()=>{
            navigate('/todos');
          },1500);
        } else {
          setMessage(data.message || 'Signup failed. Try again.');
        }

      }catch(error){
        console.error('Error:',error);
        setMessage('Something went wrong. Please try again later.');
      }
    };


  return (
    <div>
            <h2>Signup Pages</h2>
            <form onSubmit={handleSubmit} >
                <input type="text" placeholder='First Name' name="firstName" value ={formData.firstName} onChange={handlechange}/>
                <input type="text" placeholder='Last Name' name="lastName" value ={formData.lastName} onChange={handlechange}/>
                <input type="text" placeholder='Username' name="username" value ={formData.username} onChange={handlechange}/>
                <input type="email" placeholder="Email"  name="email" value={formData.email} onChange={handlechange} />
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handlechange}/>
                <button type="submit"> Signup </button>
            </form>

            {message && <p>{message}</p>}
            <Link to = "/">Back to Home</Link>

        </div>
  )
}


export default Signup;
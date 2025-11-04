import React from 'react'
import { useState } from 'react'
import  {Link,useNavigate} from 'react-router-dom'

function signup() {
  const navigate = useNavigate()


  const [formData,setFormData]=useState(
    { 
      username:'',
      name:'',
      email:'',
      password:''
    }
  );

  const[message,setMessage]=useState('');

  const handlechange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });

  }


  const handleSubmit=async(e)=>{
      e.preventDefault();

      try{
        const response = await fetch("",{
          method:'POST',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify(formData)
        })

        if(response.ok){
          const data = await response.json()
          setMessage('Signup Successful! Redirecting...');
          console.log('Server response',data);

          setTimeout(()=>{
            navigate('/todos');
          },1500);
        } else {
          const errorData = await response.json()
          setMessage(errorData.message || 'Signup failed. Try again.');
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
                <input type="text" placeholder='username' name="username" value ={formData.username} onChange={handlechange}/>
                <input type="text" placeholder = "Name"  name="name" value ={formData.name} onChange={handlechange}/>
                <input type="email" placeholder="Email"  name="email" value={formData.email} onChange={handlechange} />
                <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handlechange}/>
                <button type="submit"> Signup </button>
            </form>

            {message && <p>{message}</p>}
            <Link to = "/">Back to Home</Link>

        </div>
  )
}

export default signup
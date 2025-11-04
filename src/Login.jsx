import React, { useEffect,useState } from 'react'
import  {Link,useNavigate} from 'react-router-dom'
function Login() {
  const navigate = useNavigate()

  useEffect(()=>{
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken){
      navigate('/todos')
    }
  },[navigate])


  const[formData,setFormData]=useState({
    identifier:'',
    password:'',
  })

  const[message,setMessage]= useState('');

  const handlechange = async(e)=>{
    setFormData({...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      const response = await fetch("",{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(formData)
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
        </div>
  )
}

export default Login;
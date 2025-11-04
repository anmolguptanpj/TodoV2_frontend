import React from 'react'
import  {Link,useNavigate} from 'react-router-dom'
function login() {
  const navigate = useNavigate()


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

      const data = response.json()
      if(response.okay){
        localStorage.set('token',data.token)
        setMessage("Login Succesfful! Redirecting......")
        console.log('Server response:',data)
      }

    }catch{

    }

  }

  return (
   <div>
            <h2>Login Page</h2>
            <form onChange={submit}>
                <input type = "text" placeholder="Username" name="identifier" value={formData.identifier}/>
                <input type = "password" placeholder="Password" name="password" value={formData.password} />
                <button type="submit"> Login </button>
            </form>
            <Link to="/">Back to Home</Link>
        </div>
  )
}

export default login
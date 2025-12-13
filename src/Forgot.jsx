import React from 'react'
import { useState } from 'react'
import  {Link} from 'react-router-dom'

function forgot() {

  const [step,setStep] = useState(1);
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const[newPassword,setNewPassword]=useState("");
  const [message,setMessage]=useState("");
  const[loading,setLoading] = useState(false);



  //Step 1 
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/forgot-password`,
        {
          method:'POST',
          headers:{'Content-type':'application/json'},
          body:JSON.stringify({email}),

        }
      );

      const data = await res.json()
      if(res.ok){
        setMessage("OTP SENT TO YOUR MAIL")
        setStep(2);

      } else {
        setMessage(data?.message || "Failed to Send OTP");
      }
    } catch (error) {
      setMessage("Something went wrong");
      
    }
    setLoading(false)
  }

  //STEP 2 : VERIFY OTP

  const handleVerifyOtp = async (e) =>{
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/verify-otp`,{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({email,otp})
      });

      const data = await res.json();
      if(res.ok){
        setMessage("OTP VERIFIED SUCCESSFULLY")
        setStep(3);
      }else{
        setMessage(data?.message || "Invalid or expired OTP");
      }
    } catch (error) {
      setMessage("SOmething went wrong")
    }
     setLoading(false)
  }

  //STEP 3: RESET PASSWORD

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/reset-password`,{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify({email,newPassword}),
      })
      const data = await res.json()
      if(res.ok){
        setMessage("Password reset successful! You can now login.")
        setStep(4);
      } else {
        setMessage(data?.message || "Failed to reset Password")
      }
      
    } catch (error) {
      setMessage("Something went wrong");
      
  }
      setLoading(false)
    }
   
  

  return (
    <div>
      <div className=' bg-black text-white w-screen h-screen flex flex-col'>
       <div className='flex h-40 w-full justify-center'> <h2 className='text-4xl p-10'>Forgot Password</h2></div>
        {message && (<div className='flex flex-row justify-center'></div>)}
        <div className='flex justify-center '>{step === 1 && (
          <form onSubmit={handleSendOtp}>
            <input
            className='border-2'
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
            />
            <button className='ml-5 rounded-2xl w-30 text-center bg-green-500'>
              {loading ? "Sending..." : "Send OTP"}
            </button>
        </form>)}</div>

        {step === 2 && (
        <div className='flex h-40 w-full justify-center' >   <form onSubmit={handleVerifyOtp}>
            <input
             type='text'
             className='border-2'
             placeholder='Enter OTP'
             value={otp}
             onChange={(e)=> setOtp(e.target.value)}
             required
             />
             <button className='ml-5 rounded-2xl w-30 text-center bg-yellow-500' >
              {loading ? "Verifying..." : "Verify OTP"}
              </button>
          </form></div>
        )}

        {
          step === 3 &&
           (<div className='flex h-40 w-full justify-center' >
            <form onSubmit={handleResetPassword}>
            <input
             className='border-2'
            type='password'
            placeholder='Enter new password'
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            required
            />
            <button
            className='ml-5 rounded-2xl w-30 text-center bg-blue-500'
            disabled={loading}
            type='submit'>
              {loading ? "Reseting... " : "Reset Password"}
            </button>
          </form>
           </div>)

        }




        {
          step === 4 && (
            <div className='flex h-40 w-full justify-center' >
              <p className='text-3xl font-bold' >
                <Link className='ml-5 pl-2 pr-2 rounded-2xl w-30 text-center bg-orange-500' to="/login">Go to Login </Link>
              </p>
            </div>
          )
        }

        {
          step !==4 && (<p>
            <div className='w-full justify-center  flex mt-10 '>
              <Link className='ml-5 rounded-2xl w-30 text-center bg-rose-500'  to="/">
            Back to Home
            </Link>

            {message && <p>{message}</p>}
            </div>
          </p>)
        }
      </div>
    </div>
  )
}

export default forgot
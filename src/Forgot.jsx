import React from 'react'
import { useState } from 'react'
import  {Link} from 'react-router-dom'

function forgot() {

  const [step,setStep] = useState(1);
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const[newPassword,setNewPassword]=useState("");
  const [message,setMessage]=useState("");
  const[loading,setLoading] = useState("false");



  //Step 1 
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("",
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
      const res = await fetch("",{
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify("email,otp")
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
  }

  //STEP 3: RESET PASSWORD

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(true);
    setMessage("");
    try {
      const res = await fetch(" ",{
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
      <div>
        <h2>Forgot Password</h2>
        {message && (<p>{message}</p>)}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <input
            type="email"
            placeholder='Enter your email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
            />
            <button>
              {loading ? "Sending..." : "Send OTP"}
            </button>
        </form>)}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <input
             type='text'
             placeholder='Enter OTP'
             value={otp}
             onChange={(e)=> setOtp(e.target.value)}
             required
             />
             <button>
              {loading ? "Verifying..." : "Verify OTP"}
              </button>
          </form>
        )}

        {
          step === 3 &&
           (<form onSubmit={handleResetPassword}>
            <input
            type='password'
            placeholder='Enter new password'
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            required
            />
            <button
            disabled={loading}
            type='submit'>
              {loading ? "Reseting... " : "Reset Password"}
            </button>
          </form>)
        }




        {
          step === 4 && (
            <div>
              <p>
                <Link to="/login">Go to Login </Link>
              </p>
            </div>
          )
        }

        {
          step !==4 && (<p>
            <Link to="/">
            Back to Home
            </Link>
          </p>)
        }
      </div>
    </div>
  )
}

export default forgot
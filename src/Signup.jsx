import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext.jsx";

function Signup() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [show ,setShow] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok && data.data?.accessToken) {
  setMessage("✅ Signup successful! Redirecting...");
  signup(data.data.accessToken);
  setTimeout(() => navigate("/todos"), 1000);
} else {
  setMessage(data.message || "❌ Signup failed. Try again.");
}
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="w-screen bg-black text-white h-screen flex flex-col"  >
     <div className ="w-full text-2xl font-bold h-20 flex justify-center p-25"> <h2>Create an Account</h2></div>
     <div className="w-full  flex justify-center">
       <form
       className="flex flex-col gap-6 border-2 p-20 rounded-2xl shadow-gray-500"
        onSubmit={handleSubmit}
      >
     <div>
         <input
         className="bg-white text-black border-2 border-black"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
     </div>
      <div>
          <input
          className="bg-white  text-black border-2 border-black"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="w-full  flex-col justify-center items-center" > 
         <input
         className="bg-white  text-black border-2 border-black"
          type={"text"}
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      
        </div>
       <div>
         <input
         className="bg-white  text-black border-2 border-black"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
       </div>
        <div className="flex  flex-col gap-2">
          <input
          className="bg-white  text-black border-2 border-black"
          type={show ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
         <div className="flex gap-3"> <label htmlFor="show">Show password</label>< input type="checkbox" value={show} onClick={()=>setShow(prev=> !prev)} /></div>
         <div>{message && <p >{message}</p>}</div>
        </div>

        <button className="bg-green-500" type="submit">Signup</button>
      </form>
     </div>

     

      <nav  className="flex w-full  justify-center gap-5 p-10"  >
        <div className=" hover:bg-[#3D518C] w-25 text-center rounded-xl bg-rose-700 pt-1 pl-3 pr-3 pb-1 border-0">
          <Link to="/">Home</Link>
          </div> 

          <div className=" hover:bg-[#3D518C] w-25 text-center rounded-xl bg-rose-700 pt-1 pl-3 pr-3 pb-1 border-0" >
            <Link to="/login">Login</Link>
          </div>
      </nav>
    </div>
  );
}

export default Signup;

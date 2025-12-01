import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext.jsx";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated, navigate]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit (with backend structure awareness)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert identifier into username/email
    const updatedFormData = formData.identifier.includes("@")
      ? { email: formData.identifier, password: formData.password }
      : { username: formData.identifier, password: formData.password };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Important if using cookies
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
      console.log("Login response:", data);

      // ✅ Match your backend structure -> data.data.accessToken
      if (response.ok && data?.data?.accessToken) {
        setMessage("✅ Login Successful! Redirecting...");
        login(data.data.accessToken); // Store token in context

        // Redirect to /todos
        setTimeout(() => navigate("/todos"), 1000);
      } else {
        setMessage(data?.message || "❌ Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="w-screen bg-[#7F0799] text-white h-screen flex flex-col">
     <div className="w-full text-2xl font-bold h-20 flex justify-center p-25"> <h2 >Login to Your Account</h2></div>

    <div className="w-full  flex justify-center"> 
       <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 border-2 p-20 rounded-2xl shadow-gray-500"
      >
      <div className="flex flex-col">
          <label>Enter username or email</label>
        <input
          className="bg-white border-2 border-black"
          type="text"
          placeholder="Username or Email"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          required
        />
      </div>

       <div className="flex flex-col">
        <label>Enter Password</label>
         <input
          type="password"
          className="bg-white border-2 border-black"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
       </div>

        <button className="bg-green-500" type="submit">Login</button>
      </form>

      {message && <p >{message}</p>}</div>

     <div className="flex w-full  justify-center p-10"> <nav className=" flex " >
       <div className=" hover:bg-[#3D518C] w-25 text-center rounded-xl bg-rose-700 pt-1 pl-3 pr-3 pb-1 border-0"> <Link to="/">Home</Link></div> 
        <div className=" hover:bg-[#3D518C] w-25 text-center rounded-xl bg-rose-700 pt-1 pl-3 pr-3 pb-1 border-0" ><Link to="/signup">Signup</Link> </div>
        <div className=" hover:bg-[#3D518C] w-40 text-center rounded-xl bg-rose-700 pt-1 pl-3 pr-3 pb-1 border-0" ><Link to="/forgot">Forgot Password</Link></div>
      </nav></div>
    </div>
  );
}

export default Login;

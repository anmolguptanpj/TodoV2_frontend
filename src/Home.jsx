import React, { useEffect } from "react";
import { useAuth } from "./Context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-[#edd5f3] w-screen h-screen">
      <div className="h-100 flex flex-col justify-center items-center">
      <h1 className=" underline text-7xl pt-20">Todo App</h1>
      <h2 className="text-4xl pt-5 ">Developed by Anmol Gupta</h2>
      </div>

      <nav className="flex justify-center gap-6"
      >
        <Link  className=" w-20 rounded-2xl hover:bg-[#3D518C] text-center bg-blue-500" to="/login">Login</Link>
        <Link className=" w-20 rounded-2xl hover:bg-[#3D518C] text-center bg-green-500" to="/signup">Signup</Link>
        <Link  className=" w-40 rounded-2xl hover:bg-[#3D518C] text-center bg-red-500" to="/forgot">Forgot Password</Link>
      </nav>
    </div>
  );
}

export default Home;

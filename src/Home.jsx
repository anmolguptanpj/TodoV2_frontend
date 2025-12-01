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
    <div>
      <h1>Todo App</h1>
      <h2>Developed by Anmol Gupta</h2>

      <nav
      >
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/forgot">Forgot Password</Link>
      </nav>
    </div>
  );
}

export default Home;

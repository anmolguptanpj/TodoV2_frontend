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
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Todo App</h1>
      <h2>Developed by Anmol Gupta</h2>

      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/forgot">Forgot Password</Link>
      </nav>
    </div>
  );
}

export default Home;

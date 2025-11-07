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
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
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
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login to Your Account</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "300px",
          margin: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Username or Email"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}

      <nav style={{ marginTop: "20px" }}>
        <Link to="/">Home</Link> | <Link to="/signup">Signup</Link> |{" "}
        <Link to="/forgot">Forgot Password</Link>
      </nav>
    </div>
  );
}

export default Login;

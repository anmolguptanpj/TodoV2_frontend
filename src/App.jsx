import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Context/AuthContext.jsx";
import Home from "./Home.jsx";
import Forgot from "./Forgot.jsx";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Todo from "./Todo.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Restrict logged-in users from accessing Login/Signup/Home
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/todos" replace /> : children;

  
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* 🏠 Public routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot"
            element={
              <PublicRoute>
                <Forgot />
              </PublicRoute>
            }
          />

          {/* ✅ Protected route */}
          <Route
            path="/todos"
            element={
              <PrivateRoute>
                <Todo />
              </PrivateRoute>
            }
          />

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

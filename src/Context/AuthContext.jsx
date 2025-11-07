import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const isAuthenticated = !!accessToken;

  // Keep token in localStorage
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  // Login handler
  const login = (token) => {
    setAccessToken(token);
    navigate("/todos");
  };

  // Signup handler
  const signup = (token) => {
    setAccessToken(token);
    navigate("/todos");
  };

  // Logout handler
  const logout = () => {
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isAuthenticated, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

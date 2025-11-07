import { createContext,useState,useEffect, children, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({Children}) =>{
    const  navigate = useNavigate();
    const[accessToken,setAccessToken] = useState(localStorage.getItem('accessToken') || null);
    const isAuthenticated = !!accessToken;

    useEffect(()=>{
        if(accessToken){
            localStorage.setItem('accessToken',accessToken);
        } else {
            localStorage.removeItem('accessToken');
        }
    },[accessToken]);

    const login = (token) =>{
        setAccessToken(token);
        navigate('/todos');
    };

    const signup = (token) =>{
        setAccessToken(token);
        navigate("/todos");
    };

    const logout = () => {
        setAccessToken(null);
        navigate('/login')
    };

    return(
        <AuthContext.Provider value = {{accessToken, isAuthenticated,signup, login,logout}}>
            {children}
        </AuthContext.Provider>
    );


};

export const useAuth = () =>useContext(AuthContext);


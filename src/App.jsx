import React from 'react'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import { AuthProvider } from './Context/AuthContext.js';
import Home from './Home.jsx';
import Forgot from './Forgot.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Todo from './Todo.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';


function App() {
  return (
       <Router>
           <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/forgot" element={<Forgot/>}/>
                    <Route path="/todos" element={<PrivateRoute><Todo/></PrivateRoute>}/>
                </Routes>
           </AuthProvider>
        </Router>
  )
}

export default App
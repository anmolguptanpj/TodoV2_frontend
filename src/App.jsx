import React from 'react'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from './Home.jsx';
import Forgot from './Forgot.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';



function App() {
  return (
       <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/forgot" element={<Forgot/>}/>
            </Routes>
        </Router>
  )
}

export default App
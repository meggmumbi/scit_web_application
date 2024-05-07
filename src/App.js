import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignUp from './modules/signup/SignUp';
import SignIn from './modules/SignIn/SignIn';
import LandingPage from './modules/landingPage/LandingPage';
import Dashboard from './modules/dashboard/Dashboard';
import Programmes from './modules/Programmes/Pricing';


function App() {
  return (
    <Router>
      
     <div className="App">
   
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />   
            <Route path="/pricing" element={<Programmes />} />        
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />

          </Routes>
        
    </div> 
  </Router>
  );
}

export default App;

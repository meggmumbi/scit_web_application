import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignUp from './modules/signup/SignUp';
import SignIn from './modules/SignIn/SignIn';
import LandingPage from './modules/landingPage/LandingPage';
import Dashboard from './modules/dashboard/Dashboard';
import Layout from './common/layout/Layout';
import Programmes from './modules/Programmes/Programme';
import NewProgramme from './modules/Programmes/NewProgramme';

function App() {
  return (

    <Router>
      <Routes>
        <Route
          path="/scit/*"
          element={
            <Layout>
              <Routes>             
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="programmes" element={<Programmes />} /> 
              <Route path="newProgramme" element={<NewProgramme />} />   
              </Routes>          
            </Layout>
          }
        />
        <Route exact path="/" element={<LandingPage />} />
         <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </Router>

  );
}

export default App;

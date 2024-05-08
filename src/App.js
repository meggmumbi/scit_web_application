import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SignUp from './modules/signup/SignUp';
import SignIn from './modules/SignIn/SignIn';
import LandingPage from './modules/landingPage/LandingPage';
import Dashboard from './modules/dashboard/Dashboard';
import Layout from './common/layout/Layout';
import Programmes from './modules/Programmes/Programme';
import NewProgramme from './modules/Programmes/NewProgramme'
import Department from './modules/Departments/Department';
import NewDepartment from './modules/Departments/NewDepartment';
import Staff from './modules/Staff/Staff';
import NewStaff from './modules/Staff/NewStaff';
import Activities from './modules/activities/Activities';
import NewActivity from './modules/activities/NewActivity';
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
              <Route path="department" element={<Department />} /> 
              <Route path="newDepartment" element={<NewDepartment />} />  
              <Route path="staff" element={<Staff />} /> 
              <Route path="newStaff" element={<NewStaff />} />  
              <Route path="activities" element={<Activities />} /> 
              <Route path="newActivity" element={<NewActivity />} />   
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

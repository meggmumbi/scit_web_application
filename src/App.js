import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import './App.css';
import SignUp from './modules/signup/SignUp';
import SignIn from './modules/SignIn/SignIn';
import ApplyNowPage from './modules/landingPage/components/Applynow';
import StaffListPage from './modules/landingPage/components/stafflist';
import AcademicListPage from './modules/landingPage/components/academicList';
import ProgrammeListPage from './modules/landingPage/components/programmesList';
import AboutUsPage from './modules/landingPage/components/About';
import ReadMorePage from './modules/landingPage/components/readMore';
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
import Applications from './modules/Applications/Applications';
import NewApplication from './modules/Applications/NewApplication';
import { getFromLocalStorage, removeItem } from './common/utils/LocalStorage';

const IDLE_TIME_LIMIT = 5 * 60 * 1000;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let idleTimer = null;

    // Function to handle idle state
    const onIdle = () => {
      console.log('User is idle. Redirecting to sign-in page.');
      removeItem("user");
      navigate('/sign-in');
    };

    // Reset the timer when user interacts with the app
    const resetTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(onIdle, IDLE_TIME_LIMIT);
    };

    // Event listeners for user actions
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('touchstart', resetTimer);

    // Set the initial timer
    idleTimer = setTimeout(onIdle, IDLE_TIME_LIMIT);

    // Cleanup function to remove event listeners
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('touchstart', resetTimer);
    };
  }, [navigate]);

  const account = getFromLocalStorage('user');
  
  if (!account) {
   
    return <Navigate to="/sign-in" replace />;
  }
  
  return children;
};

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/scit/*"
          element={
            <ProtectedRoute>
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
                  <Route path="applications" element={<Applications />} />
                  <Route path="newApplication" element={<NewApplication />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="staffList" element={<StaffListPage />} />
        <Route path="academicList" element={<AcademicListPage />} />
        <Route path="programmes" element={<ProgrammeListPage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="apply-now" element={<ApplyNowPage />} />
        <Route path="read-more/:postId" element={<ReadMorePage />} />
      </Routes>
    </Router>
  );
}


export default App;

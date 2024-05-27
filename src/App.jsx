import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from './components/home/Home';
import Footer from './components/footer/Footer';
import JobSeekerLogin from './components/login/JobSeekerLogin';
import EmployerLogin from './components/login/EmployerLogin';
import JobSeekerRegister from './components/register/JobSeekerRegsiter';
import EmployerRegister from './components/register/EmployerRegister';
import EmployerDashboard from './components/dashboard/EmployerDashboard';
import { auth } from './firebase/firebaseConfig';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-Jobseeker" element={<JobSeekerLogin />} />
          <Route path="/login-Employer" element={<EmployerLogin />} />
          <Route path="/register-Jobseeker" element={<JobSeekerRegister />} />
          <Route path="/register-Employer" element={<EmployerRegister />} />
          <Route
            path="/dashboard-Employer"
            element={isAuthenticated ? <EmployerDashboard /> : <Navigate to="/login-Employer" />}
          />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unmatched routes to home */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

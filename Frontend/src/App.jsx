import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Staff from './pages/Staff';
import Private from './components/Private';
import Dashboard from './AdminPage/Dashboard';
import ManagementForm from './AdminPage/ManagementForm';
import FacultyForm from './AdminPage/FacultyForm';
import StudentForm from './AdminPage/StudentForm';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import Header from './components/Header';
import AdminProtectedRoutes from './OtherComponents/AdminProtectedRoutes.jsx';
import CourseForm from './AdminPage/CourseForm.jsx';
import StudentDetail from './AdminPage/StudentDetail.jsx';
import CourseDetail from './AdminPage/CourseDetail.jsx';
import Profile from './pages/Profile.jsx';
import Errorpage from './pages/Errorpage.jsx';
import { useLogin } from './context/LoginContext.jsx';

function App() {
  const location = useLocation();
  const isOnAdminPage = location.pathname.startsWith('/admin');
  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar visibility
  const { isLoggedIn, handleLogout } = useLogin();

  const ref = useRef()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      handleLogout();
    }
  }, []);


  const clickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      toggleSidebar()
    }
  }

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener('mousedown', clickOutside);
    } else {
      document.removeEventListener('mousedown', clickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);


  return (
    <div style={{ display: 'flex' }} className='items-start overflow-x-clip'>
      <div style={{ flex: '0' }} className="sticky top-0" ref={ref}>
        {isOnAdminPage &&
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} />
        }
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className='z-0 relative'>
        {isOnAdminPage ? <NavBar toggleSidebar={toggleSidebar} /> : <Header />}

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/sign-in' element={isLoggedIn ? <Navigate to="/" /> : <SignIn />}></Route>

            <Route path='*' element={<Errorpage />}></Route>
            <Route path='/about' element={<About />}></Route>

            <Route element={<Private />}>
              <Route path='/profile' element={<Profile />}></Route>
              <Route path='/staff' element={<Staff />}></Route>
            </Route>

            <Route element={<AdminProtectedRoutes />}>
              <Route path='/admin/*'>
                <Route index element={<Dashboard />} /> {/* Default admin page */}
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='studentform' element={<StudentForm />} />
                <Route path='managementform' element={<ManagementForm />} />
                <Route path='facultyform' element={<FacultyForm />} />
                <Route path='courseform' element={<CourseForm />} />

                <Route path='students' element={<StudentDetail />} />
                <Route path='courses' element={<CourseDetail />} />
              </Route>
            </Route>

          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
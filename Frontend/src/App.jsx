import React, { useState } from 'react'
import Headers from './components/Header'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import Staff from './pages/Staff'
import Private from './components/Private'
import Dashboard from './AdminPage/Dashboard'
import ManagementForm from './AdminPage/ManagementForm'
import FacultyForm from './AdminPage/FacultyForm'
import StudentForm from './AdminPage/StudentForm'
import Sidebar from './components/Sidebar'
import NavBar from './components/NavBar'
import Header from './components/Header'
import AdminProtectedRoutes from './OtherComponents/AdminProtectedRoutes.jsx'
import CourseForm from './AdminPage/CourseForm.jsx'
import StudentDetail from './AdminPage/StudentDetail.jsx'
import CourseDetail from './AdminPage/CourseDetail.jsx'

function App() {

  const location = useLocation();
  const isOnAdminPage = location.pathname.startsWith('/admin');
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control sidebar visibility

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div style={{ display: 'flex' }} className='items-start'>
      <div style={{ flex: '0 0 auto' }} className='sticky top-0'>
        {isOnAdminPage &&
          <Sidebar sidebarOpen={sidebarOpen} />
        }
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }} className='z-0 relative'>
        {isOnAdminPage ? <NavBar toggleSidebar={toggleSidebar} /> : <Header />}

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/sign-in' element={<SignIn />}></Route>

            <Route element={<Private />}>
              <Route path='/staff' element={<Staff />}></Route>
              <Route path='/about' element={<About />}></Route>
            </Route>

            <Route element={<AdminProtectedRoutes />}>
            </Route>

            <Route path='/admin/*'>
              {/* Set the base path for admin routes */}
              <Route index element={<Dashboard />} /> {/* Default admin page */}
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='studentform' element={<StudentForm />} />
              <Route path='managementform' element={<ManagementForm />} />
              <Route path='facultyform' element={<FacultyForm />} />
              <Route path='courseform' element={<CourseForm />} />

              <Route path='students' element={<StudentDetail />} />
              <Route path='courses' element={<CourseDetail/>} />
            </Route>

          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext';


function handle419Error(navigate, handleLogout) {

    const token = localStorage.getItem('token'); // Get the token from local storage

    localStorage.removeItem('token');
    handleLogout();
    console.log("done")
    navigate('/');
}

export default handle419Error



import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../context/LoginContext';
import { Signout } from '../redux/slices/userSlice';


function handle419Error(navigate, handleLogout) {

    const token = localStorage.getItem('token'); // Get the token from local storage

    localStorage.removeItem('token');
    handleLogout();
    dispatch(Signout())
    navigate('/');
}

export default handle419Error



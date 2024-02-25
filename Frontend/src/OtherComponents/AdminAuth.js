import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function AdminAuth() {
    const token = localStorage.getItem('token');

    const decodedToken = token && JSON.parse(atob(token.split('.')[1]));

    const isAdmin = decodedToken && decodedToken?.Role === 'management';

    if (!isAdmin) {
        return false;
    }
    else {
        return true;
        
    }

}

export default AdminAuth
import React from 'react'

function CommonAuth() {

    const token = localStorage.getItem('token');

    const decodedToken = token && JSON.parse(atob(token.split('.')[1]));

    const isAuth = decodedToken && (decodedToken.Role === 'management' || decodedToken.Role === 'student' || decodedToken.Role === 'faculty');


    if (!isAuth) {
        return false;
    }
    else {
        return true;
    }

}

export default CommonAuth
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminAuth from '../OtherComponents/AdminAuth'
import CommonAuth from '../OtherComponents/CommonAuth'

function    Private() {
    const Auth = CommonAuth()

    return Auth ? <Outlet/> : <Navigate to="/sign-in"/>
}

export default Private
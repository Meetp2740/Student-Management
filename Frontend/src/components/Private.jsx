import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AdminAuth from '../OtherComponents/AdminAuth'

function Private() {
    const { currentUser } = useSelector((state) => state.user)
    const Auth = AdminAuth()

    return Auth ? <Outlet/> : <Navigate to="/sign-in"/>
}

export default Private
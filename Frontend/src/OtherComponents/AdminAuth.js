import React from 'react'
import { useSelector } from 'react-redux'

function AdminAuth() {
    const { currentUser } = useSelector((state) => state.user)

    return currentUser?.data?.user?.Role === "management" ? true : false 

}

export default AdminAuth
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Signout } from '../redux/slices/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

function Profile() {

  const [FormData, setFormData] = useState({});
  const [updateSucess, setUpdateSuccess] = useState(false);
  const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleLogin, handleLogout } = useLogin()

  const changeHandler = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value })
  };


  const signOutHandler = async () => {
    try {
      const res = await fetch('/api/v1/user/signout');
      handleLogout()
      dispatch(Signout())
      // dispatch(Signout())
      localStorage.removeItem('token');
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='my-7 text-3xl font-semibold text-center'>Profile</h1>
      <form className='flex flex-col'>
        <img src="src\images\profile.webp" className='rounded-full cursor-pointer h-24 w-24 object-cover self-center'></img>
        <input defaultValue={currentUser?.user.FirstName + " " + currentUser?.user.LastName} type='text' placeholder='Username' id='username' className='mt-3 p-3 bg-slate-100 rounded-lg'></input>
        <input defaultValue={currentUser?.user.Email} type='email' placeholder='Email' id='email' className='mt-3 p-3 bg-slate-100 rounded-lg'></input>
        <input defaultValue={currentUser?.user.ContactNumber} type='number' placeholder='Contact Number' id='password' className='mt-3 p-3 bg-slate-100 rounded-lg'></input>
        <div className='flex justify-between mt-5'>
          <span className='text-red-600 cursor-pointer font-semibold' onClick={signOutHandler}>Sign out</span>
        </div>
      </form>
      <div>
        {/* <p className='font-semibold text-red-600 mt-4'>{error ? "Username or email already taken" || "Try again" : ""}</p> */}
        <p className='font-semibold text-green-600 mt-4'>{updateSucess && 'user is updated sucessfully!'}</p>
      </div>
    </div>
  )
}

export default Profile
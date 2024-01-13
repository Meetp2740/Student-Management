import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SignInStart, SignInSuccess, SignInFail, resetUserState } from '../redux/slices/userSlice'


function SignIn() {

    const { loading, error, currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [Form, setForm] = useState({
        Email: "",
        Password: "",
    })

    const formHandler = async (e) => {
        setForm({ ...Form, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        return () => {
            dispatch(resetUserState());
        };
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            dispatch(SignInStart())
            const res = await fetch('api/v1/user/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Form)
            })
            const data = await res.json()
            if (data.success == false) {
                dispatch(SignInFail(data.message))
            } else {
                dispatch(SignInSuccess(data))
                navigate("/")
            }
        }
        catch (error) {
            dispatch(SignInFail("Server Error, Please Try Again"))
        }
    }

    console.log(currentUser)

    return (
        <div className='max-w-lg mx-auto p-3'>
            <h1 className='font-semibold text-3xl text-center my-7'>Sign In</h1>
            <form className='flex flex-col gap-4' onSubmit={submitHandler}>
                <input type='email' placeholder='email' id='Email' className='p-3 bg-slate-100 rounded-lg' onChange={formHandler}></input>
                <input type='password' placeholder='password' id='Password' className='p-3 bg-slate-100 rounded-lg' onChange={formHandler}></input>
                <button disabled={loading} className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-50'>{loading ? "Loading..." : "Sign-In"}</button>
                <div className='flex gap-3'>
                    <p className='font-semibold'>Dont Have an account?</p>
                    <Link to={"/sign-up"}>
                        <span className='text-blue-600 font-semibold'>Sign up</span>
                    </Link>
                </div>
            </form>
            <p className='text-red-900 my-5 font-semibold'>{error ? error || "Something went wrong" : " "}</p>
        </div>
    )
}

export default SignIn
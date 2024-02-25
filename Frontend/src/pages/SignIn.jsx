import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { SignInStart, SignInSuccess, SignInFail, resetUserState } from '../redux/slices/userSlice'
import { useMutation } from '@tanstack/react-query'


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

    const { mutate: login, isLoading, error: loginError, isSuccess, isError, data: loginData } = useMutation({
        mutationFn: (e) => {
            e.preventDefault();
            return fetch('api/v1/user/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Form) // Assuming `Form` is your form data object
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success === false) {
                        console.log(data.message)
                        throw new Error(data.message);
                    } else {
                        const accessToken = data?.data?.accessToken;
                        if (accessToken) {
                            localStorage.setItem('token', accessToken);
                            dispatch(SignInSuccess(data));
                            // navigate("/");
                        } else {
                            dispatch(SignInFail("Invalid username or password"));
                        }
                    }
                })
                .catch(error => {
                    console.error(error);
                    dispatch(SignInFail("Server Error, Please Try Again"));
                });
        }
    })
    


    return (
        <div className='max-w-lg mx-auto p-3'>
            <h1 className='font-semibold text-3xl text-center my-7'>Sign In</h1>
            <form className='flex flex-col gap-4'>
                <input type='email' placeholder='email' id='Email' className='p-3 bg-slate-100 rounded-lg' onChange={formHandler}></input>
                <input type='password' placeholder='password' id='Password' className='p-3 bg-slate-100 rounded-lg' onChange={formHandler}></input>
                <button disabled={loading} className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-50'>{isLoading ? "Loading..." : "Sign-In"}</button>
                <div className='flex gap-3'>
                    <p className='font-semibold'>Dont Have an account?</p>
                </div>
            </form>
            <p className='text-red-900 my-5 font-semibold'>{error ? error || "Something went wrong" : " "}</p>
        </div>
    )
}

export default SignIn
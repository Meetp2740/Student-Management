import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SignInSuccess, SignInFail, resetUserState } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useLogin } from '../context/LoginContext';

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleLogin } = useLogin();

    const [form, setForm] = useState({
        Email: '',
        Password: '',
    });

    const formHandler = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSignIn = async () => {
        const response = await fetch('api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await response.json();

        if (!response.ok) {
            const error = new Error('Error occured while fetching notes!');
            error.code = response.status;
            error.message = error.code === 404 ? 'Something went wrong!' : data.message
            throw error;
        }

        if (data.success === false) {
            throw new Error(data.message);
        } else {
            const accessToken = data?.data?.accessToken;
            if (accessToken) {
                localStorage.setItem('token', accessToken);
            } else {
                throw new Error('Something went wronge');
            }
        }
        console.log(data)
        return data.data
    };

    const { mutate: signInMutation, isLoading, isError, isSuccess, data: loginData, error: loginError, reset: resetLoginState, status: loginStatus } = useMutation({
        mutationKey: ['login'],
        mutationFn: handleSignIn,
        onSuccess: (data) => {
            navigate('/');
            handleLogin();
            dispatch(SignInSuccess(data));
        },
        onError: (error) => {
            {
                error.code === 404 ?
                    error.message = "Server Error Occured while Signing In. Please try again later"
                    : error.message
            }
        }
    })
    
    const handleSubmit = (e) => {
        e.preventDefault();
        signInMutation()
    };

    return (
        <div className="max-w-lg mx-auto p-3">
            <h1 className="font-semibold text-3xl text-center my-7">Sign In</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" id="Email" className="p-3 bg-slate-100 rounded-lg" onChange={formHandler} />
                <input type="password" placeholder="Password" id="Password" className="p-3 bg-slate-100 rounded-lg" onChange={formHandler} />
                <button className="bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-80">
                    {isLoading ? 'Loading...' : 'SIGN IN'}
                </button>
                <div className="flex gap-3">
                    <p className="font-semibold">Don't have an account?</p>
                </div>
            </form>
            <p className="text-red-900 my-5 font-semibold">{isError ? loginError.message || 'Something went wrong' : ''}</p>
        </div>
    );
}

export default SignIn;

import React, { useState, useContext } from 'react'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import UserContext from '../context/UserContext/UserContext';
import eye from "../assets/eye.jpg"
import closeEye from "../assets/closeEye.png"
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


export const Auth = () => {

    const url = 'http://localhost:5000/user';

    const navigate = useNavigate();

    const { setUser } = useContext(UserContext)
    const [error, setError] = useState("")
    const [isLogIn, setIsLogIn] = useState(false)
    const [showPassord, setShowPassord] = useState(false)
    const [formData, setFormData] = useState(initialState)

    // const [firstName, setFirstName] = useState("")
    // consts [lastName, setLastName] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")

    const viewLogin = (status) => {
        setError(null);
        setIsLogIn(status);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        if (!isLogIn && formData.password !== formData.confirmPassword) {
            setError('Make Sure Passwords Match')
            return 0
        }
        if (formData.email.length == 0) {
            setError('Make sure email colloum is Filled')
            return 0
        }

        try {
            const { data } = await axios.post(`${url}/${!isLogIn ? "signup" : "signin"}`, formData)

            if (isLogIn) {
                localStorage.setItem('profile', JSON.stringify(data.result))

                setUser(true)
            }
            else {
                alert("You have succesfully signed up you can now Login")
                setIsLogIn(true);
            }
            if (data.message) {
                setError(message)
            }
        } catch (error) {
            console.log(error.response.data.message);
            // alert(error.message)
            setError(error.response.data.message)
        }


        setFormData(initialState)
        // localStorage.setItem('profile' , JSON.stringify(decoded))
    }

    const handleChange = (e) => {
        console.log( e.target.value)
        setFormData(
            {
                ...formData,
                [e.target.name]: e.target.value
            }
        
        )
        console.log(formData)
    }

    const showUserInformation = (response) => {
        const token = response?.credential
        const decoded = jwtDecode(token);
        console.log(decoded);
        console.log(token);
        localStorage.setItem('profile', JSON.stringify(decoded))
        setUser((prev) => !prev)
        // window.location.reload(false);
        // localStorage.clear()
    }

    const handleShowPassword = (e) => {
        e.preventDefault()
        setShowPassord((prev) => !prev)
    }


    return (
        <div className='w-1/3 max-md:w-3/4 m-auto pt-4  '>
            <form onSubmit={handleSubmit} >
                <h2 className='text-blue-600 text-4xl font-bold py-2 '>{isLogIn ? "LogIn" : "SignUp"}</h2>

                <div className='flex flex-col gap-4 border-4 mt-5 pt-20 border-blue-600 p-5 rounded-lg my-'>

                    {!isLogIn && (
                        <div className='flex flex-row gap-1'>
                            <input value={formData.firstName} onChange={handleChange} name='firstName' className='  border-gray-400 p-3 w-full border-2' type='text' placeholder='First Name'></input>
                            <input value={formData.lastName} onChange={handleChange} name='lastName' className='  border-gray-400 p-3 w-full border-2' type='text' placeholder='Last Name'></input>
                        </div>
                    )}

                    <input value={formData.email} onChange={handleChange} name='email' className='  border-gray-400 p-3 w-full border-2' type='text' placeholder='Email'></input>
                    <div className='relative '>
                        <input value={formData.password} onChange={handleChange} name='password' className='border-gray-400 p-3 w-full border-2' type={showPassord ? 'text' : 'password'} placeholder='Password'></input>
                        <button onClick={handleShowPassword}> <img className='absolute w-10 right-1 top-2' src={!showPassord ? eye : closeEye}  />    </button>
                    </div>
                    {!isLogIn && <input value={formData.confirmPassword} onChange={handleChange} name='confirmPassword' className='border-gray-400 p-3 w-full border-2' type='password' placeholder='ConfirmPassword'></input>}

                    {/* <button type='submit' onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} className='mt-10 py-2 bg-blue-600 h-12 text-white w-full rounded-md'  >{isLogIn ? "LogIn" : "SignUp"}</button> */}
                    <button type='submit' className='mt-10 py-2 bg-blue-600 h-12 text-white w-full rounded-md'  >{isLogIn ? "LogIn" : "SignUp"}</button>


                    <GoogleLogin
                        onSuccess={showUserInformation}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    // useOneTap
                    />

                    {isLogIn && <p className='mb-5 font-bold text-sm text-center text-gray-500 '>Don't Have an Account ? <button className='text-blue-600' onClick={() => viewLogin(false)}>Sign up </button></p>}

                    {!isLogIn && <p className='mb-5 font-bold text-sm text-center text-gray-500 '>Already Have an Account ? <button className='text-blue-600' onClick={() => viewLogin(true)}>LogIn </button></p>}


                    {error && <p className='text-center text-red-400'>{error}</p>}
                </div>
            </form>
        </div>

    )
}

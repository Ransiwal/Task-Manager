import React, { useState , useContext } from 'react'
import { GoogleLogin , useGoogleLogin} from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"

import UserContext from '../context/UserContext/UserContext';

const initialState = {
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    confirmPassword : ''
}


export const Auth = () => {
    const navigate = useNavigate();

    const {setUser} = useContext(UserContext)
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


    const handleSubmit = (e, endpoint) => {
        e.preventDefault();
        console.log(formData)
        // if (!isLogIn && password !== confirmPassword) {
        //     setError('Make Sure Passwords Match')
        // }
    }

    const handleChange = (e) => {
        setFormData(
            {...formData,
            [e.target.name] : e.target.value}
        )
    }

    const showUserInformation = (response) =>{
        const token = response?.credential
        const decoded = jwtDecode(token);
        console.log(decoded);
        console.log(token);
        localStorage.setItem('profile' , JSON.stringify(decoded))
        setUser((prev) => !prev)
        // window.location.reload(false);
        // localStorage.clear()
    }

    const login = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse),
        flow: 'auth-code',
      });

    return (
        <div className='w-1/3 max-md:w-3/4 m-auto pt-4  '>
            <form onSubmit={handleSubmit} >
                <h2 className='text-blue-600 text-4xl font-bold py-2 '>{isLogIn ? "LogIn" : "SignUp"}</h2>

                <div className='flex flex-col gap-4 border-4 mt-5 pt-20 border-blue-600 p-5 rounded-lg my-'>

                    {!isLogIn && (
                        <div className='flex flex-row gap-1'>
                            <input onChange={handleChange}  name='firstName'  className='  border-gray-400 p-3 w-full border-2' type='text' placeholder='First Name'></input>
                            <input onChange={handleChange}  name='lastName' className='  border-gray-400 p-3 w-full border-2' type='text' placeholder='Last Name'></input>
                        </div>
                    )}

                    <input onChange={handleChange}  name='email'  className='  border-gray-400 p-3 w-full border-2' type='text' placeholder='Email'></input>
                    <input onChange={handleChange}  name='password'  className='border-gray-400 p-3 w-full border-2' type='password' placeholder='Password'></input>

                    {!isLogIn && <input onChange={handleChange}  name='confirmPassword'  className='border-gray-400 p-3 w-full border-2' type={showPassord ? 'text' : 'password'} placeholder='ConfirmPassword'></input>}

                    {/* <button type='submit' onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} className='mt-10 py-2 bg-blue-600 h-12 text-white w-full rounded-md'  >{isLogIn ? "LogIn" : "SignUp"}</button> */}
                    <button type='submit'  className='mt-10 py-2 bg-blue-600 h-12 text-white w-full rounded-md'  >{isLogIn ? "LogIn" : "SignUp"}</button>


                    <GoogleLogin
        onSuccess={showUserInformation}
        onError={() => {
            console.log('Login Failed');
        }}
        // useOneTap
        />

        

                    {/* <GoogleLogin
                    
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                /> */}

{/* <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/> */}

                    {/* <button className='w-full bg-blue-600 text-white h-12 rounded-md' onClick={() => login()}>Sign in with Google</button>; */}

                    {isLogIn && <p className='mb-5 font-bold text-sm text-center text-gray-500 '>Don't Have an Account ? <button className='text-blue-600' onClick={() => viewLogin(false)}>Sign up </button></p>}

                    {!isLogIn && <p className='mb-5 font-bold text-sm text-center text-gray-500 '>Already Have an Account ? <button className='text-blue-600' onClick={() => viewLogin(true)}>LogIn </button></p>}


                    {error && <p className='text-center text-red-400'>{error}</p>}
                </div>
            </form>
        </div>

    )
}

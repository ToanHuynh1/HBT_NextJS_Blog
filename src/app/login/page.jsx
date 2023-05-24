'use client'

import React, { useState } from 'react'
import classess from './login.module.css'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    if (password == '' || email == ''){
        toast.error('Fill error')
    }

    if(password.length < 6)
    {
        toast.error('Password must 6 characters')
    }

    try {
        const res = await signIn('credentials', {email,password, redirect: false})
        if (res?.error == null) {
            router.push('/')
        }

        else
        {
            toast.error('Error from server')
        }
    } catch (error) {
        console.log(error)
    }
    
  }

  return (
    <div className={classess.container}>
        <div className={classess.wrapper}>
            <h2>Login</h2>
            <form onSubmit ={handleSubmit}>
                <input type='email' placeholder='Email...' onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                <button className={classess.submitButton}>Log In</button>
                <Link className={classess.loginNow} href='/register'>
                    Do not have account ? <br/> Register Now
                </Link>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login
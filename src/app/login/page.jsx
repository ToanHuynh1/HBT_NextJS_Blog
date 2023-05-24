'use client'

import React, { useState } from 'react'
import classess from './login.module.css'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'


const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    e.preventDefault()


  }

  return (
    <div className={classess.container}>
        <div className={classess.wrapper}>
            <h2>Login</h2>
            <from onSubmit={handleSubmit}>
                <input type='email' placeholder='Email...' onChange={(e) => setEmail(e.target.value)}/>
                <input type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)}/>
                <button className={classess.submitButton}>Log In</button>
                <Link className={classess.loginNow} href='/register'>
                    Do not have account ? <br/> Register Now
                </Link>
            </from>
        </div>

        <ToastContainer/>
    </div>
  )
}

export default Login
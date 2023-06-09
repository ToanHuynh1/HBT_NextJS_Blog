'use client'

import React, { useState } from 'react'
import classes from './navbar.module.css'
import Link from 'next/link'
import person from '../../../public/person.jpg'
import Image from 'next/image'
import {AiOutlineClose} from 'react-icons/ai'
import {signIn, signOut, useSession} from 'next-auth/react'


const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false)

  const {data: session} = useSession()

  const handleShowDropDown = () => {
    setShowDropDown(prev => true)
  }


  const handleHideDropDown = () => {
    setShowDropDown(prev => false)
  }
  return (

    <div className={classes.container}>
        <div className={classes.wrapper}>
            <h2 className={classes.left}>
                <Link href='/'>WEB-HBT</Link>
            </h2>

            <ul className={classes.right}>
                {
                session?.user
                ? (
                    <div>
                        <Image onClick= {handleShowDropDown} src={person} width='45' height='45' alt=""/>
                        {
                            showDropDown && (
                                <div className={classes.dropdown}>
                                    <AiOutlineClose className={classes.closeIcon} onClick={() => handleHideDropDown()}/>
                                    <button onClick={() => {signOut();handleHideDropDown()}} className={classes.logout}>Logout</button>
                                    <Link  className={classes.create} onClick={() => handleHideDropDown()} href='/create-blog'>Create</Link>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <>
                        <button onClick={() => {signIn()}} className={classes.login}>Log in</button>
                        <Link href='/register'>Register</Link>
                    </>
                )}
            </ul>
        </div>
    </div>
  )
}

export default Navbar
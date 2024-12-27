/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { useUser } from '../appwrite/users';
import ZKZgGIF from '../../public/ZWdx.gif'
import logo from "../../public/meter-reading-management-1.png"
import '../index.css'


function Login() {
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [isloading, setisloading] = useState(true)
  const [iserr, isseterr] = useState(false)
  const [err, seterr] = useState()

  const navigate = useNavigate();
  const user = useUser()

  useEffect(() => {
    if (user.current) {
      navigate('/home')
    }
  });
  

  const handle_login = async(e) => {
    e.preventDefault()

    if (email == "" || password == "") return
    setisloading(false)
    isseterr(false)
    try {
      await user.login(email,password)
      isseterr(false)
      setEmail("")
      setpassword("") 
      window.location.reload()
    } catch (error) {
      setisloading(true)
      isseterr(true)
      seterr((error.message).slice(0,18))
      // seterr("login" + (error.message))
      // alert("error " + error)
    }
    
  }

  return (
    <div 
    className='w-screen h-screen bg-black flex justify-center items-center flex-col gap-y-3 text-slate-300'>
      <h3 className='text-yellow-500'>{iserr ? err : ""}</h3>
    
      <h1 className='text-5xl font-bold'>Login</h1>

        <form 
        onSubmit={handle_login}
        className='flex flex-col gap-y-3 bg-custom-bg bg-no-repeat bg-center bg-cover '>

          <label id='email'
            className='flex flex-col'
          >email

            <input type="email"
            placeholder='email'
            className="outline-none p-1 border bg-transparent rounded-md"
            value={email}
            id='email'
            required
            onChange={(e)=> setEmail(e.target.value)}
            />

          </label>

          <label id='password'
            className='flex flex-col'
          >Password

            <input type="password"
            placeholder='password'
            className="outline-none p-1 border bg-transparent rounded-md"
            value={password}
            id='password'
            required
            onChange={(e)=> setpassword(e.target.value)}
            />

          </label>
          
          <button type='submit'
          className='w-full h-11 flex justify-center items-center border rounded-md p-2 hover:bg-yellow-500 hover:text-black hover:border-yellow-500'
          >{isloading ? "Login": <img className='w-1/3 h-full flex justify-center items-center' src={ZKZgGIF} alt='Login...'/>}</button>
        </form>

        <div>Don't have a account? <Link to={'/register'} className='text-yellow-500'>Register</Link></div>
    </div>
  );
}

export default Login;

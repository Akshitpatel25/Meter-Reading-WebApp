/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useUser } from '../appwrite/users';
import ZKZgGIF from '../../public/ZWdx.gif'

function Register() {
  const [name, setname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [isloading, setisloading] = useState(true)
  const [iserr, isseterr] = useState(false)
  const [err, seterr] = useState()

  const navigate = useNavigate()
  const user = useUser()

  const handle_register = async (e) => {
    e.preventDefault()
    if (name == "" || email == "" || password == "") return
    setisloading(false)
    isseterr(false)

    try {
      await user.register(email,password,name)
      isseterr(false)
      setname("")
      setEmail("")
      setpassword("")
      window.location.reload()
    } catch (error) {
      setisloading(true)
      isseterr(true)
      seterr(error.message)
      // seterr("register" + error.message)
      // alert("error " + error)
    }

    
  }

  return (
    <div 
    className='w-screen h-screen bg-black flex justify-center items-center flex-col gap-y-3 text-slate-300'>

      <h3 className='text-yellow-500'>{iserr ? err : ""}</h3>
      <h1 className='text-5xl font-bold'>Register</h1>

        <form 
        onSubmit={handle_register}
        className='flex flex-col gap-y-3 bg-custom-bg bg-no-repeat bg-center bg-cover'>
          <label id='name'
            className='flex flex-col'
          >name

            <input type="text"
            placeholder='Name'
            className="outline-none p-1 border bg-transparent rounded-md"
            id='name'
            value={name}
            required
            onChange={(e)=> setname(e.target.value)}
            />

          </label>

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
          >{isloading ? "Register": <img className='w-1/3 h-full flex justify-center items-center' src={ZKZgGIF} alt='Login...'/>}</button>
        </form>

        <div>Have a account? <Link to={'/login'} className='text-yellow-500'>Login</Link></div>
    </div>
  );
}

export default Register;

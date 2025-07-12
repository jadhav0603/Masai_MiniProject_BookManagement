import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const {setUserEmail} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://masai-miniproject-bookmanagement-1.onrender.com/api/auth/login", {
        email, password
      })
      
      console.log(response.data)

      toast.success('user logged in success')

      const token = response.data.token
      localStorage.setItem('token', token)
      const useremailid = response.data.email
      setUserEmail(useremailid)
      localStorage.setItem('email', useremailid)
      
      navigate('/home')

    } catch (error) {
      console.log("login_Error : ", error.message)
      setEmail("")
      setPassword("")
      if (error.status === 404){
        toast.error('Incorrect Email and Password')
      }

      if (error.status === 403){
        toast.error('Incorrect Password')
      }
    }
  }

  return (
    <form onSubmit={handleLogin}
      className='flex flex-col shadow-lg p-[2vw] rounded-sm m-[1vw] bg-gray-100'
    >

      <input
        type="email"
        placeholder="Enter your Email-ID"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required

        className='w-[25vw] p-[10px] m-[1vw] border-solid border-gray border-1 rounded-sm'

      />


      <input
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required

        className='w-[25vw] p-[10px] m-[1vw] border-solid border-gray border-1 rounded-sm'

      />



      <button type='submit'
        className='w-[25vw] p-[10px] m-[1vw] rounded-sm bg-blue-400 text-white font-bold'
      >
        L O G I N </button>


    </form>

  )
}

export default Login
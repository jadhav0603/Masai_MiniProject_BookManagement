import React, { useState } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'

const LoginRegister = () => {

  const [login, setLogin] = useState(true)
  const [register, setRegister] = useState(false)

  return (
    <div className='shadow-2xl p-[3vw] w-fit rounded-xl text-center'>
      <h1 className='pb-[20px]'>W E L C O M E &nbsp; &nbsp; U S E R </h1>
      <div className='rounded-sm bg-gray-100 p-[5px] justify-center'>
        <button
          onClick={()=>{setLogin(true), setRegister(false)}}
          className='w-[15vw] p-[10px] bg-blue-400 text-white font-bold'
          style={{backgroundColor: login ? "#60a5fa" : " white", color: login ? "white" : "black"}}
        >
          LOG IN
        </button>

        <button
          onClick={()=>{setRegister(true), setLogin(false)}}
          className='w-[15vw] p-[10px] bg-blue-400 text-white font-bold'
          style={{backgroundColor: register ? "#60a5fa" : " white", color: register ? "white" : "black"}}        
        >
          REGISTER
        </button>
      </div>

      <div className='flex justify-center'>
        {
        (login) ? <Login /> : <Register onRegisterSuccess={()=>{setLogin(true),setRegister(false)}} />
        }
      </div>

    </div>
  )
}

export default LoginRegister
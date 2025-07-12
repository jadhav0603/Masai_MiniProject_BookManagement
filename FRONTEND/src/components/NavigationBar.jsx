import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { AuthContext } from '../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const NavigationBar = () => {

  // const {userEmail,setUserEmail} = useContext(AuthContext)

  const userEmailId = localStorage.getItem('email')
  
  useEffect(()=>{
    // const fetUserDetails = async()=>{
    //   const token = localStorage.getItem('token')
    //   const response = await axios.get('http://localhost:3000/api/auth/me',
    //     {
    //       headers:{
    //         authorization : `Bearer ${token}`
    //       }
    //     }
    //   )
    //   console.log(response.data)
    //   setUserEmail(response.data.email)
    // }

    // fetUserDetails()

  },[])


  return (
    <div className='bg-black text-white text-[1.5vw] font-semibold flex justify-between items-center w-[100vw] px-[20px]'>
        <h2> My Library</h2>
        <div className='flex gap-[5vw]'>
        <Link to="/home">Home</Link>
        <Link to="/myBooks">My Books</Link>
        </div>
        <div>
          <FontAwesomeIcon icon={faCircleUser} /> &nbsp;
          {userEmailId}
        <Logout />
        </div>


    </div>
  )
}

export default NavigationBar
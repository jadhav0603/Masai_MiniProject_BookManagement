import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {

    const navigate = useNavigate()
    
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        toast.warning('User LogOut Successfully')
        navigate('/')
    }

    return (

        <button 
            onClick={handleLogout}
            className='w-[10vw] p-[10px] m-[1vw] rounded-sm bg-blue-400 text-white text-[1vw] font-bold'
        > L O G &nbsp; O U T  </button>


    )
}

export default Logout
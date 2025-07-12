import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginRegister from '../pages/LoginRegister'
import Home from '../pages/Home'
import MyBooks from '../pages/MyBooks'


const Routing = () => {
  return (
    <Routes>
    
        <Route path='/' element={<LoginRegister />} />
        <Route path='/home' element={<Home />} />
        <Route path='/myBooks' element={<MyBooks />} />

    </Routes>
  )
}

export default Routing
import React, { useContext, useEffect, useState } from 'react'
import NavigationBar from '../components/NavigationBar'
import Footer from '../components/Footer'
import BookCard from '../components/BookCard'
import { AuthContext } from '../contexts/AuthContext'

const Home = () => {

  const {booksData, loading} = useContext(AuthContext)

  // if(loading) return <h3>L O A D I N G . . .</h3> 

  return (
    <div>
      <NavigationBar />
        { (loading) ?  <h3 className='min-h-screen px-[100px] py-[50px]'>L O A D I N G . . .</h3> : <>
        <h1 className='text-center pt-[20px] font-bold text-[3vw] underline underline-offset-2'>List Of Books</h1>
        <div className='min-h-screen p-[5vw] flex flex-wrap gap-[6vw] justify-center'>
          {
            booksData.map((ele, i) => (
              <BookCard state={{ele,i}} />
            ))
          }
        </div>
        </>
        }

      <Footer />
    </div>
  )
}

export default Home
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const BookCard = ({ state }) => {

  const { ele, i } = state

  const navigate = useNavigate()

  const handleReadBooks = async (bookId) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post(`http://localhost:3000/api/myBooks/${bookId}`, null,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )

      console.log(response.data)
      toast.success(response.data.message)

    } catch (error) {
      console.log("add book error : ")
      if(error.status === 409){
        toast.error('Book already existed in your MyBooks Section')
      }

      if(error.status === 500){
        toast.error('Login First')
        navigate('/')
      }
    }
  }

  return (
    <div key={i}
      className='w-[24vw] p-[10px] shadow-xl rounded-sm'
    >
      <img src={ele.cover}
        className='w-[20vw] h-[28vw] m-auto rounded-xl'
      />
      <div className='w-[20vw] m-auto mt-[20px]'>
        <h1 className='font-bold'>{ele.title}</h1>
        <h3>Author : {ele.author}</h3>
        {/* <p> Pages : {ele.pages} </p> */}
        {/* <p> Year : {ele.year}</p> */}
        <p> Availability : {(ele.availability) ? "Yes" : "No"}</p>

        <button
          onClick={() => handleReadBooks(ele._id)}
          className='w-[20vw] p-[10px] my-[1vw] rounded-sm bg-gray-800 text-white font-bold'
        >WANT TO READ</button>

      </div>
    </div>
  )
}

export default BookCard
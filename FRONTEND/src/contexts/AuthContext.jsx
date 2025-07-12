import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

    const [userEmail, setUserEmail] = useState("")
    const [rating, setRating] = useState(1)
    const [booksData, setBooksData] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("Want to Read")

     useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios.get("https://masai-miniproject-bookmanagement-1.onrender.com/api/books")
        console.log(response.data)
        setBooksData(response.data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log("fetchData_Error : ", error.message)
      }
    }
    fetchData()
  }, [])


  return (
    <AuthContext.Provider value={{userEmail, setUserEmail,rating,setRating, booksData, setBooksData,loading, setLoading, status,setStatus}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
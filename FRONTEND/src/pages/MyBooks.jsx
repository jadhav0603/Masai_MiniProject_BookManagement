import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import { AuthContext } from "../contexts/AuthContext";
import MyBookCard from './../components/MyBookCard';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyBooks = () => {
  const [userBooksData, setUserBooksData] = useState([]);
  const {rating, status} = useContext(AuthContext)
  const [emptyError, setEmptyError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserBooks = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://masai-miniproject-bookmanagement-1.onrender.com/api/myBooks", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        console.log("user books data : ", response.data);
        setUserBooksData(response.data);
        setEmptyError(false)

      } catch (error) {
        console.log(error);
        setEmptyError(true)
        if(error.status === 500){
          toast.error('Login First')
          navigate('/')
        }
      }
    };

    fetchUserBooks();
  }, [rating, status]);

  // console.log("user ",userBooksData)





  return (
    <div>
      <NavigationBar />

      
      <div className="min-h-screen flex flex-col justify-center items-center gap-[2vw]">
  {emptyError ? (
    <h1>Your My Books Section is Empty, Go to Home Page Add Books</h1>
  ) : Array.isArray(userBooksData) && userBooksData.length > 0 ? (
    userBooksData.map((ele, i) => (
      <MyBookCard key={i} ele={ele} i={i} />
    ))
  ) : (
    <h3>Your My Books Section is Empty, Go to Home Page Add Books</h3>
  )}
</div>


      <Footer />
    </div>
  );
};

export default MyBooks;

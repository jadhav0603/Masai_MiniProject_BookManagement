import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const MyBookCard = ({ ele, i }) => {
  const { setRating, setStatus } = useContext(AuthContext);

  const handleRating = async (bookId, rateValue) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/mybooks/${bookId}/rating`,
        { rating: rateValue },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setRating(rateValue);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleStatus = async (bookId, statusValue) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/mybooks/${bookId}/status`,
        { status: statusValue },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setStatus(statusValue);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      key={i}
      className="flex justify-around items-center shadow-sm w-[70vw] gap-[10vw] p-[2vw]"
    >
      <div>
        <img src={ele.bookId.cover} className="w-[20vw]" />
      </div>
      <div>
        <h1>Author : {ele.bookId.author}</h1>
        <p> Genre : {ele.bookId.genre}</p>
        <p> Pages : {ele.bookId.pages}</p>
        <p> Year : {ele.bookId.year}</p>
        <p>
          {" "}
          Rating :
          <select
            value={ele.rating}
            onChange={(e) =>
              handleRating(ele.bookId._id, Number(e.target.value))
            }
          >
            <option value={1}> 1 </option>
            <option value={2}> 2 </option>
            <option value={3}> 3 </option>
            <option value={4}> 4 </option>
            <option value={5}> 5 </option>
          </select>
        </p>
        <p>
          {" "}
          Status :
          <select
            value={ele.status}
            onChange={(e) => handleStatus(ele.bookId._id, e.target.value)}
          >
            <option value="Want to Read">Want to Read</option>
            <option value="Currently Reading">Currently Reading</option>
            <option value="Read">Read</option>
          </select>
        </p>
      </div>
    </div>
  );
};

export default MyBookCard;

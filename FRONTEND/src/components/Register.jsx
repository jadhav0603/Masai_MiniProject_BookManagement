import axios from 'axios'
import React, { useState } from 'react'

const Register = ({ onRegisterSuccess }) => {

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [gender, setGender] = useState("Male")
    const [DOB, setDOB] = useState("")

    const [loading, setLoading] = useState(false)




    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            const response = await axios.post('https://masai-miniproject-bookmanagement-1.onrender.com/api/auth/register',
                { userName, email, password, gender, DOB }
            )

            console.log(response.data)
            setLoading(false)
            onRegisterSuccess()

        } catch (error) {
            setLoading(false)

            setUserName("")
            setEmail("")
            setPassword("")
            setGender("")
            setDOB("")

            console.log("Register Error : ", error.message)
        }

    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <form onSubmit={handleRegister}
                className='flex flex-col p-[2vw] shadow-lg rounded-sm m-[1vw] bg-gray-100'
            >
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required

                    className='w-[25vw] p-[10px] m-[1vw] border-solid border-gray border-1 rounded-sm'
                />

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

                <div className='flex flex-col w-fit p-[10px]'>
                    <span>Gender:</span>

                    <label className='w-fit'>
                        <input
                            type="radio"
                            value="Male"
                            name="gender"
                            checked={gender === "Male"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        &nbsp; Male
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="Female"
                            name="gender"
                            checked={gender === "Female"}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        &nbsp; Female
                    </label>

                </div>

                <input
                    type="date"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                    required

                    className='w-[25vw] p-[10px] m-[1vw]  border-solid border-gray border-1 rounded-sm'

                />

                <button type='submit'
                    className='w-[25vw] p-[10px] m-[1vw] rounded-sm bg-blue-400 text-white font-bold'

                > R E G I S T E R </button>


            </form>

        </div>
    )
}

export default Register
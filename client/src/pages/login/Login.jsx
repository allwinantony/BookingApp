import React, { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import "./login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [credentials, SetCredentials] = useState({
        username:undefined,
        password:undefined
    })

    const { loading, error, dispatch } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleChange = (e) =>{
        SetCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
    }

    const handleClick = async e => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post("/auth/login", credentials)
            dispatch({ type:"LOGIN_SUCCESS", payload:res.data.details })
            navigate("/")
        } catch (err) {
            dispatch({ type:"LOGIN_FAILURE", payload:err.response.data })
        }
    }

  return (
    <div className='login'>
        <div className='lContainer'>
            <input type="text" placeholder='username' id='username' onChange={handleChange} className='lInput' />
            <input type="password" placeholder='password' id='password' onChange={handleChange} className='lInput' />
            <button type='button' /* disabled={loading} */ onClick={handleClick} className='lButton'>Login</button>
            {error && <span>{error.message}</span> }
        </div>
    </div>
  )
}

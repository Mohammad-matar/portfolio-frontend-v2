import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai'
import { useAuth } from '../../auth'
import "./style.css"

export default function Login() {
    const [inputType, setInputType] = useState("password");
    const [data, setData] = useState({})
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const auth = useAuth()
    const navigate = useNavigate()

    const togglePassword = () => {
        if (inputType === "password") {
            setInputType("text");
        } else {
            setInputType("password");
        }
    };
    const handleLogin = (e) => {
        e.preventDefault()
        if (!data.email) {
            alert("Email is required")
        } else if (!data.password) {
            alert("Password is required")

        } else {
            axios.post("https://matar-portfolio.onrender.com/auth/login", data)
                .then(res => {
                    // console.log(res.data.token);
                    auth.login(res.data.token);
                    navigate('/dashboard');
                })
                .catch(error => {
                    console.log(error)
                    alert(error.response.data.message)

                })
        }
    }
    return (
        <div className='backgroundSection'>
            <div className='overlay'></div>
            <div className="login">
                <div className="login_heading">
                    <h2 className='login_heading_signin' >Login</h2>
                    <form className='login_form' onSubmit={handleLogin}>

                        <div className="input_group">
                            <input type="text" name='email' placeholder="Username or email" onChange={handleChange} required />
                            <div className="input_group">
                                <input
                                    name='password'
                                    placeholder="Password"
                                    type={inputType}
                                    required
                                    onChange={handleChange} />

                                <AiOutlineEye onClick={() => togglePassword()} className="login_eye" />
                            </div>

                        </div>
                        <div className='reset_password'>
                            <p>
                                Forget password ?<span> Reset</span>
                            </p>
                        </div>
                        <div className='login_btn'>
                            <button type="submit" className="float" onClick={handleLogin}>Login</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>

    )
}

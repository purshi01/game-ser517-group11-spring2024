import React from 'react'
import '../styles/Login.css'

import profile_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'

export const Login = () => {
    return (
        <div className='container'>
            <div className='header1'>
                <div className='text'>Sign Up</div>
                <div className='underline'></div>
            </div>
            <div className='input'>
                <img src={profile_icon} alt=""/>
                <input type = "text" placeholder='User Name'/>
            </div>
            <div className='input'>
                <img src={email_icon} alt=""/>
                <input type = "text" placeholder='User Email'/>
            </div>
            <div className='input'>
                <img src={password_icon} alt=""/>
                <input type = "text" placeholder='Password'/>
            </div>
            <div className="forgot-password">Forgot Password? <span>Click Here</span></div>
            <div className="submit-container">
                <div className="submit">Register</div>
                <div className="submit">Login</div>
            </div>
        </div>
    )
}

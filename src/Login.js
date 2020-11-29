import React from 'react'
import "./Login.css"
import {auth, provider} from "./firebase"


export default function Login() {
    
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error)=>alert(error.message))
        
    }
    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/Discord_Color_Text_Logo.svg" alt="" />
            </div>
            <button onClick={signIn} >Sign In</button>
        </div>
    )
}

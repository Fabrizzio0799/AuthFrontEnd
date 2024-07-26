import React from 'react'
import { useAuth } from '../../contexts/userContext'

const LoginForm = () => {
    const {login,user}=useAuth()
    const handleOnSubmit = (e)=>{
        e.preventDefault();
        login();
        console.log(user)

    }
  return (
    <form onSubmit={handleOnSubmit}>
        <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
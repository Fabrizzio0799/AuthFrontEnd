import React from 'react'
import { useAuth } from '../contexts/userContext'


const Test = () => {
    const {user, login} = useAuth()
  return (
    <>
    <div>{!user ? 'Bienvenido':user.user}</div>
    <button onClick={login}>Login</button>
    </>
    
  )
}

export default Test
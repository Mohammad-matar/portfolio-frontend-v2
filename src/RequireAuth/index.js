import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth'

export const  RequireAuth=({children}) => {
    const auth = useAuth()
    let token = auth.authorizationToken()
    if(!token){
        return <Navigate to="/login" />
    }
    return children
}
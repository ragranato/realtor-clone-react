import React from 'react'
import { Outlet, Navigate } from 'react-router'
import {useAuthStatus} from '../hooks/useAuthStatus'
import Spinner from './Spinner'

function PrivateRoute() {    
    const { loggedIn, checkStatus } = useAuthStatus()

    if(checkStatus){
        return <Spinner/>
    }
    
  return (
    loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
   )
}

export default PrivateRoute
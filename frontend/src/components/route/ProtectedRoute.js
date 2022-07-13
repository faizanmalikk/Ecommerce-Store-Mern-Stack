import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import StatesContext from '../../context/StatesContext'




const ProtectedRoute = (props) => {
  

    const context = useContext(StatesContext)
    const { userInfo } = context

  
    return  userInfo ? <Outlet /> : <Navigate to={'/login'} />

}

export default ProtectedRoute
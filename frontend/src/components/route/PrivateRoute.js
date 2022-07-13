import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import StatesContext from '../../context/StatesContext'

const PrivateRoute = (props) => {

  
    const context = useContext(StatesContext)
    const { userInfo } = context



    return userInfo && userInfo.user.role === 'admin' ? <Outlet /> : <Navigate to={'/login'} />


}
export default PrivateRoute


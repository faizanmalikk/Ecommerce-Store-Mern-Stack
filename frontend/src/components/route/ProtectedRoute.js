import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import StatesContext from '../../context/StatesContext'
import { useLoadUserQuery } from '../../services/userApi'
import Loader from '../Layout/loader/Loader'


const ProtectedRoute = (props) => {
    const { data, isFetching } = useLoadUserQuery()

    const context = useContext(StatesContext)
    const { userInfo } = context

  
    return isFetching ? <Loader /> : data !== undefined || userInfo ? <Outlet /> : <Navigate to={'/login'} />

}

export default ProtectedRoute
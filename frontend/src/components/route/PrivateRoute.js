import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import StatesContext from '../../context/StatesContext'
import { useLoadUserQuery } from '../../services/userApi'
import Loader from '../Layout/loader/Loader'


const PrivateRoute = (props) => {

    const { data, isFetching } = useLoadUserQuery()
    const context = useContext(StatesContext)



    return isFetching ? <Loader /> : data && data.user.role === 'admin' ? <Outlet /> : <Navigate to={'/login'} />


}
export default PrivateRoute


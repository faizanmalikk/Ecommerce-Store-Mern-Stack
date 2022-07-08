import React,{ useState, useContext } from 'react';
import StatesContext from '../../../context/StatesContext';
import { Avatar, Backdrop,Box,SpeedDial , SpeedDialAction} from '@mui/material';
import profile from '../../../assets/Profile.png'
import { Dashboard, ListAlt, ExitToApp, PermIdentity } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import { useLoadUserQuery, useLogoutUserMutation } from '../../../services/userApi';
import Loader from '../loader/Loader';


export default function BasicSpeedDial() {

  const context = useContext(StatesContext)
  const { userInfo, setisAuthenticated, setuserInfo } = context

  const navigate = useNavigate();
  const [logout, info] = useLogoutUserMutation()
  const {data , isFetching} = useLoadUserQuery()

  
  const [open, setopen] = useState(false)


  const orders = () => {
    navigate('/orders')
    setopen(false)
  }

  const account = () => {
    navigate('/account')
    setopen(false)

  }

  const dashboard = () => {
    navigate('/admin/dashboard')
    setopen(false)

  }

  const LogoutUser = () => {

    logout()
    setisAuthenticated(false)
    setuserInfo(null)
    navigate('/login')
    setopen(false)
    window.location.reload()
   
  }

  const actions = [
    { icon: <PermIdentity />, name: 'Profile', func: account },
    { icon: <ListAlt />, name: 'Orders', func: orders },
    { icon: <ExitToApp />, name: 'Logout', func: LogoutUser },

  ];


  if(userInfo && userInfo.user.role === 'admin'){
    actions.unshift({ icon: <Dashboard />, name: 'Dashboard', func: dashboard })   
  }

  


  return (
    <>
{!data ? (<Loader/>) : (
  
      <Box component='span' sx={{ position: 'absolute', top: 6, right: 7 }} >

        <Backdrop open={open} onClick={() => setopen(false)} sx={{ zIndex: '9' }} />
        <SpeedDial
     
          ariaLabel="SpeedDial tooltip example"
          onOpen={() => setopen(true)}
          open={open}
          direction="down"
          icon={<Avatar src={userInfo.user.avatar.url ? userInfo.user.avatar.url : profile} />}
        >
          {actions.map((action) => (
            <SpeedDialAction
            key={action.name}
            icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.func}
              />
              ))}
        </SpeedDial>
     
      </Box>
)}
    </>
  );
}

import React,{ useState, useContext, useEffect } from 'react';
import StatesContext from '../../../context/StatesContext';
import { Avatar, Backdrop,Box,SpeedDial , SpeedDialAction} from '@mui/material';
import profile from '../../../assets/Profile.png'
import { Dashboard, ListAlt, ExitToApp, PermIdentity } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import {  useLogoutUserMutation } from '../../../services/userApi';



export default function BasicSpeedDial() {

  const context = useContext(StatesContext)
  const { userInfo, setisAuthenticated, setuserInfo } = context

  const navigate = useNavigate();
  const [logout, response] = useLogoutUserMutation()


  
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
    
    setisAuthenticated(false)
    setuserInfo(null)
    navigate('/login')
    setopen(false)
  
    logout()
   
   
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
{ userInfo && (
  
      <Box component='span' sx={{ position: 'absolute', right: 7,top:{xs:10,sm:15} }} >

        <Backdrop open={open} onClick={() => setopen(false)} sx={{ zIndex: '9' }} />
        <SpeedDial
     
          ariaLabel="SpeedDial tooltip example"
          onClick={()=>setopen(!open)}
          open={open}
          FabProps={{size:'small'}}
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

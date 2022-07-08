import React, { useState, useEffect,useContext } from 'react'
import { Box } from '@mui/material'
import { FormContainer, FormHeading, StyledBox } from './style'
import LoginForm from './login/Login'
import RegisterForm from './resgister/Register'
import { useNavigate,useLocation } from 'react-router-dom'
import StatesContext from '../../../context/StatesContext'


const LoginSignUp = () => {

  const context = useContext(StatesContext)
  const { isAuthenticated } = context
  const [Login, setLogin] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { search } = useLocation();


const redirect = search ? search.split("=")[1] : "/account";



  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect)
    }

  }, [isAuthenticated,redirect])


  return (
    <>

      <StyledBox >


        <FormContainer>
          <Box display={'flex'} paddingTop={'20px'} >
            <FormHeading component={'h4'} onClick={() => setLogin(true)} borderBottom={Login && '6px solid #1976d2'} >LOGIN</FormHeading>
            <FormHeading component={'h4'} onClick={() => setLogin(false)} borderBottom={!Login && '6px solid #1976d2'}>REGISTER</FormHeading>
          </Box>

          {Login && (
            <LoginForm />
          )}

          {!Login && (
            <RegisterForm />
          )}

        </FormContainer>
      </StyledBox>


    </>
  )
}

export default LoginSignUp
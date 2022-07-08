import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import React, { useEffect, useContext, useRef,useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import StatesContext from '../../../../context/StatesContext'
import { useLoginUserMutation } from '../../../../services/userApi'
import Alertshai from '../../../Layout/Alerts/Alertshai'
import Loader from '../../../Layout/loader/Loader'
import { ForgotPass } from '../style'
import Cookies from 'js-cookie'


const LoginForm = () => {

    const context = useContext(StatesContext)
    const { isAuthenticated, setisAuthenticated ,setuserInfo } = context

    const [loginEmail, setloginEmail] = useState('')
    const [loginPassword, setloginPassword] = useState('')
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
    });

    const [loginUser, responseInfo] = useLoginUserMutation()
   

    const navigate = useNavigate()
    const loginTab = useRef(null)


    const loginSubmit = (e) => {

        e.preventDefault()
        loginUser({ loginEmail, loginPassword })

    }

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };


    useEffect(() => {

        if (responseInfo.status === 'fulfilled') {

            setisAuthenticated(true)
            setuserInfo(responseInfo.data)            
        
        }

      

    }, [responseInfo, isAuthenticated])



    return (
        <>
                  { responseInfo.error && <Alertshai severity={'error'} text={responseInfo.error.data.message} />}

       
           <Box component={'form'} onSubmit={loginSubmit} ref={loginTab} textAlign={'center'} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }}  >

                <TextField type={'email'} onChange={(e) => setloginEmail(e.target.value)} value={loginEmail} required fullWidth id="outlined-basic" label="Email" variant="outlined" sx={{ marginBottom: '2em' }} />
                <FormControl variant="outlined" fullWidth>

                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setloginPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        required

                        sx={{ padding: '0 10px' }}
                    />
                </FormControl>
                <ForgotPass component={Link} to={'/password/forgot'}  >Forgot Password?</ForgotPass>
                <Button variant="contained" type='submit' sx={{ marginTop: '50px', width: '100%' }}>{responseInfo.isLoading ? <CircularProgress sx={{color:'white'}}/> : 'Login'}</Button>
            </Box>
        </>
    )
}

export default LoginForm
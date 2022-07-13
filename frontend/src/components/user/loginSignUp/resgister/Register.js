
import { Face, LockOpen, MailOutline } from '@mui/icons-material'
import { Box, Button, CircularProgress, InputAdornment, TextField } from '@mui/material'
import React, { useContext, useState, useEffect } from 'react'
import { useRegisterUserMutation } from '../../../../services/userApi'
import { InputFile } from '../style'
import profile from '../../../../assets/Profile.png'
import { useNavigate } from 'react-router-dom'
import Alertshai from '../../../Layout/Alerts/Alertshai'
import StatesContext from '../../../../context/StatesContext'




const RegisterForm = () => {

    const context = useContext(StatesContext)
    const { isAuthenticated, setisAuthenticated , setuserInfo } = context


    const [avatar, setavatar] = useState()
    const [avatarPreview, setavatarPreview] = useState(profile)
    const [user, setuser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = user
    const [RegisterUser, response] = useRegisterUserMutation()

    const navigate = useNavigate()

    const handleResgisterChange = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setavatar(reader.result)
                    setavatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])

        } else {
            setuser({ ...user, [e.target.name]: e.target.value })
        }

    }
    

    const resgisterSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
      {avatar &&  myForm.append("avatar", avatar)}

        RegisterUser(myForm);


    }
    useEffect(() => {

        if (response.status === 'fulfilled') {
            setisAuthenticated(true)
            setuserInfo(response.data)            
          }
    }, [response])


    return (
        <>
            {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
           
            <Box component={'form'} encType='multipart/form-data'  onSubmit={resgisterSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                <TextField
                    label="Name"
                    name='name'
                    value={name}
                    required
                    onChange={handleResgisterChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Face />
                            </InputAdornment>
                        )
                    }} />
                <TextField
                    label="Email"
                    name='email'
                    value={email}
                    onChange={handleResgisterChange}
                    type={'email'}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutline />
                            </InputAdornment>
                        )
                    }} />
                <TextField
                    id="input-with-icon-textfield"
                    label="Password"
                    name='password'
                    value={password}
                    required
                    onChange={handleResgisterChange}
                    type={'password'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOpen />
                            </InputAdornment>
                        )
                    }} />
                <Box display={'flex'} alignItems='center' paddingLeft={'5px'}>
                    <Box component={'img'} src={avatarPreview} width='55px' marginRight={'20px'}></Box>
                    <InputFile
                        component={'input'}
                        label="avatar"
                        name='avatar'
                        accept='image/*'
                        onChange={handleResgisterChange}
                        type={'file'}
                    ></InputFile>

                </Box>

                <Button variant="contained" type='submit' sx={{ marginTop: '30px', width: '100%' }}>{response.isLoading ? <CircularProgress sx={{color:'white'}}/> : 'Register'}</Button>

            </Box>

        </>
    )
}

export default RegisterForm
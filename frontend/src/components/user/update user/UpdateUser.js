import React, { useContext, useState, useEffect } from 'react'
import { Face, MailOutline } from '@mui/icons-material'
import { Box, Button, CircularProgress, InputAdornment, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useLoadUserQuery,useUpdateUserMutation } from '../../../services/userApi'
import StatesContext from '../../../context/StatesContext'
import Alertshai from '../../Layout/Alerts/Alertshai'
import { InputFileUpdate, StyledBoxUpdate , FormContainerUpdate, FormHeadingUpdate } from './style'
import Loader from '../../Layout/loader/Loader'
import MetaData from '../../Layout/MetaData'


const UpdateUser = () => {

    const context = useContext(StatesContext)
    const { setuserInfo , userInfo:userdata} = context

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [avatar, setavatar] = useState()
    const [avatarPreview, setavatarPreview] = useState()

  
    const [updateUser , response] = useUpdateUserMutation()


    const navigate = useNavigate()

    const handleUpdateChange = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader()
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setavatar(reader.result)
                    setavatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])

        } 

    }

    const updateSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        { avatar && myForm.set("avatar", avatar)}

        updateUser(myForm);

      
     
    }
  
    
    useEffect(() => {
        if(userdata){
         
            setname(userdata.user.name)
            setavatarPreview(userdata.user.avatar.url)
            setemail(userdata.user.email)
        }
      


        if (response.status === 'fulfilled') {
           
            setuserInfo(response.data)            
            navigate('/account')

        }

    }, [userdata , response ])


  return (
    <>
    <MetaData title={'Update Profile'}/>
     {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
     {response.isLoading ? <Loader/> : <StyledBoxUpdate>
               <FormContainerUpdate>
                   <FormHeadingUpdate>Update Profile</FormHeadingUpdate>
            <Box component={'form'} encType='multipart/form-data' onSubmit={updateSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                <TextField
                    label="Name"
                    name='name'
                    value={name}
                    required
                    onChange={(e)=>setname(e.target.value)}
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
                    onChange={(e)=> setemail(e.target.value)}
                    type={'email'}
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutline />
                            </InputAdornment>
                        )
                    }} />
           
                <Box display={'flex'} alignItems='center' paddingLeft={'5px'}>
                    <Box component={'img'} src={avatarPreview} width='55px' marginRight={'20px'}></Box>
                    <InputFileUpdate
                        component={'input'}
                        label="avatar"
                        name='avatar'
                        accept='image/*'
                        onChange={handleUpdateChange}
                        type={'file'}
                    ></InputFileUpdate>

                </Box>

                <Button variant="contained" type='submit' sx={{ marginTop: '50px', width: '100%' }}>Update</Button>

            </Box>
            </FormContainerUpdate>
            </StyledBoxUpdate>
            
                }
    </>
  )
}

export default UpdateUser
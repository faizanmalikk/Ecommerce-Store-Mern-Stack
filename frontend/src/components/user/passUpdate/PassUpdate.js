import React, {  useState, useEffect } from 'react'
import {  Lock, LockOpen, VpnKey } from '@mui/icons-material'
import { Box, Button, Checkbox, CircularProgress , FormControlLabel, InputAdornment,  TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useUpdateUserPasswordMutation } from '../../../services/userApi'
import Alertshai from '../../Layout/Alerts/Alertshai'
import MetaData from '../../Layout/MetaData'
import { StyledBoxUpdatePass } from './style'
import { FormContainerUpdatePass } from './style'
import { FormHeadingUpdatePass } from './style'

const PassUpdate = () => {

  const [oldPassword, setoldpass] = useState()
  const [newPassword, setnewpass] = useState()
  const [confirmPassword, setconfirmpass] = useState()
const [showpassword, setshowpassword] = useState(false)

  const [updateUserPass, response] = useUpdateUserPasswordMutation()


  const navigate = useNavigate()



  const updatePassSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    updateUserPass(myForm);
   



  }

  useEffect(() => {
    
    if (response.status === 'fulfilled') {
               
      navigate('/account')

 }
  }, [response])
  

  return (
    <>

      <MetaData title={'Change Password'} />
      {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
      {response.status === 'fulfilled' && <Alertshai severity={'success'} text='Password has been updated successfully' />}
      <StyledBoxUpdatePass>
        <FormContainerUpdatePass>
          <FormHeadingUpdatePass>Change Password </FormHeadingUpdatePass>
          <Box component={'form'}  onSubmit={updatePassSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>



          <TextField
                    id="input-with-icon-textfield"
                    label="Old Password"
                    name='oldPassword'
                    value={oldPassword}
                    required
                    onChange={(e)=> setoldpass(e.target.value)}
                    type={'password'}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <VpnKey />
                            </InputAdornment>
                        )
                    }} />
          <TextField
                    id="input-with-icon-textfield"
                    label="New Password"
                    name='newPassword'
                    value={newPassword}
                    required
                    onChange={(e)=> setnewpass(e.target.value)}
                    type={`${showpassword ? 'text' : 'password'}`}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOpen />
                            </InputAdornment>
                        )
                    }} />
          <TextField
                    id="input-with-icon-textfield"
                    label="Confirm Password"
                    name='confirmPassword'
                    value={confirmPassword}
                    required
                    onChange={(e)=> setconfirmpass(e.target.value)}
                    type={`${showpassword ? 'text' : 'password'}`}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        )
                    }} />

<FormControlLabel sx={{marginTop:'-1em',color:'#616161'}} control={<Checkbox onClick={()=> setshowpassword(!showpassword)} />} label="Show Password" />

            <Button variant="contained" type='submit' sx={{ marginTop : '10px', width: '100%' }}>{response.isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Change'}</Button>

          </Box>
        </FormContainerUpdatePass>
      </StyledBoxUpdatePass>



    </>
  )
}

export default PassUpdate
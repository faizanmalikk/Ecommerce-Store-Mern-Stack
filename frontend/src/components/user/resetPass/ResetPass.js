import React,{useContext,useEffect,useState} from 'react'
import { Lock, LockOpen } from '@mui/icons-material'
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, InputAdornment, TextField } from '@mui/material'
import { useNavigate , useParams} from 'react-router-dom'
import StatesContext from '../../../context/StatesContext'
import { useResetPasswordMutation } from '../../../services/userApi'
import MetaData from '../../Layout/MetaData'
import { FormContainerresetPass, FormHeadingresetPass, StyledBoxresetPass } from './style'
import Alertshai from '../../Layout/Alerts/Alertshai'



const ResetPass = () => {

    const context = useContext(StatesContext)
    const {setresetPage} = context
    setresetPage(true)

  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmpass] = useState('')
const [showpassword, setshowpassword] = useState(false)

  const [resetUserPass, response] = useResetPasswordMutation()

  const navigate = useNavigate()
  const {token} = useParams()



  const resetPassSubmit = (e) => {
    e.preventDefault()

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    resetUserPass({token , myForm});
   
  }

  useEffect(() => {
    
    if (response.status === 'fulfilled') {
               
      navigate('/login')
 }

  }, [response])

   
    
  return (
    <>
     <MetaData title={'Reset Password'} />
      {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
      <StyledBoxresetPass>
        <FormContainerresetPass>
          <FormHeadingresetPass>Reset Password</FormHeadingresetPass>
          <Box component={'form'}  onSubmit={resetPassSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
      
          <TextField
                    id="input-with-icon-textfield"
                    label="New Password"
                    name='password'
                    value={password}
                    required
                    onChange={(e)=> setpassword(e.target.value)}
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

            <Button variant="contained" type='submit' sx={{ marginTop : '10px', width: '100%' }}>{response.isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Reset'}</Button>

          </Box>
        </FormContainerresetPass>
      </StyledBoxresetPass>

    </>
  )
}

export default ResetPass
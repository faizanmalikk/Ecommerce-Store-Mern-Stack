import { MailOutline } from '@mui/icons-material'
import { Box, Button, CircularProgress, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForgotPasswordMutation } from '../../../services/userApi'
import Alertshai from '../../Layout/Alerts/Alertshai'
import MetaData from '../../Layout/MetaData'
import { FormContainerforgotpass, FormHeadingforgotpass, StyledBoxforgotpass } from './style'

const Forgotpass = () => {

    const [email, setemail] = useState('')

    const [forgotPass, response] = useForgotPasswordMutation()

    const forgotSubmit = (e) => {

        e.preventDefault()
        const myForm = new FormData();
        myForm.set("email", email);
        forgotPass(myForm);
    
}

    return (
        <>
            <MetaData title={'Forgot Password'} />
            {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
            {response.status === 'fulfilled' && <Alertshai severity={'success'} text={response.data.message} />}
            <StyledBoxforgotpass>
                <FormContainerforgotpass>
                    <FormHeadingforgotpass>Forgot Password</FormHeadingforgotpass>
                    <Box component={'form'} onSubmit={forgotSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>

                        <TextField
                            label="Email"
                            name='email'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            type={'email'}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutline />
                                    </InputAdornment>
                                )
                            }} />



                        <Button variant="contained" type='submit' sx={{ marginTop: '20px', width: '100%' }}>{response.isLoading ? <CircularProgress sx={{color:'white'}}/>:'Send'}</Button>

                    </Box>
                </FormContainerforgotpass>
            </StyledBoxforgotpass>
        </>
    )
}

export default Forgotpass
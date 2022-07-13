import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import MetaData from '../Layout/MetaData'
import { ContactCard, FormContainercontact, FormHeadingcontact, StyledBoxcontact, StyledDescription } from './style'
import {  Facebook, MailOutline, MessageOutlined, Person, WhatsApp } from '@mui/icons-material'
import emailjs from '@emailjs/browser';
import Alertshai from '../Layout/Alerts/Alertshai'

const Contact = () => {

    const [success, setsuccess] = useState(false)
  
    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_0i7c2kd', 'template_r6icyat', form.current, 'v2p3v6oEibBzL1rIY') 
    setsuccess(true)
    e.target.reset();
};
   
    return (
        <>
        { success && <Alertshai severity={'success'} text='Your response is Submitted Successfully'/>}
            <MetaData title={'ContactUs - Ecommerce'} />
            <StyledBoxcontact>

                <FormContainercontact>
                    <Box padding={{sm:'2em'}} display={'flex'} flexDirection='column' gap='20px'>
                        <ContactCard>
                            <MailOutline sx={{ color: '#01579b' }} />
                            <Typography fontFamily='Roboto' fontWeight={'bold'} >Email</Typography>
                            <Typography fontFamily='Roboto' fontSize={{xs:'20px',sm:'23px'}} textOverflow='ellipsis' whiteSpace={'nowrap'} overflow={'hidden'}>Faizanjamil656@gmail.com</Typography>
                            <Typography component={'a'}
                                href='https://mail.google.com/mail/?view=cm&fs=1&to=faizanjamil656@gmail.com' target={'_blank'}
                                fontFamily='Roboto' color='#0288d1'
                                sx={{
                                    cursor: 'pointer', transition: 'all 0.4s ease', textDecoration: 'none'
                                    , '&:hover': { color: '#01579b' }
                                }}>
                                Send a message
                            </Typography>
                        </ContactCard>
                        <ContactCard>
                            <Facebook sx={{ color: '#01579b' }} />
                            <Typography fontFamily='Roboto' fontWeight={'bold'} >Facebook</Typography>
                            <Typography fontFamily='Roboto' >Faizan MaLik</Typography>
                            <Typography component={'a'} href='https://m.me/faizan.malyk66' target={'_blank'}
                                fontFamily='Roboto' color='#0288d1'
                                sx={{
                                    cursor: 'pointer', transition: 'all 0.4s ease', textDecoration: 'none'
                                    , '&:hover': { color: '#01579b' }
                                }}>
                                Send a message
                            </Typography>
                        </ContactCard>
                        <ContactCard>
                            <WhatsApp sx={{ color: 'green' }} />
                            <Typography fontFamily='Roboto' fontWeight={'bold'} >Whats-App</Typography>
                            <Typography fontFamily='Roboto'>+92-321-3193023</Typography>
                            <Typography component={'a'} fontFamily='Roboto' color='#0288d1'
                                href='https://wa.me/+923213193023' target={'_blank'}
                                sx={{
                                    cursor: 'pointer', transition: 'all 0.4s ease', textDecoration: 'none'
                                    , '&:hover': { color: '#01579b' }
                                }}>
                                Send a message
                            </Typography>
                        </ContactCard>

                    </Box>
                    <Box>
                        <FormHeadingcontact>Contact Us</FormHeadingcontact>
                        <Box component={'form'} ref={form} onSubmit={sendEmail} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>

                            <TextField
                                name='email'
                                placeholder='Email'
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
                                name='name'
                                placeholder='Name'
                                type={'text'}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person />
                                        </InputAdornment>
                                    )
                                }} />
                            <Box display='flex' position={'relative'}>
                                <MessageOutlined sx={{ position: 'absolute', marginLeft: '16px', marginTop: '17px' }} />
                                <StyledDescription
                                    aria-label="empty textarea"
                                    placeholder="Your Message"
                                    minRows={'4'}
                                    required
                                    name='message'

                                />
                            </Box>


                            <Button variant="contained" type='submit' sx={{ marginTop: '20px', width: '100%' }} onMouseOut={()=> setsuccess(false)}>Submit</Button>

                        </Box>
                    </Box>
                </FormContainercontact>

            </StyledBoxcontact>

        </>
    )
}

export default Contact
import { CheckCircle } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import {Link} from 'react-router-dom'
import React from 'react'

const Success = () => {
  return (
    <>
      <Box display={'flex'} flexDirection='column' alignItems={'center'} marginTop={{ xs: '50%', sm: '30%', md: '10%' }} textAlign={'center'}>

        <CheckCircle sx={{ color: '#42a5f5', fontSize: '70px',marginBottom:'10px' }} />
        <Typography color='#9e9e9e' fontFamily={'cursive'} fontSize='28px'>Your Order has been Placed successfully</Typography>
        <Button component={Link} to='/orders' variant='contained' sx={{marginTop:'20px'}}>View Orders</Button>
      </Box>
    </>
  )
}

export default Success
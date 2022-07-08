import React,{useContext} from 'react'
import { Grid, Typography, Box, Stack, styled } from '@mui/material'
import playStore from '../../../assets/playstore.png'
import AppStore from '../../../assets/Appstore.png'
import { useLocation } from 'react-router-dom'
import StatesContext from '../../../context/StatesContext'


const Footer = () => {

  const location = useLocation()
  const context = useContext(StatesContext)
  const {updateProductPage , updateOrderPage , userRolePage} = context

  const HovarableTypography = styled(Typography)({
    "&:hover": {
      color: '#eb4034',
      transition : 'all 0.5s',
      
    }

    
  })
 
 
  const display =  {
    display : `${location.pathname === '/account' || location.pathname === '/login' ||
     location.pathname === '/me/update' || location.pathname === '/password/update'
      || location.pathname === '/password/forgot' 
      || location.pathname === '/cart' || location.pathname === '/login/shipping'
      || location.pathname === '/order/confirm' || location.pathname === '/process/payment' 
      || location.pathname === '/success' || location.pathname === '/orders'
      || location.pathname === '/admin/dashboard' || location.pathname === '/admin/products'
      || location.pathname === '/admin/product'   || location.pathname === '/admin/orders'
      || location.pathname ===  `/admin/product/${updateProductPage}`
      || location.pathname ===  `/admin/order/${updateOrderPage}` 
      || location.pathname ===  `/admin/user/${userRolePage}` 
      || location.pathname ===  '/admin/users' || location.pathname ===  '/admin/reviews'
      || location.pathname ===  '/contact'  || location.pathname ===  '/about'? 'none' : ''}`
  }
  return (
    <Grid container bgcolor={'rgb(34, 33, 33)'} padding={4} sx={display}>
    
      <Grid item xs={12} sm={6} md={4} >
        <Stack direction={'column'} spacing={2} justifyContent='center' alignItems={'center'} textAlign='center'>
          <Typography color={'white'} fontSize='16px' fontWeight={'bold'}>Download Our App</Typography>
          <Typography color={'rgba(255,255,255,0.6)'} fontSize='12px'>Download App For Andriod And IOS Mobile Phone</Typography>
          <Box component={'a'} href='https://playstore.com' target={'_blank'}> <img src={playStore} height='40px' width='130px' style={{ cursor: 'pointer' }} /> </Box>
          <Box component={'a'} href='https://appstore.com' target={'_blank'}> <img src={AppStore} height='40px' width='130px' style={{ cursor: 'pointer' }} /> </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6} md={4} >
        <Box textAlign='center' paddingTop={5}>
          <Typography color={'#eb4034'} variant='h5' fontWeight={'bold'}>ECOMMERCE.</Typography>
          <Typography color={'rgba(255,255,255,0.6)'} fontSize='13px' paddingTop={3}>High Quality is our first priority</Typography>
          <Typography color={'rgba(255,255,255,0.6)'} fontSize='13px' paddingTop='5px'>Copyright 2022 &copy; faizanmalyk </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={4}>

        <Stack direction={'column'} textAlign='center' spacing={1} >
          <Typography component={'a'} variant='h7' href={'/'} fontWeight='bold' color='white' sx={{ paddingTop: { xs: '1.5em', sm: '1em' } }}>Follow us</Typography> 
          <Box>  <HovarableTypography component={'a'} variant='h7' href={'https://instagram.com'} target='_blank' color={'rgba(255,255,255,0.6)'} fontSize='15px' sx={{ textDecoration: 'none' }} paddingTop={1} >Instagram</HovarableTypography> </Box> 
          <Box>  <HovarableTypography component={'a'} href={'https://facebook.com'} target='_blank' sx={{ textDecoration: 'none' }} color={'rgba(255,255,255,0.6)'} fontSize='15px'>Facebook</HovarableTypography> </Box> 
          <Box>  <HovarableTypography component={'a'} href={'https://youtube.com'} target='_blank' sx={{ textDecoration: 'none' }} color={'rgba(255,255,255,0.6)'} fontSize='15px'>Youtube</HovarableTypography> </Box> 
          </Stack>  
      </Grid>
    </Grid>
  )
}

export default Footer
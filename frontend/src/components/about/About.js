import { Avatar, Box,  Typography } from '@mui/material'
import MetaData from '../Layout/MetaData'
import {  FormContainerAbout, FormHeadingAbout, StyledBox, StyledBoxAbout, StyledContainer,  } from './style'
import {  Instagram,  Twitter,  YouTube } from '@mui/icons-material'

import img from '../../assets/character.jpg'

const About = () => {





  return (
    <>

      <MetaData title={'About - Ecommerce'} />
      <StyledContainer>
        
      <StyledBox>
      </StyledBox>


      <StyledBoxAbout>
        <FormContainerAbout>

          <Box >
            <FormHeadingAbout>About Us</FormHeadingAbout>

          </Box>
          <Box display='flex' flexDirection={{ xs: 'column', sm: 'row' }}>
            <Box flex='1'>
              <Box display='flex' flexDirection={'column'} alignItems='center' padding={'0 15px'} paddingTop={'15px'} paddingBottom='2.5em'>
                <Avatar src={img} sx={{ height: '170px', width: '170px' }} />
                <Typography color='#9e9e9e' fontFamily={'cursive'} fontWeight='bold' paddingTop='5px'>Faizan Malik</Typography>
                <Typography component={'a'} href='https://facebook.com' target={'_blank'} color='#9e9e9e' fontFamily={'cursive'} paddingTop='10px'
                  sx={{ textDecoration: 'none', transition: 'all 0.4s ease', '&:hover': { cursor: 'pointer', color: '#616161' } }}
                >Visit Facebook
                </Typography>
                <Typography color='#bdbdbd' fontFamily={'cursive'} textAlign='center'>This is a practice website made by &copy;faizanmalyk</Typography>
              </Box>
            </Box>
            <Box flex='1' borderTop={{ xs: '1px solid #e0e0e0', sm: 'none' }} borderLeft={{ sm: '1px solid #e0e0e0' }}>
              <Box display={'flex'} flexDirection='column' justifyContent='center' alignItems={'center'} paddingTop={'15px'}>
                <Typography color='#1976d2' fontFamily={'cursive'} fontWeight='bold' fontSize={'35px'}>Our Brands</Typography>
                <Box component={'a'} href='https://instagram.com' target={'_blank'} paddingTop='15px'>
                  <Instagram sx={{ fontSize: '70px', textDecoration: 'none', transition: 'all 0.4s ease', color: '#9e9e9e', '&:hover': { color: '#616161' } }}
                  />
                </Box>
                <Box component={'a'} href='https://twitter.com' target={'_blank'}>
                  <Twitter sx={{ fontSize: '70px', textDecoration: 'none', transition: 'all 0.4s ease', color: '#9e9e9e', '&:hover': { color: '#616161' } }}
                  />
                </Box>
                <Box component={'a'} href='https://youtube.com' target={'_blank'}>
                  <YouTube sx={{ fontSize: '70px', textDecoration: 'none', transition: 'all 0.4s ease', color: '#9e9e9e', '&:hover': { color: '#616161' } }}
                  />
                </Box>

              </Box>
            </Box>
          </Box>

        </FormContainerAbout>

      </StyledBoxAbout>
      </StyledContainer>

    </>
  )
}

export default About
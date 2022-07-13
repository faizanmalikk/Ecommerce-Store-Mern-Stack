
import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { MouseOutlined } from '@mui/icons-material';
import { Banner, StyledButton, HomeHeading, StyledBox } from './style';
import MetaData from '../Layout/MetaData'
import { useGetAllProductsQuery } from '../../services/productsApi';
import Loader from '../Layout/loader/Loader';
import Alertshai from '../Layout/Alerts/Alertshai';
import ProductCard from './ProductCard';

const Home = () => {
  const Page = 1
   
  const { data, isFetching, error } = useGetAllProductsQuery(Page)

useEffect(() => {
  window.scrollTo(0, 0)
}, [])


  return (
    <>


      {error && <Alertshai severity={'error'} text={error.data.message} />}
     {isFetching ? <Loader/> : (
            <Box >

            <MetaData title='ECOMMERCE' />
    
            <Banner className='banner'>
    
              <Typography sx={{ fontSize: { xs: '14px', sm: '17px' }, paddingBottom: { xs: '20px', sm: '32px' } }}>Welcome to Ecommerce</Typography>
    
              <Typography paddingBottom={3} fontWeight={'bold'}
                sx={{ fontSize: { xs: '17px', sm: '28px' } }}
              >Find Amazing Products Below
              </Typography>
    
              <StyledButton href='#container' variant="outlined" endIcon={<MouseOutlined />} >
                Scroll
              </StyledButton>
            </Banner>
          
    
            <Box marginTop={3} display='flex' justifyContent={'center'} id={'container'}>
              <HomeHeading>Featured Products</HomeHeading>
            </Box>
    
            
                
              <StyledBox >
             
                {data && data.product.map((product, i) => {
                  return <Box key={i}width={{xs:'95%',sm:'14em',md:'13em'}} display={i>7 && 'none'}>
                    <ProductCard product={product} />
                  </Box>
                })}
              </StyledBox>
           
          </Box>

     )}



    </>
  )
}

export default Home
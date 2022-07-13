import { Box, Card, CardContent, CardActionArea, Rating, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'



const ProductCard = ({ product }) => {
  const [value, setValue] = useState(product.ratings);
  return (

    <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ '&:hover': { transform: 'translateY(-1vmax)', transition: 'all 0.5s' } }}  >
        <CardActionArea>
          <Box

            component='img'
            src={product.images[0].url}
            sx={{ height: { xs: '440px', sm: '370px' } }}
            width='100%'
            alt={product.name}
          ></Box>
          <CardContent>
            <Typography component={'p'} paddingLeft={'3px'}>
              {product.name.length > 18
                ? `${product.name.substring(0, 18)}...`
                : product.name}
            </Typography>

            <Box display={'flex'} flexDirection='row' alignItems='center'>
              <Box >
                <Rating name="read-only" size='small' value={value} precision={0.5} readOnly />
              </Box>
              <Box component={'span'} paddingLeft={1}>
                <Typography fontSize={'14px'}>   ({product.reviews.length} reviews) </Typography>
              </Box>
            </Box>

            <Box component={'span'} >
              <Typography paddingLeft={'3px'} color='orange' fontWeight={'bold'} paddingTop={'5px'} fontSize='19px'>   ${product.price} </Typography>
            </Box>

          </CardContent>
        </CardActionArea>
      </Card>
    </Link>

  )
}

export default ProductCard
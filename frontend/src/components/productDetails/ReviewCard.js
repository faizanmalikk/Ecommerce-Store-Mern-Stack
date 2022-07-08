import { Card, CardContent, Box, Rating, Typography, Avatar } from '@mui/material'

import React from 'react'
import { useUserDetailsQuery } from '../../services/userApi'
import { StyledCard } from './style'


const ReviewCard = ({review}) => {

  const { data , isFetching} = useUserDetailsQuery(review.user)



  return (
    <>
    {data && <StyledCard>
        <Box component='img' src={data.user.avatar.url} width='90px' height={'90px'} margin={'0 auto'} borderRadius='100%'></Box>
       
        <CardContent >
            <Typography textAlign={'center'} fontWeight='400'>{review.name}</Typography>
            <Rating name="read-only" value={review.rating} precision={0.5} readOnly sx={{display:'flex',justifyContent:'center',fontSize:'29px'}}/>
           <Typography textAlign={'center'} color='rgba(0, 0, 0, 0.478)' sx={{fontSize:{xs:'16px',sm:'18px',md:'20px'}}}>{review.comment === "undefined" ? '' : review.comment}</Typography>
        </CardContent>
       
    </StyledCard> }
    </>
  )
}

export default ReviewCard
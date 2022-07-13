import React from 'react'
import { Container ,Box, Typography } from '@mui/material'
import MetaData from '../../Layout/MetaData'
import {Link, useParams} from 'react-router-dom'
import Loader from '../../Layout/loader/Loader'
import { useOrderDetailsQuery } from '../../../services/productsApi'

const OrderDetails = () => {

    const {id} = useParams()
    const {data , isFetching} = useOrderDetailsQuery(id)



  return (
    <>

{ isFetching ? <Loader/> :(

   <Container maxWidth='xl'>
        <MetaData title={'Order Details'}/>
        <Box marginTop='2em' marginBottom={'1em'}>
        <Typography fontSize={{sx:'28px',sm:'35px'}} color='#757575' fontFamily='Roboto' textAlign={{xs:'center',sm:'justify'}} maxWidth='100%' textOverflow='ellipsis' whiteSpace={'nowrap'} overflow={'hidden'}>Order # {data.order._id}</Typography>  
           </Box>
        <Box>
          <Typography fontSize={'35px'} fontFamily='Roboto' textAlign={{xs:'center',sm:'justify'}}>Shipping Info</Typography>
       <Box display='flex' flexDirection={'column'} justifyContent='center' gap={{xs:'0.7em',md:'1em'}} paddingLeft={{xs:'0',sm:'2em'}} paddingTop='0.7em'>
          <Box display={'flex'} gap={{xs:'0.3em',md:'1em'}} flexDirection={{xs:'column',sm:'row'}} textAlign={{xs:'center',sm:'unset'}}>
            <Typography>Name:</Typography>
            <Typography color='#757575' fontFamily={'Roboto'}> {data.order.user && data.order.user.name}</Typography>
          </Box>
          <Box display={'flex'} flexDirection={{xs:'column',sm:'row'}} gap={{xs:'0.3em',md:'1em'}} textAlign={{xs:'center',sm:'unset'}}>
            <Typography>Phone:</Typography>
            <Typography color='#757575' fontFamily={'Roboto'}> {data.order.shippingInfo && data.order.shippingInfo.phoneno}</Typography>
          </Box>
          <Box display={'flex'} flexDirection={{xs:'column',sm:'row'}}   gap={{xs:'0.3em',md:'1em'}} textAlign={{xs:'center',sm:'unset'}} >
            <Typography>Address:</Typography>
            <Typography color='#757575' fontFamily={'Roboto'} maxWidth='100%' textOverflow='ellipsis' whiteSpace={'nowrap'} overflow={'hidden'}>
           { data.order.shippingInfo && ` ${data.order.shippingInfo.address},${data.order.shippingInfo.city},${data.order.shippingInfo.state},${data.order.shippingInfo.pincode},${data.order.shippingInfo.country}`}
            </Typography>
          </Box>
        </Box>
        </Box>
        <Box paddingTop='1.3em'>
          <Typography fontSize={'35px'} fontFamily='Roboto' textAlign={{xs:'center',sm:'justify'}}>Payment</Typography>
       <Box display='flex' flexDirection={'column'} justifyContent='center' gap={{xs:'0.7em',md:'1em'}} paddingLeft={{xs:'0',sm:'2em'}} paddingTop='0.7em'>
          <Box   textAlign={{xs:'center',sm:'unset'}}>
            <Typography color={`${data.order.paymentInfo && data.order.paymentInfo.status === 'succeeded' ? 'green' : 'red'}`} fontFamily={'Roboto'}> 
            {`${data.order.paymentInfo && data.order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOTPAID'}`}
            </Typography>
          </Box>
          <Box display={'flex'} flexDirection={{xs:'column',sm:'row'}} gap={{xs:'0.3em',md:'1em'}} textAlign={{xs:'center',sm:'unset'}}>
            <Typography>Amount</Typography>
            <Typography color='#757575' fontFamily={'Roboto'}> ${data.order.totalPrice && data.order.totalPrice}</Typography>
          </Box>
        
        </Box>
        </Box>

        <Box paddingTop='1.3em'>
        <Typography  fontSize={'35px'} fontFamily='Roboto' textAlign={{xs:'center',sm:'justify'}}>Order Status</Typography>
  <Typography textAlign={{xs:'center',sm:'justify'}} textTransform='uppercase' paddingLeft={{xs:'0',sm:'2em'}} paddingTop='0.7em' color = {`${data.order.orderStatus === 'delivered' ? 'green' : 'red'}`}>
    {data.order.orderStatus}
  </Typography>
        </Box>

        <Box  paddingTop='1.3em' paddingBottom={'3em'}>
        <Typography  fontSize={'35px'} fontFamily='Roboto' paddingBottom={'1.3em'} textAlign={{xs:'center',sm:'justify'}}>Order Items:</Typography>
            {data.order.orderItems && data.order.orderItems.map((item,i)=>(
               <Box paddingBottom={'10px'} key={i} display='flex' alignItems={'center'} justifyContent='space-between' width='100%'>
                <Box display={'flex'} alignItems={'center'} gap={{xs:'0.5em',sm:'1em'}}>
                <Box component={'img'} src={item.image} width={{xs:'50px',sm:'140px'}} height={{xs:'90px',sm:'180px'}}></Box>
               <Link to={`/product/${item.product}`} style={{textDecoration:'none',}}> <Typography fontFamily={'Roboto'} color='#757575' fontSize={{xs:'17px',sm:'22px'}} sx={{'&:hover':{color:'#424242'}}}>{item.name}</Typography> </Link>
                </Box>
                <Box  display='flex' paddingRight={{xs:'0',sm:'10px'}}>
                  <Typography fontFamily={'Roboto'} color='#757575' fontSize={{xs:'15px',sm:'22px'}} >{item.quantity} X ${item.price} </Typography>
                  <Typography fontFamily={'Roboto'} fontWeight='bold' fontSize={{xs:'15px',sm:'22px'}} >=${item.quantity * item.price}</Typography>
                  </Box>
               </Box>
            ))}
          </Box>






     

    </Container>)}
    </>
  )
}

export default OrderDetails
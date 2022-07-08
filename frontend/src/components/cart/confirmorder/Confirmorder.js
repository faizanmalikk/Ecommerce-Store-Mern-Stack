import React,{useContext} from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import MetaData from '../../Layout/MetaData'
import CheckoutSteps from '../shipping/checkoutsteps/CheckoutSteps'
import StatesContext from '../../../context/StatesContext'
import {Link,useNavigate} from 'react-router-dom'

const Confirmorder = () => {

    const context = useContext(StatesContext)
    const { shippingInfo ,userInfo,cartItem } = context
    const navigate = useNavigate()
  
    const subtotal = cartItem.reduce(
      (acc,item) => acc + item.quantity*item.productDetails.product.price,
      0
    )

    const shippingCharges = subtotal > 1000 ? 0 : 200
    const tax = subtotal*0.18

    const totalPrice = subtotal + shippingCharges + tax

    const address  = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.country}`
  
  const handleSubmit = ()=>{
   
    const data ={subtotal,shippingCharges,tax,totalPrice}

    sessionStorage.setItem('orderInfo',JSON.stringify(data))

    navigate('/process/payment')

  }
    return (
    <>
    <MetaData title={'Confirm Order'}/>
    <CheckoutSteps activeStep={1}/>
 {  userInfo &&
    <Container maxWidth='xl' >
        <Box display='flex' flexDirection={{xs:'column',sm:'column',md:'row'}} margin='3em 0' width='100%'>
        <Box flex={{xs:'0',sm:'0',md:'4'}} >
          <Typography fontSize={'35px'} fontFamily='cursive' textAlign={{xs:'center',md:'justify'}}>Shipping Info</Typography>
       <Box display='flex' flexDirection={'column'} justifyContent='center' gap={{xs:'0.7em',md:'1em'}} paddingLeft={{xs:'0',sm:'2em'}} paddingTop='1.5em'>
          <Box display={'flex'} gap={{xs:'0.3em',md:'1em'}} flexDirection={{xs:'column',sm:'row'}} textAlign={{xs:'center',sm:'unset'}}>
            <Typography>Name:</Typography>
            <Typography color='#757575' fontFamily={'cursive'}> {userInfo.user.name}</Typography>
          </Box>
          <Box display={'flex'} flexDirection={{xs:'column',sm:'row'}} gap={{xs:'0.3em',md:'1em'}} textAlign={{xs:'center',sm:'unset'}}>
            <Typography>Phone:</Typography>
            <Typography color='#757575' fontFamily={'cursive'}> {shippingInfo.phoneno}</Typography>
          </Box>
          <Box display={'flex'} flexDirection={{xs:'column',sm:'row'}} gap={{xs:'0.3em',md:'1em'}} textAlign={{xs:'center',sm:'unset'}} >
            <Typography>Address:</Typography>
            <Typography color='#757575' fontFamily={'cursive'} maxWidth='100%' textOverflow='ellipsis' whiteSpace={'nowrap'} overflow={'hidden'}>
       {address}
              </Typography>
          </Box>
          </Box>
          <Box>
          <Typography fontSize={'35px'} fontFamily='cursive' marginTop={'1.3em'} textAlign={{xs:'center',sm:'unset'}}>Your Cart Items:</Typography>
          <Box paddingLeft={{xs:'0',sm:'0.5em'}} paddingTop='1em' >
            {cartItem && cartItem.map((item,i)=>(
               <Box paddingBottom={'10px'} key={i} display='flex' alignItems={'center'} justifyContent='space-between' width='100%'>
                <Box display={'flex'} alignItems={'center'} gap={{xs:'0.5em',sm:'1em'}}>
                <Box component={'img'} src={item.productDetails.product.images[0].url} width={{xs:'50px',sm:'140px'}} height={{xs:'90px',sm:'180px'}}></Box>
               <Link to={`/product/${item.productDetails.product._id}`} style={{textDecoration:'none',}}> <Typography fontFamily={'cursive'} color='#757575' fontSize={{xs:'17px',sm:'22px'}} sx={{'&:hover':{color:'#424242'}}}>{item.productDetails.product.name}</Typography> </Link>
                </Box>
                <Box  display='flex' paddingRight={{xs:'0',sm:'10px'}}>
                  <Typography fontFamily={'cursive'} color='#757575' fontSize={{xs:'15px',sm:'22px'}} >{item.quantity} X ${item.productDetails.product.price} </Typography>
                  <Typography fontFamily={'cursive'} fontWeight='bold' fontSize={{xs:'15px',sm:'22px'}} >=${item.quantity * item.productDetails.product.price}</Typography>
                  </Box>
               </Box>
            ))}
          </Box>
          </Box>
        </Box>
        <Box flex={{xs:'0',sm:'0',md:'2'}}borderLeft={{xs:'none',sm:'none',md:'1px solid #e0e0e0'}} display='flex' flexDirection={'column'} alignItems='center' paddingTop={'2em'}>
         <Box borderBottom={'1px solid black'} width='80%' textAlign={'center'}>
           <Typography  fontSize={'35px'} paddingBottom='0.5em' fontFamily='cursive' borderBottom={'1px solid #757575'}>Order Summaray</Typography>
           </Box>
           <Box  width={{xs:'90%',sm:'80%'}} display={'flex'} flexDirection='column' gap='35px' paddingTop='20px'>
          <Box display='flex' justifyContent={'space-between'}>
            <Typography fontFamily={'cursive'} color='#424242'>Subtotal:</Typography>
            <Typography fontFamily={'cursive'} color='#757575'>${subtotal}</Typography>
          </Box>
          <Box display='flex' justifyContent={'space-between'}>
            <Typography fontFamily={'cursive'} color='#424242'>Shipping Carges:</Typography>
            <Typography fontFamily={'cursive'} color='#757575'>${shippingCharges}</Typography>
          </Box>
          <Box display='flex' justifyContent={'space-between'} paddingBottom='20px' borderBottom={'1px solid black'}>
            <Typography fontFamily={'cursive'} color='#424242'>GST:</Typography>
            <Typography fontFamily={'cursive'} color='#757575' >${tax}</Typography>
          </Box>
          <Box display='flex' justifyContent={'space-between'}>
            <Typography fontFamily={'cursive'} fontWeight='bold'>Total:</Typography>
            <Typography fontFamily={'cursive'} fontWeight='bold' color='#757575'>${totalPrice}</Typography>
          </Box>
          <Button variant='contained' onClick={handleSubmit}>Proceed to Payment</Button>
           </Box>
        </Box>
        </Box>
    </Container>
    }
    </>
  )
}

export default Confirmorder
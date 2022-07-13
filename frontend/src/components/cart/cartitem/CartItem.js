import React,{useContext,useEffect} from 'react'
import { Box, Typography } from '@mui/material'
import { StyledButtonCart, StyledInputCart } from './style'
import { useNavigate } from 'react-router-dom'
import StatesContext from '../../../context/StatesContext'

const CartItem = ({ item }) => {

  const navigate = useNavigate()
  const context = useContext(StatesContext)
  const { cartItem, setcartItem  } = context

  const increaseQuantity = () => {

    const newqty = item.quantity + 1

    if(item.stock <= item.quantity){
      return
    }

    setcartItem(existingItems => {
      const itemIndex = existingItems.findIndex((i) => i.productDetails.product._id === item.productDetails.product._id)
      return [
        ...existingItems.slice(0, itemIndex),
        {
          // spread all the other items in the object and update only the score
          ...existingItems[itemIndex],
          quantity: newqty,
        },
        ...existingItems.slice(itemIndex + 1),
      ]

    })

  }
  const decraseQuantity = () => {

    const newqty = item.quantity - 1

    if(1 >= item.quantity){
      return
    }

    setcartItem(existingItems => {
      const itemIndex = existingItems.findIndex((i) => i.productDetails.product._id === item.productDetails.product._id)
      return [
        ...existingItems.slice(0, itemIndex),
        {
          // spread all the other items in the object and update only the score
          ...existingItems[itemIndex],
          quantity: newqty,
        },
        ...existingItems.slice(itemIndex + 1),
      ]

    })

  }

  const deleteFromCart = ()=>{

    const newItems = cartItem.filter((items) => items.productDetails.product._id !== item.productDetails.product._id)
    setcartItem(newItems)
  }
   


  const handleNavigate = () => {
    navigate(`/product/${item.productDetails.product._id}`)
  }

  useEffect(() => {
 
   

    if(item.quantity > item.stock){
      setcartItem(existingItems => {
        const itemIndex = existingItems.findIndex((i) => i.productDetails.product._id === item.productDetails.product._id)
        return [
          ...existingItems.slice(0, itemIndex),
          {
            // spread all the other items in the object and update only the score
            ...existingItems[itemIndex],
            quantity: item.stock,
          },
          ...existingItems.slice(itemIndex + 1),
        ]
  
      })
  
    }

    if (cartItem.length) {
      localStorage.setItem("cartItems", JSON.stringify(cartItem));

  }
    
   
  }, [cartItem ])

  return (
    <>
      <Box display='flex' marginTop={'0.5em'} >
        <Box flex={{ xs: '2', sm: '4' }} paddingLeft={{ xs: '0.2em', sm: '0.5em' }}>
          <Box display='flex'>
            <Box><Box component={'img'} sx={{ cursor: 'pointer' }} onClick={handleNavigate} src={item.productDetails.product.images[0].url} width={{ xs: '50px', sm: '140px' }} height={{ xs: '80px', sm: '180px' }}></Box></Box>
            <Box paddingLeft={{ xs: '6px', sm: '16px' }} paddingTop='5px' fontSize={'10px'} >
              <Typography fontSize={{ xs: '15px', sm: '25px' }} color='#9e9e9e' fontFamily={'Roboto'}>{item.productDetails.product.name}</Typography>
              <Typography fontSize={{ xs: '15px', sm: '25px' }} color='#9e9e9e' fontFamily={'Roboto'}>Price: ${item.productDetails.product.price}</Typography>
              <Typography component={'button'} fontSize={{ xs: '15px', sm: '25px' }} border='none' backgroundColor='white' fontFamily={'Roboto'} color='#ef5350' sx={{ '&:hover': { cursor: 'pointer', color: '#c62828' } }} onClick={deleteFromCart} paddingLeft='0'>Remove</Typography>
            </Box>
          </Box>
        </Box>
        <Box flex='1' display='flex' justifyContent={'center'} alignItems='center'>
        <Box display={'flex'}>
            <StyledButtonCart component={'button'} fontWeight='bold' onClick={decraseQuantity}><Typography>-</Typography></StyledButtonCart>

            <StyledInputCart ><Typography color='#757575' fontFamily={'Roboto'}>{item.quantity}</Typography></StyledInputCart>
            <StyledButtonCart component={'button'} onClick={increaseQuantity}><Typography>+</Typography></StyledButtonCart>
          </Box>
        </Box>
        <Box flex='1' display='flex' justifyContent={'flex-end'} alignItems='center' >
          <Typography paddingRight={{ xs: '0.2em', sm: '0.7em' }} color='#9e9e9e' fontSize={{ xs: '15px', sm: '25px' }} fontFamily={'Roboto'}> ${item.productDetails.product.price * item.quantity}</Typography>

        </Box>
      </Box>
    </>
  )
}

export default CartItem
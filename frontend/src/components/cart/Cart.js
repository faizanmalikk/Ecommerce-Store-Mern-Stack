import React, { useContext, useEffect } from 'react'
import { Box, Button, Container, Typography } from '@mui/material'
import StatesContext from '../../context/StatesContext'
import CartItem from './cartitem/CartItem'
import { StyledCheckout } from './cartitem/style'
import { RemoveShoppingCart } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import { useGetAllProductsForCartQuery } from '../../services/productsApi'
import Loader from '../Layout/loader/Loader'

const Cart = () => {

    const context = useContext(StatesContext)
    const { cartItem, setcartItem } = context
    const navigate = useNavigate()
    const { data, isFetching } = useGetAllProductsForCartQuery()





    const checkout = () => {
        navigate("/login?redirect=shipping")
    }
    
    useEffect(() => {
        if (data) {
            data.products.forEach((items) => {

                
                const isItemExist = cartItem.find(
                    (i) => i.productDetails.product._id === items._id
                )
            

                if (isItemExist) {

                    if (items.stock === 0) {
                        setcartItem(cartItem.filter((item) => (item.productDetails.product._id != items._id)))
                    }
                    if (items.stock > 0) {
                        setcartItem(existingItems => {
                            const itemIndex = existingItems.findIndex((i) => i.productDetails.product._id === items._id)
                            return [
                                ...existingItems.slice(0, itemIndex),
                                {
                                    // spread all the other items in the object and update only the score
                                    ...existingItems[itemIndex],
                                    stock: items.stock,
                                },
                                ...existingItems.slice(itemIndex + 1),
                            ]

                        })
                    }
                }

            })
        }

        if(cartItem.productDetails){
            cartItem.forEach((item)=>{
             if(item.quantity > item.stock){
              
              setcartItem(existingItems => {
                  const itemIndex = existingItems.findIndex((i) => i.productDetails.product._id === item._id)
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
          })
     }

   
    }, [data])

    useEffect(() => {

        if (cartItem.length === 0) {
            localStorage.setItem("cartItems", JSON.stringify(null));

        }
     
    }, [cartItem])




    return (
        <>
            <MetaData title={'Ecommerce - Cart'} />
            {isFetching ? <Loader /> : (
                <Box>
                    {cartItem.length === 0 ? (
                        <Box display={'flex'} flexDirection='column' alignItems={'center'} marginTop={{ xs: '50%', sm: '30%', md: '10%' }} textAlign={'center'}>

                            <RemoveShoppingCart sx={{ color: '#42a5f5', fontSize: '70px', marginBottom: '10px' }} />
                            <Typography color='#9e9e9e' fontFamily={'Roboto'} fontSize='28px'>No Product in Your Cart</Typography>
                            <Button component={Link} to='/products' variant='contained' sx={{ marginTop: '20px' }}>View Products</Button>
                        </Box>
                    ) : (
                        <Container sx={{ minHeight: '90vh', marginTop: '1.5em' }}>

                            <Box backgroundColor='#42a5f5' display={'flex'} padding={{ xs: '10px  0.3em', sm: '10px 0.7em' }}>
                                <Box sx={{ flex: { xs: '2', sm: '4' } }}><Typography color='white' fontSize={{ xs: '15px', sm: '26px' }}>Product</Typography></Box>
                                <Box flex={'1'} display='flex' justifyContent='center'><Typography color='white' fontSize={{ xs: '15px', sm: '26px' }}>Quantity</Typography></Box>
                                <Box flex={'1'} display='flex' justifyContent='flex-end'><Typography color='white' fontSize={{ xs: '15px', sm: '26px' }}>Subtotal</Typography></Box>
                            </Box>
                            <Box marginBottom='3em'  >

                                {cartItem.map((item, i) => (

                                    <CartItem item={item} key={i} />
                                ))}

                            </Box>
                            <Box display='flex' paddingRight={{ xs: '0', sm: '0.7em' }}>
                                <Box flex={{ xs: '0', sm: '3', md: '4' }}></Box>
                                <Box  flex='2' marginBottom='3em' borderTop = '5px solid #42a5f5'>
                                    <Box display='flex' justifyContent={'space-between'} marginTop='1em'>
                                        <Typography color='#9e9e9e' fontFamily={'Roboto'}>Gross Total</Typography>
                                        <Typography color='#9e9e9e' fontFamily={'Roboto'}>{`$${cartItem.reduce(
                                            (acc, item) => acc + item.quantity * item.productDetails.product.price,
                                            0
                                        )}`}</Typography>
                                    </Box>
                                    <Box display='flex' justifyContent={{ xs: 'center', sm: 'flex-end' }} marginTop='2em'>  <StyledCheckout variant="contained" onClick={checkout}>Check Out</StyledCheckout> </Box>
                                </Box>
                            </Box>
                        </Container>
                    )}
                </Box>
            )}
        </>
    )
}

export default Cart
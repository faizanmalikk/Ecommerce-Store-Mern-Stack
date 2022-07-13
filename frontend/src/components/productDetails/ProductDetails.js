import React, { useState, useEffect, useContext } from 'react'
import { useCreateReviewsMutation, useGetProductDetailQuery } from '../../services/productsApi'
import { useParams } from 'react-router-dom'
import { Box, Container, Typography, Stack, Rating, useMediaQuery, Dialog, DialogTitle, TextareaAutosize, DialogContent, DialogActions, Button } from '@mui/material'
import ImageSrcollbar from './ImageSrcollbar'
import { CartButton, ReviewHeading, StyledButton, StyledInput, StyledRatings, StyledReviewText, StyledStatus, SubmitReview } from './style'
import ReviewCard from './ReviewCard'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";



// import required modules
import { Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Loader from '../Layout/loader/Loader'
import Alertshai from '../Layout/Alerts/Alertshai'
import MetaData from '../Layout/MetaData'
import StatesContext from '../../context/StatesContext'




const ProductDetails = () => {

  const issmallerThan900 = useMediaQuery('(max-width: 899px)')
  const { id } = useParams()
  const { data: productDetails, isFetching: detailLoading, error , refetch } = useGetProductDetailQuery(id)
  const [sendReview, responseInfo] = useCreateReviewsMutation()
  const context = useContext(StatesContext)
  const { cartItem, setcartItem,cartpage, setcartpage } = context
  const [quantity, setquantity] = useState(1)
  const [addedtocard, setaddedtocard] = useState(false)
  const [open, setopen] = useState(false)
  const [ratings, setratings] = useState(0)
  const [comment, setcomment] = useState()

  const increaseQuantity = () => {
    if (quantity >= productDetails.product.stock) return
    setquantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setquantity(quantity - 1)
  }

  const cartControl = () => {

    const isItemExist = cartItem.find(
      (i) => i.productDetails.product._id === productDetails.product._id
    )

    if (isItemExist) {

      setcartItem(existingItems => {
        const itemIndex = existingItems.findIndex((i) => i.productDetails.product._id === productDetails.product._id)
        return [
          ...existingItems.slice(0, itemIndex),
          {
            // spread all the other items in the object and update only the score
            ...existingItems[itemIndex],
            quantity: quantity,
            stock : productDetails.product.stock
          },
          ...existingItems.slice(itemIndex + 1),
        ]

      })

      setaddedtocard(true)


    }

    else {

      setcartItem(cartItem.concat({ productDetails, quantity }))
      setaddedtocard(true)


    }

  }

  const submitReviewToggle = ()=>{
    open ? setopen(false) : setopen(true)
  }

  const reviewSubmitHandler = ()=>{

    const review = new FormData()
     
    review.set('rating',ratings)
    review.set('comment',comment)
    review.set('productId',id)

    sendReview(review)
    setopen(false)
  }


  useEffect(() => {
   
    if (cartItem.length) {

      localStorage.setItem("cartItems", JSON.stringify(cartItem));
    }

  }, [cartItem   ])

  useEffect(() => {
 
    window.scrollTo(0, 0)
  }, [])

useEffect(() => {
 if(cartpage === true) refetch()
}, [cartpage])


  return (

    <>
     { responseInfo.error && <Alertshai severity={'error'} text={responseInfo.error.data.message} />}
     { responseInfo.status === 'fulfilled' && <Alertshai severity={'success'} text={'Review Submitted Successfully'} />}

      {error && <Alertshai severity={'error'} text={error.data.message} />}
      {detailLoading ? (
        <Loader />
      ) : (
        <Container fixed sx={{ marginTop: { xs: '-2em', sm: '0' } }}>
          <MetaData title={`${productDetails.product.name} -- ECOMMERCE`} />
          <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} overflow='hidden' margin={'80px 0'}>

            {productDetails.product.images && <Box flex={1} overflow='hidden' >
              <Box width={{ xs: '100%', sm: '90%', md: '70%' }} margin={'0 auto'}>
                <ImageSrcollbar productDetails={productDetails} />
              </Box>
            </Box>}

            <Box flex={1.3} >
              <Stack direction={'column'} display='flex' spacing={2} padding={'0 10px'}>
                <Box >
                  <Box textAlign={issmallerThan900 && 'center'}>
                    <Typography fontWeight={'550'} >{productDetails.product.name}</Typography>
                    <Typography color='rgba(0, 0, 0, 0.678)' fontSize={'15px'}>Product # {id}</Typography>
                  </Box>
                  <StyledRatings  >
                    <Rating precision={0.5} name="read-only" size={'small'} value={productDetails.product.ratings} readOnly  />
                    <Typography fontSize={'17px'}>(reviews {productDetails.product.reviews.length})</Typography>
                  </StyledRatings>
                </Box>
                <Box>
                  <Typography fontWeight={'bold'} textAlign={issmallerThan900 && 'center'} variant={'h6'}>  ${productDetails.product.price}</Typography>
                </Box>
                <Box display={'flex'} flexDirection={issmallerThan900 ? 'column' : 'row'} j>
                <Box display={'flex'} justifyContent={issmallerThan900 && 'center'}>
                    <StyledButton component={'button'} fontWeight='bold' onClick={decreaseQuantity}><Typography>-</Typography></StyledButton>

                    <StyledInput><Typography>{quantity}</Typography></StyledInput>
                    <StyledButton component={'button'} onClick={increaseQuantity}><Typography>+</Typography></StyledButton>
                  </Box>
                  <CartButton onClick={cartControl} onMouseOut={() => setaddedtocard(false)} disabled={productDetails.product.stock < 1 ? true : false}>Add to Cart</CartButton>
                  {addedtocard && <Alertshai severity={'success'} text={'Item Added To Cart'} />}
                </Box>
                <Box>
                  <StyledStatus color={productDetails.product.stock < 1 ? 'red' : 'green'}>Status : {productDetails.product.stock < 1 ? 'OutOfStock' : 'InStock'}</StyledStatus>
                </Box>
                <Box textAlign={issmallerThan900 && 'center'}>
                  <Typography>Description:</Typography>
                  <Typography component={'p'} color='rgba(0, 0, 0, 0.578)' fontSize={'20px'}>{productDetails.product.description}</Typography>
                </Box>

                <Box display={issmallerThan900 && 'flex'} justifyContent={issmallerThan900 && 'center'}>
                  <SubmitReview onClick={submitReviewToggle}>Submit Review</SubmitReview>
                </Box>

              </Stack>
            </Box>

          </Stack>
          <Dialog aria-labelledby='simple-dialog-title'
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle textAlign={'center'} fontFamily='cursive'>Submit Review</DialogTitle>
            <DialogContent sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <Rating
              value={ratings}
              onChange={(e) => setratings(e.target.value)}
              size='large'
              precision={0.5}
            />
            <StyledReviewText
              aria-label="minimum height"
              minRows={5}
              minColumn={30}
              placeholder="Comment Here..."
              value={comment}
              
              onChange={(e)=>setcomment(e.target.value)}
              
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
              <Button onClick={reviewSubmitHandler} color='primary'>submit</Button>
            </DialogActions>

          </Dialog>
          {productDetails.product.reviews && productDetails.product.reviews[0] ? (
            <>
              <ReviewHeading>Reviews</ReviewHeading>
              <Box margin={'4em auto'} sx={{ width: { xs: '100%', sm: '90%', md: '70%' } }} >
                <Swiper
                  pagination={{
                    dynamicBullets: true,
                    clickable: true
                  }}
                  modules={[Pagination, Autoplay]}

                  autoplay={true}
                  speed={1000}
                  spaceBetween={40}

                  style={{ paddingBottom: '30px' }}

                >
                  {productDetails.product.reviews.map((review, i) => {
                    return (

                      <SwiperSlide key={i}><ReviewCard review={review} /></SwiperSlide>
                    )
                  })}
                </Swiper>
              </Box> </>
          ) : (
            <ReviewHeading sx={{ marginBottom: '2em' }}>No reviews Yet</ReviewHeading>
          )}

        </Container>
      )}
    </>

  )
}

export default ProductDetails
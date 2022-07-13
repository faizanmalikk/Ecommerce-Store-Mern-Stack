import { useContext, useRef, useState, useEffect } from 'react';
import { CreditCard, Event, VpnKey } from '@mui/icons-material'
import { Box, Button, CircularProgress } from '@mui/material'
import MetaData from '../../Layout/MetaData'
import { FormContainerpayment, FormHeadingpayment, StyledBoxpayment } from './style'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutSteps from '../shipping/checkoutsteps/CheckoutSteps';
import StatesContext from '../../../context/StatesContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Alertshai from '../../Layout/Alerts/Alertshai';
import { useCreateOrderMutation } from '../../../services/productsApi';


const Payment = () => {

  const context = useContext(StatesContext)
  const { orderInfo, shippingInfo, cartItem, userInfo, setorderInfo  } = context

  const [newOrder, responseInfo] = useCreateOrderMutation()
  const [error, seterror] = useState()
  const [loading, setloading] = useState(false)


  const stripe = useStripe()
  const elements = useElements()

  const navigate = useNavigate()



  const paymentSubmit = async (e) => {

    e.preventDefault()


    setloading(true)

    const paymentData = {
      amount: Math.round(orderInfo.totalPrice * 100)
    }

    const order = {

      shippingInfo,

      orderItems: cartItem.map((item) => (

        {
          name: item.productDetails.product.name,
          price: item.productDetails.product.price,
          quantity: item.quantity,
          image: item.productDetails.product.images[0].url,
          product: item.productDetails.product._id
        }
      )),

     
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice

    }

    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
        }


      }

      const { data } = await axios.post(
        'https://ecomercestore01.herokuapp.com/api/payment/process',
        paymentData,
        config

      )

      const client_secret = data.client_secret

      if (!stripe || !elements) return

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: userInfo.user.name,
            email: userInfo.user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pincode,
              country: shippingInfo.countrycode
            }
          }
        }
      })

      if (result.error) {
        setloading(false)
        seterror(result.error.message)
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setloading(false)
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status
          }
          newOrder(order)
          navigate('/success')
   
        } else {
          seterror('There is some issue while processing payment')
        }
      }

    } catch (error) {
      setloading(false)
      seterror(error.response.data.message)

    }

  }

  useEffect(() => {
    const retriveOrderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (retriveOrderInfo) setorderInfo(retriveOrderInfo)
  }, [orderInfo])

  return (
    <>
      {orderInfo && cartItem && (
        <>
          {responseInfo.error && <Alertshai severity={'error'} text={responseInfo.error.data.message} />}

          {error && <Alertshai severity={'error'} text={error} />}
          <MetaData title={'Payment'} />

          <CheckoutSteps activeStep={2} />
          <StyledBoxpayment>
            <FormContainerpayment>
              <FormHeadingpayment>Card Info</FormHeadingpayment>
              <Box component={'form'} onSubmit={paymentSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                <Box display={'flex'} alignItems='center' border={'1px solid #bdbdbd'} >
                  <Box padding><CreditCard /> </Box>
                  <Box width={'100%'} paddingLeft='0.6em'>    <CardNumberElement />  </Box>
                </Box>
                <Box display={'flex'} alignItems='center' border={'1px solid #bdbdbd'} >
                  <Box padding><Event /> </Box>
                  <Box width={'100%'} paddingLeft='0.6em'>    <CardExpiryElement />  </Box>
                </Box>
                <Box display={'flex'} alignItems='center' border={'1px solid #bdbdbd'} >
                  <Box padding><VpnKey /> </Box>
                  <Box width={'100%'} paddingLeft='0.6em'>    <CardCvcElement />  </Box>
                </Box>


                {loading ? (
                  <Button variant="contained" sx={{ marginTop: '20px', width: '100%' }}> <CircularProgress sx={{ color: 'white' }} /></Button>

                ) : (

                  <Button variant="contained" type='submit' sx={{ marginTop: '20px', width: '100%' }}> {` Pay - $${orderInfo && orderInfo.totalPrice} `}</Button>
                )}

              </Box>
            </FormContainerpayment>
          </StyledBoxpayment>  </>)}
    </>
  )
}

export default Payment
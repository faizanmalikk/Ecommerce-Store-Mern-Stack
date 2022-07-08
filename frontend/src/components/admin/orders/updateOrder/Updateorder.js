import React, { useContext, useEffect, useState } from 'react'
import StatesContext from '../../../../context/StatesContext'
import { Box, Button, CircularProgress,  FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import MetaData from '../../../Layout/MetaData'
import Loader from '../../../Layout/loader/Loader'
import Sidebar from '../../sidebar/Sidebar'
import Alertshai from '../../../Layout/Alerts/Alertshai'
import { useOrderDetailsQuery, useUpdateOrdersMutation } from '../../../../services/productsApi'

const Updateorder = () => {

    const { id } = useParams()
    const context = useContext(StatesContext)
    const { setupdateOrderPage , setIsorderShipped } = context
    const [status, setstatus] = useState('')

    const { data, isFetching } = useOrderDetailsQuery(id)
    const [updateOrder, response] = useUpdateOrdersMutation()
  


    const handleSubmit = (e) => {

        e.preventDefault()

        const myForm = new FormData()
        myForm.set('status', status)

        updateOrder({ id, myForm })

    }

    useEffect(() => {
        setupdateOrderPage(id)
if(response.status === 'fulfilled'){
    setIsorderShipped(true)
} 


    }, [response])

    return (
        <>
            <MetaData title={'Process Order'} />
            {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
            {response.status === 'fulfilled' && <Alertshai severity={'success'} text={'Order Updated Successfully'} />}

            <Box>
                <Box >
                    <Sidebar />
                </Box>
                <Box maxWidth='100%' overflow={'hidden'} marginLeft={{ sm: '8.5em', md: '12em' }}>
                    {isFetching ? <Loader /> :
                        <Box width={{ xs: '90%', md: '98%' }} margin='0 auto'>
                            <Box display='flex' flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} margin='3em 0' width='100%'>
                                <Box width={{ md: `${data.order.orderStatus === 'delivered' ? '90%' : '60%'}` }} margin={data.order.orderStatus === 'delivered' && '0 auto'}>
                                    <Typography fontSize={'35px'} fontFamily='cursive' textAlign={{ xs: 'center', md: 'justify' }}>Shipping Info</Typography>
                                    <Box display='flex' flexDirection={'column'} justifyContent='center' gap={{ xs: '0.7em', md: '1em' }} paddingLeft={{ xs: '0', sm: '2em' }} paddingTop='0.7em'>
                                        <Box display={'flex'} gap={{ xs: '0.3em', md: '1em' }} flexDirection={{ xs: 'column', sm: 'row' }} textAlign={{ xs: 'center', sm: 'unset' }}>
                                            <Typography>Name:</Typography>
                                            <Typography color='#757575' fontFamily={'cursive'}> {data.order.user.name}</Typography>
                                        </Box>
                                        <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: '0.3em', md: '1em' }} textAlign={{ xs: 'center', sm: 'unset' }}>
                                            <Typography>Phone:</Typography>
                                            <Typography color='#757575' fontFamily={'cursive'}> {data.order.shippingInfo.phoneno}</Typography>
                                        </Box>
                                        <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: '0.3em', md: '1em' }} textAlign={{ xs: 'center', sm: 'unset' }} >
                                            <Typography>Address:</Typography>
                                            <Typography color='#757575' fontFamily={'cursive'} maxWidth='100%' textOverflow='ellipsis' whiteSpace={'nowrap'} overflow={'hidden'}>
                                                {data.order.shippingInfo.address},{data.order.shippingInfo.city},{data.order.shippingInfo.state},{data.order.shippingInfo.country}

                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box paddingTop='1.3em'>
                                        <Typography fontSize={'35px'} fontFamily='cursive' textAlign={{ xs: 'center', sm: 'justify' }}>Payment</Typography>
                                        <Box display='flex' flexDirection={'column'} justifyContent='center' gap={{ xs: '0.7em', md: '1em' }} paddingLeft={{ xs: '0', sm: '2em' }} paddingTop='0.7em'>
                                            <Box textAlign={{ xs: 'center', sm: 'unset' }}>
                                                <Typography color={`${data.order.paymentInfo && data.order.paymentInfo.status === 'succeeded' ? 'green' : 'red'}`} fontFamily={'cursive'}>
                                                    {`${data.order.paymentInfo && data.order.paymentInfo.status === 'succeeded' ? 'PAID' : 'NOTPAID'}`}
                                                </Typography>
                                            </Box>
                                            <Box display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: '0.3em', md: '1em' }} textAlign={{ xs: 'center', sm: 'unset' }}>
                                                <Typography>Amount</Typography>
                                                <Typography color='#757575' fontFamily={'cursive'}> ${data.order.totalPrice && data.order.totalPrice}</Typography>
                                            </Box>

                                        </Box>
                                    </Box>

                                    <Box paddingTop='1.3em'>
                                        <Typography fontSize={'35px'} fontFamily='cursive' textAlign={{ xs: 'center', sm: 'justify' }}>Order Status</Typography>
                                        <Typography textAlign={{ xs: 'center', sm: 'justify' }} textTransform='uppercase' paddingLeft={{ xs: '0', sm: '2em' }} paddingTop='0.7em' color={`${data.order.orderStatus === 'delivered' ? 'green' : 'red'}`}>
                                            {data.order.orderStatus}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography fontSize={'35px'} fontFamily='cursive' marginTop={'0.7em'} textAlign={{ xs: 'center', sm: 'unset' }}>Order Items:</Typography>
                                        <Box paddingLeft={{ xs: '0', sm: '0.5em' }} paddingTop='1em' >
                                            {data.order.orderItems && data.order.orderItems.map((item, i) => (
                                                <Box paddingBottom={'10px'} key={i} display='flex' alignItems={'center'} justifyContent='space-between' width='100%'>
                                                    <Box display={'flex'} alignItems={'center'} gap={{ xs: '0.5em', sm: '1em' }}>
                                                        <Box component={'img'} src={item.image} width={{ xs: '50px', sm: '70px', md: '90px' }} height={{ xs: '90px', sm: '110px', md: '130px' }}></Box>
                                                        <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', }}> <Typography fontFamily={'cursive'} color='#757575' fontSize={{ xs: '17px', sm: '22px' }} sx={{ '&:hover': { color: '#424242' } }}>{item.name}</Typography> </Link>
                                                    </Box>
                                                    <Box display='flex' paddingRight={{ xs: '0', sm: '10px' }}>
                                                        <Typography fontFamily={'cursive'} color='#757575' fontSize={{ xs: '15px', sm: '22px' }} >{item.quantity} X ${item.price} </Typography>
                                                        <Typography fontFamily={'cursive'} fontWeight='bold' fontSize={{ xs: '15px', sm: '22px' }} >=${item.quantity * item.price}</Typography>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Box>
                               
                                    <Box width={{ md: '40%' }} borderLeft={{ xs: 'none', sm: 'none', md: '1px solid #e0e0e0' }}
                                        display={data.order.orderStatus === 'delivered' ? 'none' : 'flex'} flexDirection={'column'} alignItems='center' paddingTop={{ xs: '1em', md: '4em' }}>
                                        <Box borderBottom={'1px solid black'} width='80%' textAlign={'center'}>
                                            <Typography fontSize={'35px'} paddingBottom='0.5em' fontFamily='cursive' borderBottom={'1px solid #757575'}>Process Order</Typography>
                                        </Box>

                                        <Box width={{ xs: '90%', sm: '100%' }} display={'flex'} flexDirection='column' gap='35px' paddingTop='20px'>
                                            <Box component={'form'} onSubmit={handleSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Choose Category</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        required
                                                        name='category'
                                                        label="Choose Category"
                                                        onChange={(e) => setstatus(e.target.value)}
                                                    >

                                                        {data.order.orderStatus === 'processing' && (
                                                            <MenuItem value={'shipped'}>shipped</MenuItem>
                                                        )}
                                                        {data.order.orderStatus === 'shipped' && (
                                                            <MenuItem value={'delivered'}>delivered</MenuItem>
                                                        )}






                                                    </Select>
                                                </FormControl>
                                                <Button variant='contained' type='submit' disabled={status === '' ? true : false}>
                                                    {response.isLoading ? <CircularProgress sx={{ color: 'white' }} /> : 'Process'}
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Box>
                               
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </>
    )
}

export default Updateorder
import React from 'react'
import { Box, Typography } from '@mui/material'
import MetaData from '../../Layout/MetaData'
import Sidebar from '../sidebar/Sidebar'
import { Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import Loader from '../../Layout/loader/Loader'
import { useAllOrdersQuery, useGetAdminProductsQuery } from '../../../services/productsApi'
import { Link } from 'react-router-dom'
import { useAllUserDetailsQuery } from '../../../services/userApi'



const Dashboard = () => {

  const { data, isFetching } = useGetAdminProductsQuery()
  const {data:orders , isFetching:orderFetching} = useAllOrdersQuery()
  const { data:users, isFetching:userFetching } = useAllUserDetailsQuery()

 

  let outOfStock = 0
  data && data.products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1
    }
  })

  let totalAmount = 0
  orders &&  orders.orders.length && orders.orders.forEach((item)=>[
    totalAmount += item.totalPrice
  ])
 

  const linestate = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'Total Amount',
        backgroundColor: ['#1976d2'],
        hoverBackgroundColor: ['#1565c0'],
        data: [0, totalAmount]
      }
    ]
  }
  let doughnutstate ={}
  if(data){
    doughnutstate = {
    labels: ['Out Of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, data.products.length - outOfStock]
      }
    ]
  }
}

  return (
    <>
      <MetaData title={'Dashboard - Admin Panel'} />
      <Box >
        <Box >
          <Sidebar />
        </Box>
        <Box maxWidth='100%' marginLeft={{ sm: '8.5em', md: '12em' }}>
        { isFetching || orderFetching || userFetching ? <Loader/> : <Box >
            <Typography textAlign={'center'}
              color='#1976d2'
              fontSize={'35px'}
              fontFamily='Roboto'
              fontWeight={'bold'}
              paddingTop='1.5em'
            >
              Dashboard
            </Typography>
            <Box backgroundColor='#1976d2'
              margin='0 1.5em'
              display='flex'
              flexDirection={'column'}
              alignItems='center'
              padding={'0.6em 0'}
              marginTop='20px'

            >
              <Typography color='white'>Total amount</Typography>
              <Typography color='white'>${totalAmount}</Typography>
            </Box>

         <Box display='flex' justifyContent={'center'} gap={{ xs: '0.5em', sm: '2em' }} margin='0 15px' marginTop='1.5em' flexWrap={'wrap'}>
           <Link to='/admin/products' style={{textDecoration : 'none'}}>  <Box backgroundColor='rgb(255, 110, 110)' height={{ xs: '6em', md: '9em' }} width={{ xs: '6em', md: '9em' }} borderRadius='100%' display={'flex'} flexDirection='column' justifyContent={'center'} alignItems='center' sx={{cursor:'pointer'}}>
                <Typography textAlign={'center'} color='white' fontSize={{ xs: '20px', md: '30px' }}>Products</Typography>
                <Typography textAlign={'center'} color='white' fontSize={{ xs: '20px', md: '30px' }}>{data.products.length}</Typography>
              </Box> </Link> 
              <Link to='/admin/orders' style={{textDecoration : 'none'}}>   <Box backgroundColor=' rgb(255, 233, 174)' height={{ xs: '6em', md: '9em' }} width={{ xs: '6em', md: '9em' }} borderRadius='100%' display={'flex'} flexDirection='column' justifyContent={'center'} alignItems='center'  sx={{cursor:'pointer'}}>
                <Typography textAlign={'center'} color='black' fontSize={{ xs: '20px', md: '30px' }}>Orders</Typography>
                <Typography textAlign={'center'} color='black' fontSize={{ xs: '20px', md: '30px' }}>{orders.orders.length}</Typography>
              </Box>  </Link> 
              <Link to='/admin/users' style={{textDecoration : 'none'}}>  <Box backgroundColor=' rgb(51, 51, 51)' height={{ xs: '6em', md: '9em' }} width={{ xs: '6em', md: '9em' }} borderRadius='100%' display={'flex'} flexDirection='column' justifyContent={'center'} alignItems='center'  sx={{cursor:'pointer'}}>
                <Typography textAlign={'center'} color='white' fontSize={{ xs: '20px', md: '30px' }}>Users</Typography>
                <Typography textAlign={'center'} color='white' fontSize={{ xs: '20px', md: '30px' }}>{users.users.length}</Typography>
              </Box>  </Link> 

            </Box>


            <Box width={{ xs: '90%', sm: '80%' }} margin='0 auto' marginTop={'1.6em'}>

              <Line data={linestate} />

            </Box>

            <Box width={{ xs: '80%', sm: '30vmax' }} margin='1.6em auto'>
              <Doughnut data={doughnutstate} />
            </Box>

          </Box>}
        </Box> 
      </Box>
    </>
  )
}

export default Dashboard
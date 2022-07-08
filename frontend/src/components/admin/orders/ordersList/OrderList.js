import React from 'react'
import { Box,Typography } from '@mui/material'
import MetaData from '../../../Layout/MetaData'
import Sidebar from '../../sidebar/Sidebar'
import Loader from '../../../Layout/loader/Loader'
import { OrdersContainer, StyledContainer } from './style'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Alertshai from '../../../Layout/Alerts/Alertshai'
import { useAllOrdersQuery, useDeleteOrdersMutation } from '../../../../services/productsApi'

const AllProducts = () => {

    const { data, isFetching } = useAllOrdersQuery()

const [DeleteOrder , response] = useDeleteOrdersMutation()
   
const DeleteOrderHandle = (id)=>{
    DeleteOrder(id)
}

 const column = [
    {
        field : 'id',
        headerName : 'Order Id',
        minWidth : 300,
        flex : 1
    },
    {
        field : 'status',
        headerName : 'Status',
        minWidth : 150,
        flex : 0.5,
        cellClassName: (params) => {
          return params.getValue(params.id, "status") === "delivered"
            ? "greenColor"
            : "redColor";
        }
    },
    {
        field : 'itemsQty',
        headerName : 'Items Qty',
        type : 'number',
        minWidth : 150,
        flex : 0.3

    },
    {
        field : 'amount',
        headerName : 'Amount',
        type : 'number',
        minWidth : 270,
        flex : 0.5
    },
    {
        field: "actions",
        flex: 0.3,
        headerName: "Actions",
        minWidth: 150,
        type: "number",
        sortable: false,
        renderCell: (params) => {
          return (
            <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Typography sx={{paddingLeft:'10px',cursor:'pointer'}}>
              <Delete onClick={ () => DeleteOrderHandle(params.getValue(params.id, "id"))}/>

            </Typography>
            </>
          );
        }
    }
  ]

  const row = []

  data && data.orders.forEach((item)=>(
    row.push({
        id : item._id,
        itemsQty : item.orderItems.length,
        amount : `$${item.totalPrice}`,
        status : item.orderStatus
    })
  ))

    return (
        <>
            <MetaData title='All Orders - Admin' />
      {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
      {response.status === 'fulfilled' && <Alertshai severity={'success'} text='Order Deleted Successfully' />}
  
            <Box>
                <Box>
                    <Sidebar />
                </Box>

                <Box maxWidth='100%' overflow={'hidden'} marginLeft={{ sm: '8.5em', md: '12em' }} minHeight='92vh' maxHeight={'auto'} >
                    {isFetching || response.isLoading ? <Loader /> : (
                        <Box  >
                            <Typography textAlign={'center'}
                                color='#1976d2'
                                fontSize={'35px'}
                                fontFamily='Roboto'
                                fontWeight={'bold'}
                                paddingTop='1.5em'
                            >
                                All Orders
                            </Typography>
                            <StyledContainer>

                                <OrdersContainer

                                    rows={row}
                                    columns={column}
                                    pageSize={7}
                                    disableSelectionOnClick
                                    autoHeight
                                />


                            </StyledContainer>

                        </Box>
                    )}
                </Box>

            </Box>
        </>
    )
}

export default AllProducts
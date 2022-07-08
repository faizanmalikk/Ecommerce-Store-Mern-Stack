import React, { useContext } from 'react'
import Loader from '../Layout/loader/Loader'
import StatesContext from '../../context/StatesContext'
import MetaData from '../Layout/MetaData'
import {Link} from 'react-router-dom'
import {Launch} from '@mui/icons-material'
import { StyledContainer, StyledHeading, StyledTable } from './styles'
import { useMyOrdersQuery } from '../../services/productsApi'

const MyOrders = () => {

    const context = useContext(StatesContext)
    const { userInfo } = context
    const {data , isFetching } = useMyOrdersQuery()

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
                <Link to={`/order/${params.getValue(params.id, "id")}`}>
                  <Launch />
                </Link>
              );
            }
        }
    ]

    const row = []

    data && data.orders.forEach((item) => {
     row.push({
            itemsQty : item.orderItems.length,
            id : item._id,
            status : item.orderStatus,
            amount : `$${item.totalPrice}`
        })
    });


  return (
    <>
    {isFetching ? <Loader/> : (
        <>
        <MetaData title={`${userInfo.user.name} - Orders`}/>
        <StyledContainer>
            
            <StyledTable

            rows={row}
            columns={column}
            pageSize={7}
            disableSelectionOnClick
            autoHeight
            
            
            
            
            />
           

           <StyledHeading>{`${userInfo.user.name} - Orders`}</StyledHeading>
        </StyledContainer>
        </>
    )}
    </>
  )
}

export default MyOrders
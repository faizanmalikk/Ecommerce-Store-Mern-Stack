import React, { useContext, useEffect } from 'react'
import { Box,  Typography } from '@mui/material'
import MetaData from '../../../Layout/MetaData'
import Sidebar from '../../sidebar/Sidebar'
import Loader from '../../../Layout/loader/Loader'
import { ProductsContainer, ProductsTable } from './style'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Alertshai from '../../../Layout/Alerts/Alertshai'
import { useDeleteProductMutation, useGetAdminProductsQuery } from '../../../../services/productsApi'
import StatesContext from '../../../../context/StatesContext'

const AllProducts = () => {

    const context = useContext(StatesContext)
    const { cartItem, setcartItem } = context

    const { data, isFetching } = useGetAdminProductsQuery()

const [DeleteProduct , response] = useDeleteProductMutation()
   
const DeleteProductHandle = (id)=>{
    DeleteProduct(id)
    setcartItem(cartItem.filter((item) => (item.productDetails.product._id != id)))

}

 const column = [
    {
        field : 'id',
        headerName : 'Product Id',
        minWidth : 200,
        flex : 0.5
    },
    {
        field : 'name',
        headerName : 'Name',
        minWidth : 350,
        flex : 1
    },
    {
        field : 'stock',
        headerName : 'Stock',
        type  :'number',
        minWidth : 150,
        flex : 0.3
    },
    {
        field : 'price',
        headerName : 'Price',
        type  :'number',
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Typography sx={{paddingLeft:'10px',cursor:'pointer'}}>
              <Delete onClick={ () => DeleteProductHandle(params.getValue(params.id, "id"))}/>

            </Typography>
            </>
          );
        }
    }
  ]

  const row = []

  data && data.products.forEach((item)=>(
    row.push({
        id : item._id,
        stock : item.stock,
        price : item.price,
        name : item.name
    })
  ))


  
    return (
        <>
            <MetaData title='All Products - Admin' />
      {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
      {response.status === 'fulfilled' && <Alertshai severity={'success'} text='Product Deleted Successfully' />}
  
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
                                All Products
                            </Typography>
                            <ProductsContainer>

                                <ProductsTable

                                    rows={row}
                                    columns={column}
                                    pageSize={7}
                                    disableSelectionOnClick
                                    autoHeight
                                />


                            </ProductsContainer>

                        </Box>
                    )}
                </Box>

            </Box>
        </>
    )
}

export default AllProducts
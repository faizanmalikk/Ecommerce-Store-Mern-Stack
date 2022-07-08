import React, {  useState } from 'react'
import { Box, Button, CircularProgress, InputAdornment, TextField, Typography } from '@mui/material'
import Sidebar from '../sidebar/Sidebar'
import Loader from '../../Layout/loader/Loader'
import { ReviewsContainer, StyledContainer } from './style'
import { Delete, Star } from '@mui/icons-material'
import {  useDeleteReviewMutation, useGetAllReviewsQuery } from '../../../services/productsApi'
import MetaData from '../../Layout/MetaData'
import Alertshai from '../../Layout/Alerts/Alertshai'
import { FormContainerreview } from './style'
import { ReviewHeading } from './style'

const AllProducts = () => {


    const [DeleteOrder, response] = useDeleteReviewMutation()

    const [idExits, setidExits] = useState('')


    const {data , isFetching } = useGetAllReviewsQuery(idExits)


    const [productId, setproductId] = useState('')

    const DeleteReviewHandle = (reviewId) => {
        DeleteOrder({reviewId , productId})
    }

   

    const column = [
        {
            field: 'id',
            headerName: 'Review Id',
            minWidth: 200,
            flex: 0.6
        },
        {
            field: 'user',
            headerName: 'User',
            minWidth: 200,
            flex: 0.6,

        },

        {
            field: 'comment',
            headerName: 'Comment',
            minWidth: 350,
            flex: 1
        },
        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,

            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "greenColor"
                    : "redColor";
            },
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
                        <Typography sx={{ paddingLeft: '10px', cursor: 'pointer' }}>
                            <Delete onClick={() => DeleteReviewHandle(params.getValue(params.id, "id"))} />

                        </Typography>
                    </>
                );
            }
        }
    ]

    const row = []

    data && data.reviews.length && data.reviews.forEach((item) => (
        row.push({
            id: item._id,
            rating: item.rating,
            comment: item.comment.length ? item.comment : 'None',
            user: item.name
        })
    ))

    const reviewSubmit = (e) => {
        e.preventDefault()
        setidExits(productId.replace(/\s+/, ""))
    }



   
 

    return (
        <>
            <MetaData title='All Reviews - Admin' />
            {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
            {response.status === 'fulfilled' && <Alertshai severity={'success'} text='Review Deleted Successfully' />} 


            
                <Box>
                    <Sidebar />
                </Box>

                <Box maxWidth='100%' overflow={'hidden'} marginLeft={{ sm: '8.5em', md: '12em' }} minHeight='92vh' maxHeight={'auto'} >
                    
                        <FormContainerreview>
                            <Typography textAlign={'center'}
                                color='#1976d2'
                                fontSize={'35px'}
                                fontFamily='Roboto'
                                fontWeight={'bold'}
                                paddingTop='1.5em'
                            >
                                All Reviews
                            </Typography>
                            <Box component={'form'} onSubmit={reviewSubmit} padding={{ xs: '2em 0.5em', sm: '2em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                                <TextField
                                    placeholder='Product Id'
                                  

                                    required
                                    onChange={(e) => setproductId(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Star />
                                            </InputAdornment>
                                        )
                                    }} />




                                <Button variant="contained" type='submit' sx={{ marginTop: '5px', width: '100%' }}>{isFetching ? <CircularProgress sx={{ color: 'white' }} /> : 'Search'}</Button>

                            </Box>
                        </FormContainerreview>
                 { response.isLoading ? <Loader/> :   <Box>
                    { data && data.reviews.length   ? (
                        <Box  >
                            <StyledContainer>

                                <ReviewsContainer

                                    rows={row}
                                    columns={column}
                                    pageSize={7}
                                    disableSelectionOnClick
                                    autoHeight
                                />


                            </StyledContainer>

                        </Box>
                    ) : (
                        <ReviewHeading>No Reviews Found</ReviewHeading>
                    )}
                    </Box>}
                </Box>

           
        </>
    )
}

export default AllProducts
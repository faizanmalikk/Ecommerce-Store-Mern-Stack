import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const productApiHeaders = {
    'content-type': 'application/json'
}

const baseUrl = 'https://ecomercestore01.herokuapp.com/api';


const createRequest = (url) => ({ url, headers: productApiHeaders })

export const productsApi = createApi({
    reducerPath: 'productsapi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['ProductsOrders'],
    endpoints: (builder) => ({

        getAdminProducts: builder.query({
            query: () => {
                return {
                    url: '/admin/products',
                    method: 'Get',
                    credentials: 'include',


                }

            },
            providesTags: ['ProductsOrders'],
            

        }),


        getAllProducts: builder.query({
            query: ({ Page = 1, price = [0, 25000], category = '', searchKeyword = '', ratings = 0 }) =>
                category ? createRequest(`/products?page=${Page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`) :

                searchKeyword ? createRequest(`/products?keyword=${searchKeyword}`) :

                        createRequest(`/products?page=${Page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`),

            // transformResponse : res => res.sort((a,b)=> b.id - a.id)
            providesTags: ['ProductsOrders'],
            

        }),
        getAllProductsForCart: builder.query({
            query: (id) => {
                return {
                    url: '/products/all',
                    method: 'Get'
                }
            },
            providesTags: ['ProductsOrders'],


        }),


        getProductDetail: builder.query({
            query: (id) => {
                return {
                    url: `/product/${id}`,
                    method: 'Get'
                }
            },
            providesTags: ['ProductsOrders'],

        }),
        getSearchProduct: builder.query({
            query: (keyword) => createRequest(`/products?keyword=${keyword}`),


        }),
        createReviews: builder.mutation({
            query: (review) => {
                return {
                    url: '/review',
                    method: 'Put',
                    body: review,
                    credentials: 'include'


                }
            },
            invalidatesTags: ['ProductsOrders']
        }),

  

        // Admin Routes


        createProduct: builder.mutation({
            query: ({ name, price, description, category, stock, images }) => {
                return {
                    url: '/admin/product/new',
                    method: 'Post',
                    body: { name, price, description, category, stock, images },
                    credentials: 'include'


                }
            },
            invalidatesTags: ['ProductsOrders']
        }),
        deleteProduct: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/product/${id}`,
                    method: 'Delete',
                    credentials: 'include'
                }
            },
            invalidatesTags: ['ProductsOrders']
        }),
        UpdateProduct: builder.mutation({
            query: ({ id, myForm }) => {
                return {
                    url: `/admin/product/${id}`,
                    method: 'Put',
                    body: myForm,
                    credentials: 'include'
                }
            },
            invalidatesTags: ['ProductsOrders']
        }),
     
        getAllReviews: builder.query({
            query: (id) => {
                id = id.replace(/\s+/g, '-')
              const url = `/reviews?id=${id}`
                return {
                    url: url,
                    method: 'Get',
                    credentials: 'include'
                }
            },
            providesTags: ['ProductsOrders']
        }),
        deleteReview: builder.mutation({
            query: ({reviewId , productId}) => {
                productId = productId.replace(/\s+/g, '-')
               const url = `/reviews?productId=${productId}&id=${reviewId}`
                return {
                    url: url,
                    method: 'Delete',
                    credentials: 'include'
                }
            },
            invalidatesTags: ['ProductsOrders']
        }),


        // Orders

        myOrders: builder.query({
            query: () => {
                return {
                    url: '/orders/me',
                    method: 'Get',
                    credentials: 'include'

                }

            },
            // transformResponse : res => res.sort((a,b)=>b._id - a._id),
            providesTags: ['ProductsOrders']
        }),
        createOrder: builder.mutation({
            query: (order) => {
                return {
                    url: '/order/new',
                    method: 'Post',
                    body: order,
                    credentials: 'include'


                }
            },
            invalidatesTags: ['ProductsOrders']
        }),
        orderDetails: builder.query({
            query: (id) => {
                return {
                    url: `/order/${id}`,
                    method: 'Get',
                    credentials: 'include'


                }
            },
            providesTags: ['ProductsOrders']
        }),

        // Admin Routes

        AllOrders: builder.query({
            query: () => {
                return {
                    url: `/admin/orders`,
                    method: 'Get',
                    credentials: 'include'


                }
            },
            providesTags: ['ProductsOrders']
        }),
        deleteOrders: builder.mutation({
            query: (id) => {
                return {
                    url: `/admin/order/${id}`,
                    method: 'Delete',
                    credentials: 'include'


                }
            },
            invalidatesTags: ['ProductsOrders']
        }),
        UpdateOrders: builder.mutation({
            query: ({ id, myForm }) => {
                return {
                    url: `/admin/order/${id}`,
                    method: 'Put',
                    body: myForm,
                    credentials: 'include'


                }
            },
            invalidatesTags: ['ProductsOrders']
        }),
    




    })
});

export const {
    useGetAllProductsQuery,
    useGetProductDetailQuery,
    useGetSearchProductQuery,
    useGetCategoryProductQuery,
    useCreateReviewsMutation,
    useGetAllProductsForCartQuery,
    useCreateOrderMutation,
    useMyOrdersQuery,
    useOrderDetailsQuery,


    // Admin Routes


    useGetAdminProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useAllOrdersQuery,
    useGetAllReviewsQuery,
    useDeleteReviewMutation,
    useDeleteOrdersMutation,
    useUpdateOrdersMutation

} = productsApi;


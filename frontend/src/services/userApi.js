import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const UserApiHeaders = {
    'content-type': 'application/json'
}

const baseUrl = 'https://ecomercestore01.herokuapp.com/api';


export const AuthenticationApi = createApi({
    reducerPath: 'Authenticationapi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes:['Users'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: ({ loginEmail, loginPassword }) => {

                return {
                    url: '/login',
                    method: 'Post',
                    body: {
                        email: loginEmail,
                        password: loginPassword
                    },
                    credentials: 'include'
                }
                
            },
           
        }),
        registerUser: builder.mutation({
            query: (myForm) => {
            return {
                    url: '/register',
                    method: 'Post',
                    body: myForm,
                    credentials: 'include'

                }
            },
        }),
        LoadUser: builder.query({
            query: () => {

                return {
                    url: '/me',
                    method: 'GET',
                    credentials: 'include'
                }
            },
       
           
        }),
        UserDetails: builder.query({
            query: (id) => {

                return {
                    url: `/user/${id}`,
                    method: 'GET',
                
                }
            },
        }),
        LogoutUser: builder.mutation({
            query: () => {

                return {
                    url: '/logout',
                    method: 'GET',
                    credentials: 'include'
                }
            },
        }),
        updateUser: builder.mutation({
            query: (myForm) => {
            return {
                    url: '/me/update',
                    method: 'Put',
                    body: myForm,
                    credentials: 'include'

                }
            },
            invalidatesTags : ['Users']
        }),
        updateUserPassword: builder.mutation({
            query: (myForm) => {
            return {
                    url: '/password/update',
                    method: 'Put',
                    body: myForm,
                    credentials: 'include'

                }
            },
        }),
        forgotPassword: builder.mutation({
            query: (myForm) => {
            return {
                    url: '/password/forgot',
                    method: 'Post',
                    body: myForm,

                }
            },
        }),
        resetPassword: builder.mutation({
            query: ({token , myForm}) => {
            return {
                    url: `/password/reset/${token}`,
                    method: 'Put',
                    body: myForm ,

                }
               
            },
        }),
        // Admin Routes

        AllUserDetails: builder.query({
            query: () => {

                return {
                    url: '/admin/users',
                    method: 'GET',
                    credentials: 'include'
                
                }
            },
            providesTags : ['Users']
        }),
        AdminSingleUserDetails: builder.query({
            query: (id) => {

                return {
                    url: `/admin/user/${id}`,
                    method: 'GET',
                    credentials: 'include'
                
                }
            },
            providesTags : ['Users']
        }),
        AdminDeleteUser: builder.mutation({
            query: (id) => {

                return {
                    url: `/admin/user/${id}`,
                    method: 'Delete',
                    credentials: 'include'
                
                }
            },
            invalidatesTags : ['Users']
        }),
        AdminUpdateUserRole: builder.mutation({
            query: ({id , myForm}) => {

                return {
                    url: `/admin/user/${id}`,
                    method: 'Put',
                    body : myForm,
                    credentials: 'include'
                
                }
            },
            invalidatesTags : ['Users']
        }),

    })
});

export const {

    useLoginUserMutation,
    useRegisterUserMutation,
    useLoadUserQuery,
    useLogoutUserMutation,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useUserDetailsQuery,

    //Admin

    useAllUserDetailsQuery,
    useAdminDeleteUserMutation,
    useAdminSingleUserDetailsQuery,
    useAdminUpdateUserRoleMutation

} = AuthenticationApi
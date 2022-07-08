import React from 'react'
import { Box,   Typography } from '@mui/material'
import MetaData from '../../../Layout/MetaData'
import Sidebar from '../../sidebar/Sidebar'
import Loader from '../../../Layout/loader/Loader'
import { UsersContainer, UsersTable } from './style'
import { Delete, Edit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Alertshai from '../../../Layout/Alerts/Alertshai'
import { useAllUserDetailsQuery , useAdminDeleteUserMutation} from '../../../../services/userApi'

const AllUsers = () => {

    const { data, isFetching } = useAllUserDetailsQuery()

const [DeleteUser , response] = useAdminDeleteUserMutation()


   
const DeleteUserHandle = (id)=>{
    DeleteUser(id)
}

 const column = [
    {
        field : 'id',
        headerName : 'User Id',
        minWidth : 180,
        flex : 0.8
    },
    {
        field: "email",
        headerName: "Email",
        minWidth: 200,
        flex: 1,
      },
    {
        field : 'name',
        headerName : 'Name',
        minWidth : 150,
        flex : 0.5
    },
    {
        field : 'role',
        headerName : 'Role',
        type  :'number',
        minWidth : 150,
        flex : 0.3,
        cellClassName: (params) => {
            return params.getValue(params.id, "role") === "admin"
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Edit />
            </Link>

            <Typography sx={{paddingLeft:'10px',cursor:'pointer'}}>
              <Delete onClick={ () => DeleteUserHandle(params.getValue(params.id, "id"))}/>

            </Typography>
            </>
          );
        }
    }
  ]

  const row = []

  data && data.users.forEach((item)=>(
    row.push({
        id : item._id,
        role : item.role,
        email : item.email,
        name : item.name
    })
  ))

    return (
        <>
            <MetaData title='All Users - Admin' />
      {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}
      {response.status === 'fulfilled' && <Alertshai severity={'success'} text='User Deleted Successfully' />}
  
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
                                All Users
                            </Typography>
                            <UsersContainer>

                                <UsersTable

                                    rows={row}
                                    columns={column}
                                    pageSize={7}
                                    disableSelectionOnClick
                                    autoHeight
                                />


                            </UsersContainer>

                        </Box>
                    )}
                </Box>

            </Box>
        </>
    )
}

export default AllUsers
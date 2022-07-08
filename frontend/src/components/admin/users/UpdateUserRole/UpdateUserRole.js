import React, { useContext, useState, useEffect } from 'react'
import StatesContext from '../../../../context/StatesContext'
import { Box, Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextareaAutosize, TextField } from '@mui/material'
import MetaData from '../../../Layout/MetaData'
import Sidebar from '../../sidebar/Sidebar'
import { FormContainercreate, FormHeadingcreate,  StyledBoxcreate } from './style'
import { MailOutline, Person, } from '@mui/icons-material'
import { useNavigate , useParams} from 'react-router-dom'
import Alertshai from '../../../Layout/Alerts/Alertshai'
import Loader from '../../../Layout/loader/Loader'
import { useAdminSingleUserDetailsQuery, useAdminUpdateUserRoleMutation } from '../../../../services/userApi'


const UpdateUserRole = () => {


  const {id} = useParams()
  const context = useContext(StatesContext)
  const { setuserRolePage } = context

  const { data, isFetching } = useAdminSingleUserDetailsQuery(id)
  const [UpdateRoleAdmin, response] = useAdminUpdateUserRoleMutation()

   
   const navigate = useNavigate()

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [role, setrole] = useState('')

    const userRoleSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData();
        myForm.set("role", role);

        UpdateRoleAdmin({id,myForm})

    }     
   
   useEffect(() => {
 
    setuserRolePage(id)

        if (!isFetching) {

            setname(data.user.name)
            setemail(data.user.email)
            setrole(data.user.role)
         
        }

        if(response.status === 'fulfilled'){
      
         
          navigate('/admin/users')
    }
        

    }, [isFetching, response])


    return (
        <>
            {response.error && <Alertshai severity={'error'} text={response.error.data.message} />}

            <MetaData title={'Update User Role'} />

            <Box >
              <Box >
                <Box >
                    <Sidebar />
                </Box>
                <Box maxWidth='100%' overflow={'hidden'} marginLeft={{ sm: '8.5em', md: '12em' }}>
                    {isFetching || response.isLoading ? <Loader /> : <StyledBoxcreate>
                        <FormContainercreate>
                            <FormHeadingcreate>Update Role</FormHeadingcreate>
                            <Box component={'form'} encType='multipart/form-data' onSubmit={userRoleSubmit} padding={{ xs: '2em 0.5em', sm: '3em 1.5em' }} display='flex' flexDirection={'column'} gap='40px'>
                                <TextField
                                   label='Name'
                                   value={name}
                                    disabled
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        )
                                    }} />
                                <TextField

                                    label='Email'
                                    value={email}
                                   disabled
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MailOutline />
                                            </InputAdornment>
                                        )
                                    }} />
                             
                            

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        required
                                        name='role'
                                      
                                        value={role}
                                        label="Select Role"
                                        onChange={(e) => setrole(e.target.value)}
                                    >
                                      
                                          <MenuItem value={'admin'}>admin</MenuItem>
                                          <MenuItem value={'user'}>user</MenuItem>


                                    </Select>
                                </FormControl>

                                <Button variant="contained" disabled={role === '' ? true : false} type='submit' sx={{  width: '100%' }}>Update</Button>

                            </Box>
                        </FormContainercreate>
                    </StyledBoxcreate>}
                </Box>
                </Box>
            </Box>
        </>
    )
}

export default UpdateUserRole
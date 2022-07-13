import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {

 

  return (
    <Box display={'flex'} justifyContent='center' 
    alignItems={'center'} height={'95vh'} >
         
         <CircularProgress size = {80}/>
     </Box>
  )
}

export default Loader
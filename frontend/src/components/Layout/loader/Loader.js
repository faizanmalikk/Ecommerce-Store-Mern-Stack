import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {

 

  return (
    <Box display={'flex'} justifyContent='center' 
   alignItems={'center'} height={'100vh'} >
        
        <CircularProgress size={90}/>
    </Box>
  )
}

export default Loader
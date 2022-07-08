import { Box, Button, styled, Typography } from "@mui/material"


  const StyledButtonCart = styled(Typography)(({ theme }) => ({
    backgroundColor : 'rgba(0, 0, 0, 0.778)',
    color : 'white',
    border : 'none',
    width : '1.5em',
    height: '1.5em',
   
    '&:hover' :{
      backgroundColor : 'rgba(0, 0, 0, 0.878)',
      cursor : 'pointer'
  
    },
    [theme.breakpoints.down('sm')]:{
      width : '1em',
      height: '1em',
      paddingBottom:'33px',
    }
  }))

const StyledInputCart = styled(Typography)(({ theme }) => ({
 
  height : '1.42em',

  padding : '0 0.7em',
  [theme.breakpoints.down('sm')]:{
    padding : '0 0.3em',


  }
}))



const StyledCheckout = styled(Button)(({ theme }) => ({
 padding : '10px 50px',
 borderRadius:'1.5em',
 [theme.breakpoints.down('sm')]:{
   width:'90%'
 }

}))



export  {
StyledButtonCart,
StyledInputCart,
StyledCheckout
}
import { Box, Button, styled, Typography } from "@mui/material"


const StyledButtonCart = styled(Box)(({ theme }) => ({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
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
    width : '20px',
    height: '20px',
   
  }
}))

const StyledInputCart = styled(Box)(({ theme }) => ({

height : '1.5em',
padding : '0 0.5em',
display:'flex',
justifyContent:'center',
alignItems:'center',
[theme.breakpoints.down('sm')]:{
  padding : '0 0.3em',
  height: '20px',


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
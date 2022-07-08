import { Box, Button, Input, styled, TextField } from "@mui/material";



const StyledBox = styled(Box)(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(231, 231, 231)',
    position: 'fixed',
    top: '0%',
    left: '0',


   
}))
const SearchFeild = styled(Input)(({ theme }) => ({
 backgroundColor:'white',
 width:'45%',
 padding : '13px 20px',
 height : '2.5em',
 [theme.breakpoints.down('sm')]: {
    
    width : '70%',
    height : '5%',
    fontSize : '15px'

}

   
}))
const StyledButton = styled(Button)(({ theme }) => ({
height : '1em',
padding : '1.4em',
[theme.breakpoints.down('sm')]: {
    
    padding: '1em',
    height : '5%',
    fontSize : '15px'

}

   
}))

export {
    StyledBox,
    SearchFeild,
    StyledButton
}
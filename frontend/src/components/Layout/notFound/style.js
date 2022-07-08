import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
 
    width: '100vw',
    height: '100vh',
    maxWidth:' 100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(231, 231, 231)',
    position: 'fixed',
    top: '0%',
    left: '0'
  
   


}))

export{
    StyledBox
}
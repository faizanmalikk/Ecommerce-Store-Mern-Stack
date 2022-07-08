import React from "react";

import { Link } from "react-router-dom";
import { Box, Button , Typography} from "@mui/material";
import { Error } from "@mui/icons-material";
import { StyledBox } from "./style";

const NotFound = () => {

  

  return (
    <StyledBox>

    
    <Box display={'flex'} flexDirection='column' alignItems={'center'} textAlign={'center'}>

    <Error sx={{ color: '#42a5f5', fontSize: '70px',marginBottom:'10px' }} />
    <Typography color='#9e9e9e' fontFamily={'cursive'} fontSize='28px'>Page Not Found</Typography>
    <Button component={Link} to='/' variant='contained' sx={{marginTop:'20px', width:'7em'}}>Home</Button>
  </Box>
  </StyledBox>
  );
};

export default NotFound;
import { Box, styled, Typography } from "@mui/material";

const StyledBoxpayment = styled(Box)(({ theme }) => ({
 
 
  
    display: 'flex',
    justifyContent: 'center',
   
  

    [theme.breakpoints.down('sm')]: {
        backgroundColor : 'white',
       margin:'1em 0'
    }


}))

const FormHeadingpayment = styled(Typography)(({ theme }) => ({

    fontSize: '30px',
    paddingTop : '19px',
    borderBottom : '1px solid rgba(0,0,0,0.216)',
    fontFamily: 'cursive',
    cursor: 'pointer',
    color: theme.palette.grey[700],
    paddingBottom: '10px',
  margin:'0 80px',
    textAlign: 'center',

[theme.breakpoints.down('sm')]:{
    margin:'0 40px'
}

}))

const FormContainerpayment = styled(Box)(({ theme }) => ({
    margin:'auto',
     width: '50vh',
     backgroundColor: 'white',
     height: 'auto',
 
     [theme.breakpoints.down('sm')]: {
         width: '90%',
         height:'auto'
     }
 
 
 }))

const InputFilepayment = styled(Box)({
    '&::file-selector-button' : {
        cursor : 'pointer',
        width : '100%',
        padding : '0 1vmax',
        height : '5vh',
        borderColor : 'rgba(0,0,0,0.116)',
        color : 'rgba(0,0,0,0.616)',
        backgroundColor : 'white',
        transition : 'all 0.5s',
        font : '400 1em cursive'
    },
    
    '&::file-selector-button:hover':{
        backgroundColor : 'rgb(235,235,235)'
    }
    
    })

   export {
    InputFilepayment,
    StyledBoxpayment,
    FormContainerpayment,
    FormHeadingpayment
   }


import { styled, Box, Typography } from "@mui/material";
import { height } from "@mui/system";



const StyledBox = styled(Box)(({ theme }) => ({
 
 
    minHeight: '79vh',
    maxHeight : 'auto',
    padding:'2.5em 0',
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    justifyContent: 'center',
    
    [theme.breakpoints.down('sm')]: {
        backgroundColor : 'white',
       margin:'1em 0'
    }


}))
const FormContainer = styled(Box)(({ theme }) => ({
   margin:'auto',
    width: '50vh',
    backgroundColor: 'white',
    height: 'auto',

    [theme.breakpoints.down('sm')]: {
        width: '90%',
        height:'auto'
    }


}))
const FormHeading = styled(Typography)(({ theme }) => ({

    fontSize: '23px',
    fontFamily: 'cursive',
    cursor: 'pointer',
    color: theme.palette.grey[700],
    paddingBottom: '10px',
    width: '50%',
    textAlign: 'center',



}))

const ForgotPass = styled(Typography)(({ theme }) => ({
    color: '#616161',
    paddingTop: '10px',
   float : 'right',
    fontSize: '20px',
    textDecoration:'none',
    transition:'all 0.5s',
    '&:hover':
    {
        color:'black'
    }

}))

const InputFile = styled(Box)({
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
    StyledBox,
    FormContainer,
    FormHeading,
    ForgotPass,
    InputFile
}
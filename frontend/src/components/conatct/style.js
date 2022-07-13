import { Box, styled, TextareaAutosize, Typography } from "@mui/material";

const StyledBoxcontact = styled(Box)(({ theme }) => ({
 
 
    minHeight: '79vh',
    maxHeight : 'auto',
    padding:'2.5em 0',
    display: 'flex',
    justifyContent: 'center',

}))

const ContactCard = styled(Box)(({ theme }) => ({
  
    backgroundColor: theme.palette.grey[50],
    border: '1px solid transparent',
    borderRadius: '1em',
    paddingTop: '0.5em',
    paddingBottom: '1em',
    transition: 'all 0.4s ease',
    textAlign:'center',
    padding:'0.8em 1.3em',
    color : theme.palette.grey[700],
   
    
 '&:hover':{
    backgroundColor :  'transparent',
    borderColor : theme.palette.grey[300]
 }
 
 }))

const FormHeadingcontact = styled(Typography)(({ theme }) => ({

    fontSize: '30px',
    paddingTop : '19px',
    borderBottom : '1px solid rgba(0,0,0,0.216)',
    fontFamily: 'Roboto',
    cursor: 'pointer',
    color: theme.palette.grey[700],
    paddingBottom: '10px',
  margin:'0 80px',
    textAlign: 'center',

[theme.breakpoints.down('sm')]:{
    margin:'0 40px'
}

}))

const FormContainercontact = styled(Box)(({ theme }) => ({
  
    margin:'auto',
    
     backgroundColor: 'white',
     height: 'auto',
     boxShadow : theme.shadows[3],
    
     display:'flex',
     gap:'15px',
 
     [theme.breakpoints.down('md')]: {
         width: '90%',
         height:'auto',
         flexDirection : 'column'
     },
     [theme.breakpoints.down('sm')]:{
        boxShadow : 'none',
        width:'95%'
     }
 
 
 }))

 const StyledDescription = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    resize:'none',
    overflow:'hidden',
    padding:'15px 0',
    paddingLeft:'59px',
    paddingRight:'10px',
    fontSize : '26px',
    color: theme.palette.grey[800],
    fontFamily:'Roboto',
    borderColor:'#bdbdbd',
    '&:hover':{
        borderColor:'#616161',

    },
    '&:focus' : {
        outline : 'none !important',
        border:'2px solid #1976d2 !important',

    },
    '&::placeholder':{
        color: theme.palette.grey[500],

    },
    [theme.breakpoints.down('sm')]:{
        fontSize : '20px',
        paddingLeft:'62px',
        paddingTop:'18px'
    }
   
 
 }))



   export {
    
    StyledBoxcontact,
    FormContainercontact,
    FormHeadingcontact,
    ContactCard,
    StyledDescription
   }


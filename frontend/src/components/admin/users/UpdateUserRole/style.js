import { Box, styled, Typography } from "@mui/material";

const StyledBoxcreate = styled(Box)(({ theme }) => ({
 
 
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

const FormHeadingcreate = styled(Typography)(({ theme }) => ({

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

const FormContainercreate = styled(Box)(({ theme }) => ({
    margin:'auto',
    padding:'0 1em',
     width: '50vh',
     backgroundColor: 'white',
     height: 'auto',
     boxShadow : theme.shadows[3],
 
     [theme.breakpoints.down('sm')]: {
         width: '90%',
         height:'auto'
     },
     [theme.breakpoints.down('md')]: {
         width: '80%',
     }
 
 
 }))



   export {
  
    StyledBoxcreate,
    FormContainercreate,
    FormHeadingcreate,
 
   }


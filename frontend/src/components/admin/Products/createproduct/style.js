import { Box, styled, TextareaAutosize, Typography } from "@mui/material";

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

const StyledDescription = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    resize:'none',
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
        padding:'16px 0',
        fontSize : '20px',
        paddingLeft:'62px',
    }
    
 
 }))



const InputFilecreate = styled(Box)({
    '&::file-selector-button' : {
        cursor : 'pointer',
        width : '100%',
        overflow:'hidden',
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
    InputFilecreate,
    StyledBoxcreate,
    FormContainercreate,
    FormHeadingcreate,
    StyledDescription
   }


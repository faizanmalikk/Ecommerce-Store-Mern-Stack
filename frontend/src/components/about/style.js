import { Box, styled, TextareaAutosize, Typography } from "@mui/material";


const StyledContainer = styled(Box)(({ theme }) => ({
    minHeight: '92.5vh',
    maxHeight:'auto',
    width: '100vw',
    maxWidth: '100%',
   
   position:'relative',
    
    overflow:'hidden',
  
}))


const StyledBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: '0',
    top:'0',
    bottom:'0',
    width: '50%',
    minHeight: '100vh',
    maxHeight: 'auto',
    zIndex: '-1',
    backgroundImage: 'linear-gradient( to bottom right, #1976d2,rgb(74, 137, 189))',
  
}))

const StyledBoxAbout = styled(Box)(({ theme }) => ({


    minHeight: '79vh',
    maxHeight: 'auto',
    padding: '2.5em 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',

  
  


}))



const FormHeadingAbout = styled(Typography)(({ theme }) => ({

    fontSize: '45px',
    paddingTop: '19px',
    fontFamily: 'cursive',
    color: '#1976d2',
    paddingBottom: '19px',
    textAlign: 'center',
    fontWeight: '600',

    [theme.breakpoints.down('sm')]: {
        margin: '0 40px'
    }

}))

const FormContainerAbout = styled(Box)(({ theme }) => ({

    margin: 'auto',

    backgroundColor: 'white',
    height: 'auto',
    boxShadow: theme.shadows[5],
    paddingBottom:'3em',
    width: '80%',


    [theme.breakpoints.down('md')]: {
        width: '90%',
        height: 'auto',
        flexDirection: 'column'
    },
    [theme.breakpoints.down('sm')]: {
       
        width: '95%'
    }


}))

const StyledDescription = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    resize: 'none',
    overflow: 'hidden',
    padding: '0.65em 0',
    paddingLeft: '2.4em',
    paddingRight: '10px',
    fontSize: '26px',
    color: theme.palette.grey[800],
    fontFamily: 'Roboto',
    borderColor: '#bdbdbd',
    '&:hover': {
        borderColor: '#616161',

    },
    '&:focus': {
        outline: 'none !important',
        border: '2px solid #1976d2 !important',

    },
    '&::placeholder': {
        color: theme.palette.grey[500],

    },


}))



export {

    StyledBoxAbout,
    FormContainerAbout,
    FormHeadingAbout,
    StyledContainer,
    StyledDescription,
    StyledBox
}


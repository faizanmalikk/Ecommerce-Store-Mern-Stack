import { Box, styled } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({
   
    display: 'flex',
    justifyContent: 'center',
   marginTop:'-2em',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '-4em',
        marginBottom : '2em'

    }


}))
const ProfileContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
   
  
    flexDirection: 'column',
    width: '50%',
    textAlign: 'center',
    marginTop: '7em',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }

}))

const StyledImage = styled(Box)(({ theme }) => ({
    transition: 'all 0.4s ease',
    height: '370px',
    width: '370px',
    borderRadius:'100%',
    transition : 'all 0.4s',
    '&:hover': { 
        transform: 'scale(1.1)' 
        
    },
    [theme.breakpoints.down('sm')]:{
        height : '280px',
        width : '280px'
    }

}))

const ProfileInfo = styled(Box)(({ theme }) => ({
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '3em',
    marginTop: '8em',
    marginBottom: '4em',


    [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        width: '100%',
        marginTop: '5em',
        marginBottom: '1.5em',
        float: 'center'
    }

}))



export {
    StyledBox,
    ProfileContainer,
    ProfileInfo,
    StyledImage
}
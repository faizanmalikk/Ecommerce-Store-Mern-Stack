import { styled, Box, Button ,Typography} from "@mui/material"
import img from '../../assets/cover.jfif'

const Banner = styled(Box)(({ theme }) => ({
  
  backgroundImage : `url(${img})`,
  backgroundPosition : 'center',
  backgroundSize: 'cover',

  backgroundRepeat: 'no-repeat',
  height: '99.7vmin',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  color: 'white',
overflow:'hidden',

//  borderBottom:'10px solid white',
 
  '&::after': {
    content: '""',
    width: '100vw',
    height: '100vmin',
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: '100',
    left: '0',
    clipPath: 'polygon(100% 68%, 0 100%, 100% 100%)',
    maxWidth: '100%',
   

   
  },

  [theme.breakpoints.down('sm')]:{
    height : '99.3vmin'
  },
  [theme.breakpoints.up('md')]:{
    height : '99.75vmin'
  }

}))
const StyledButton = styled(Button)(({ theme }) => ({


  backgroundColor: 'white',
  color: 'black',
  '&:hover': {
    color: 'white',
    borderColor: 'white',
    transition: 'all 0.5s'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '10px',
    padding: '6px'
  }
}))


const HomeHeading = styled(Typography)({
  borderBottom : '1px solid rgba(21, 21, 21, 0.5)',
  width : '13em',
  color : 'rgba(0, 0, 0, 0.7)',
  padding : '8px',
  textAlign : 'center'
 
})

const StyledBox = styled(Box)(({theme})=>({
  display : 'flex',
  flexDirection : 'row',
  flexWrap : 'wrap', 
  gap : theme.spacing(3),
  width : '72%',
  justifyContent : 'center',
  margin : '0 auto',
  marginTop : theme.spacing(7),
  marginBottom:'3em',
  
  [theme.breakpoints.down('sm')]: {
     
   width : '100%'
 },
  [theme.breakpoints.down('md')]: {
     
   width : '90%'
 }
 
 }))
export {
  Banner,
  StyledButton,
  HomeHeading,
  StyledBox
}
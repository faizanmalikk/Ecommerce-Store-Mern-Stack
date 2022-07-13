import { Box, styled, Typography,Input, TextField, Button, Card, TextareaAutosize } from "@mui/material";





  const StyledRatings = styled(Box)(({ theme }) => ({
    borderTop: '1px solid rgba(0, 0, 0, 0.678)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.678)',
    display : 'flex',
    alignItems:'center',
    padding:'12px 0',
    width: '70%',
    color : 'rgba(0, 0, 0, 0.578)',

    [theme.breakpoints.down('md')]: {
        display : 'flex',
        justifyContent:'center',
        margin : '0 auto'
    }
   
}))



 
const StyledButton = styled(Box)(({ theme }) => ({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  backgroundColor : 'rgba(0, 0, 0, 0.778)',
  color : 'white',
  border : 'none',
  width : '1.5em',
  height: '1.5em',
  '&:hover' :{
    backgroundColor : 'rgba(0, 0, 0, 0.878)',
    cursor : 'pointer'

  },
 
 
}))


const StyledInput =styled(Box)({
display:'flex',
justifyContent:'center',
alignItems:'center',
height : '1.5em',
padding : '0 0.5em',

})
  const CartButton = styled(Button)(({ theme }) => ({
    color : 'white',
   backgroundColor : 'tomato',
   fontSize : '14px',
   marginLeft : '30px',
   borderRadius : '20px',
   padding : '0 18px',
   transition : 'all 0.5s',

   '&:hover':{
       backgroundColor : '#eb4034'
   },
   [theme.breakpoints.down('md')]: {
   width : '10em',
  
   padding : '8px 0',
   margin : '0 auto',
   marginTop: '15px',
}
   
   
}))


  const StyledStatus = styled(Box)(({ theme }) => ({
    borderTop: '1px solid rgba(0, 0, 0, 0.678)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.678)',
    padding : '12px 0',
    marginTop : '10px',
    fontWeight : 'bold',
    width : '70%',
    fontSize : '20px',
    [theme.breakpoints.down('md')]: {
        display : 'flex',
        justifyContent:'center',
        margin : '0 auto'
    }
   
}))

  const SubmitReview = styled(Button)(({ theme }) => ({
    color : 'white',
    backgroundColor : 'tomato',
    fontSize : '14px',
    borderRadius : '20px',
    padding : '7px 19px',
    transition : 'all 0.5s',
    
    '&:hover':{
        backgroundColor : '#eb4034',
        transform : 'scale(1.1)',
       
    },
    [theme.breakpoints.down('md')]: {
    
        padding : '10px 20px',
    }
   
   
}))


const StyledReviewText = styled(TextareaAutosize)(({ theme }) => ({


   borderColor:'rgba(0,0,0,0.316)',
   resize:'none',
   marginTop:'15px',
   padding:'10px',
   '&:focus': {

    outline : 'none !important',
    border : '1px solid rgba(0,0,0,0.516) !important'
  }

 
}))
// Review Card
  const StyledCard = styled(Card)(({ theme }) => ({
  
    paddingTop:'30px' ,
    paddingBottom: '6px',
     border:'1px solid rgba(0, 0, 0, 0.1)',
     borderRadius:'14px',
     display : 'flex',
     flexDirection : 'column',
     justifyContent : 'center',
     height : '13em',
     [theme.breakpoints.down('sm')]: {
    
      height : '80%',
  }

   
}))
  const ReviewHeading = styled(Typography)(({ theme }) => ({
    textAlign : 'center',
    fontSize: '35px',
    fontWeight : '400',
    borderBottom: '1px solid',
    width : '10em',
    margin : '0 auto',
    paddingBottom : '10px',
    color : 'rgba(0, 0, 0, 0.678)',
    [theme.breakpoints.down('sm')]: {
    
      width : '7em'
  }
  

   
}))




  export {
      StyledRatings,
      StyledButton,
      StyledInput,
      CartButton,
      StyledStatus,
      SubmitReview,
      StyledCard,
      ReviewHeading,
      StyledReviewText
  }
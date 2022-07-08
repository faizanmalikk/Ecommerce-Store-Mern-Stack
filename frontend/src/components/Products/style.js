import { Pagination, Typography, styled, Box } from "@mui/material";


const StyledBox = styled(Box)(({ theme }) => ({

  width: '100%',
  marginLeft:'2em',
  padding:'1em 0',
  paddingRight: '20px',
  marginTop: theme.spacing(7),
  
  [theme.breakpoints.down('md')]: {
    paddingRight: '0',
    marginLeft:'0',
    margin : '0 auto',
    marginTop: theme.spacing(7),
    width: '90%'
  },

}))

const StyledSlider = styled(Box)(({ theme }) => ({

  width: '20%',
  marginLeft: '40px',
  marginTop: '2em',
  '.activeCategory':{
    color : theme.palette.grey[900],
    transition: 'all 0.4s ease'

},
  '.unactiveCategory':{
    color : theme.palette.grey[500],
    transition: 'all 0.4s ease'
},

  [theme.breakpoints.down('md')]: {
    width: '100%',

    marginLeft: '0',

    textAlign: 'center'
  }

  
}))
  

const FilteredRatings = styled(Typography)(({ theme }) => ({

  borderColor: 'rgba(0,0,0,0.215)',
  color: theme.palette.primary.main,
  width: '3vmax'

}))


const ProductHeading = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '35px',
  fontWeight: '400',
  borderBottom: '1px solid',
  width: '10em',
  margin: '0 auto',
  marginTop: '2.5em',
  paddingBottom: '10px',
  color: 'rgba(0, 0, 0, 0.678)',
  [theme.breakpoints.down('sm')]: {

    width: '7em'
  }



}))

const StyledPagination = styled(Pagination)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2.5em'
})


const StyledCategory = styled(Typography)(({ theme }) => ({
  listStyleType: 'none',
  fontSize: '20px',
  paddingLeft: '5px',
  cursor: 'pointer',
  transition: 'all 0.4s ease',
  marginBottom: '3px',
  '&:hover': {
    color : theme.palette.grey[900],
  }



}))

const NoProductHeading = styled(Typography)(({ theme }) => ({
  textAlign : 'center',
  fontSize: '35px',
  fontWeight : '400',
  borderBottom: '1px solid',
  width : '10em',
  color : 'rgba(0, 0, 0, 0.678)',
  [theme.breakpoints.down('sm')]: {
  
    width : '80%',
    marginBottom:'5em',
},
  [theme.breakpoints.down('md')]: {
  
    marginTop : '2.5em',
    
}
}))





export {
  ProductHeading,
  StyledPagination,
  StyledSlider,
  StyledBox,
  StyledCategory,
  FilteredRatings,
  NoProductHeading,

}
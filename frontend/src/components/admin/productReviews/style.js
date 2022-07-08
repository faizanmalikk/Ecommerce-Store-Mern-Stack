import { Box, styled, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";




const FormHeadingreview = styled(Typography)(({ theme }) => ({

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

const FormContainerreview = styled(Box)(({ theme }) => ({
    margin:'auto',
     width: '50vh',
     backgroundColor: 'white',
     height: 'auto',
 
     [theme.breakpoints.down('sm')]: {
         width: '90%',
         height:'auto'
     }
 
 
 }))



const StyledContainer = styled(Box)(({ theme }) => ({

    width: '100%',
    maxWidth: '100%',
    padding:' 0 3vmax',
    paddingTop:'1em',
    
    boxSizing: 'border-box',

  
  [theme.breakpoints.down('sm')]:{
    paddingLeft : '1vmax',
    paddingRight : '1vmax',
    display:'flex',
    flexDirection:'column'
  }

  
  
  }))
  const ReviewHeading = styled(Typography)(({ theme }) => ({
    textAlign : 'center',
    fontSize: '35px',
    fontWeight : '400',
    borderBottom: '1px solid',
    width : '10em',
    margin : '0 auto',
    paddingTop:'2em',
    paddingBottom : '10px',
    color : 'rgba(0, 0, 0, 0.678)',
    [theme.breakpoints.down('sm')]: {
    
      width : '7em'
  }
  

   
}))
const ReviewsContainer = styled(DataGrid)(({ theme }) => ({

  backgroundColor : 'white',
  font:' 300 1vmax Roboto',
  color: 'rgba(0, 0, 0, 0.678)',
  border: 'none',
 

  '.MuiDataGrid-columnHeader': {
    backgroundColor: '#42a5f5',
    color:'white',
    padding: '1vmax !important',
  },
 '.MuiDataGrid-iconSeparator' :{
    display: 'none !important'
  },
  '.MuiSvgIcon-root':{
  color : '#bdbdbd !important',
  transition : 'all 0.4s ease'
  },
  '.MuiSvgIcon-root:hover':{
  color : '#616161 !important'
  },
  '.greenColor':{
    color : 'green'
  },
  '.redColor':{
    color : 'red'
  },
  '.MuiDataGrid-cell ':{
    outline : 'none !important',
  },

  [theme.breakpoints.down('sm')]:{
    display:'flex-none',
    '.MuiDataGrid-columnHeader div' : {
        font: '500 5vw Roboto !important',
      },
      '.MuiDataGrid-columnHeader':{
        padding: '20px !important'
      },
      '.MuiDataGrid-cellContent':{
        font: '400 4vw Roboto !important',

      }
  },
  [theme.breakpoints.down('md')]:{
  
    '.MuiDataGrid-columnHeader div' : {
        font: '500 4vw Roboto !important',
      },
      '.MuiDataGrid-columnHeader':{
        padding: '20px !important'
      },
      '.MuiDataGrid-cellContent ':{
        font: '400 3vw Roboto !important',
    

      }
  }



  
  }))








  export {
    StyledContainer,
    ReviewsContainer,
    ReviewHeading,
   
    FormContainerreview,
    FormHeadingreview
    
  }
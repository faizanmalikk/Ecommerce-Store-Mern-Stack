import { Box, styled, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";



const StyledContainer = styled(Box)(({ theme }) => ({

    width: '100vw',
  maxWidth: '100%',
  padding:' 0 7vmax',
  paddingTop:'4.5em',
  paddingBottom:'7em',
  
  boxSizing: 'border-box',
  backgroundColor: 'rgb(235, 235, 235)',
  position: 'fixed',
  top: '0',
  left: '0',
height: '100vh',

  
  [theme.breakpoints.down('sm')]:{
    paddingLeft : '1vmax',
    paddingRight : '1vmax',
    paddingTop:'6em',
    display:'flex',
    flexDirection:'column'
  }

  
  
  }))

const StyledTable = styled(DataGrid)(({ theme }) => ({

  backgroundColor : 'white',
  font:' 300 1vmax Roboto',
  color: 'rgba(0, 0, 0, 0.678)',
  border: 'none',
  height:'10vh',

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
  }


  
  }))



const StyledHeading = styled(Typography)(({ theme }) => ({

    textAlign: 'center',
    font: '400 1.2vmax Roboto',
    padding:' 0.5vmax',
    boxSizing: 'border-box',
    color: 'rgb(255, 255, 255)',
    transition:' all 0.5s',
    backgroundColor: 'rgb(44, 44, 44)',
    [theme.breakpoints.down('sm')]:{
        font: '400 2.2vmax Roboto',
        padding: '4vw'
    }
  
  
  }))




  export {
    StyledContainer,
    StyledTable,
    StyledHeading
  }
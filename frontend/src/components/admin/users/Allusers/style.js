import { Box, styled, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";



const UsersContainer = styled(Box)(({ theme }) => ({

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

const UsersTable = styled(DataGrid)(({ theme }) => ({

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
 
  '.MuiDataGrid-cell ':{
    outline : 'none !important',
  },
  '.greenColor':{
    color : 'green'
  },
  '.redColor':{
    color : 'red'
  },

  [theme.breakpoints.down('sm')]:{
    display:'flex-none',
    '.MuiDataGrid-columnHeader div' : {
        font: '500 6vw Roboto !important',
      },
      '.MuiDataGrid-columnHeader':{
        padding: '20px !important'
      },
      '.MuiDataGrid-cellContent':{
        font: '400 5vw Roboto !important',

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
    UsersContainer,
    UsersTable,
  
  }
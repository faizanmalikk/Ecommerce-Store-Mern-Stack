import { TreeView } from "@mui/lab";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2em',
  position:'fixed',
  left : '0',
 height : '100vh',
 

[theme.breakpoints.down('sm')]:{
  position : 'relative',
  alignItems : 'center',
  height : 'auto'
},

  '.styledlinks': {
    textDecoration: 'none',
    display: 'flex',
    gap: '10px',
    color: '#42a5f5',
    transition: 'all 0.4s ease',
    paddingLeft: '1.2em',

  },
  '.styledlinks:hover': {
    color: '#1565c0 !important',
    transform: 'scale(1.1)',
    backgroundColor: 'transparent !important'

  },


}))

const StyleTreview = styled(TreeView)(({ theme }) => ({


  ".Mui-selected": {
    backgroundColor: 'transparent !important'
  },

  ".MuiTreeItem-content:hover ": {
    backgroundColor: 'transparent !important'

  }


}))

export {
  StyledBox,
  StyleTreview
}
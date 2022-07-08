import React from 'react'
import { Add, Dashboard, ExpandMore, ImportExport, ListAlt, People, PostAdd, RateReview } from '@mui/icons-material'
import {  Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { StyledBox, StyleTreview } from './style'
import {TreeItem} from '@mui/lab'
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  return (
    <>
  
    <StyledBox   paddingTop={{xs:'1.5em',sm:'4em'}}  borderRight={{sm:'1px solid #e0e0e0'}} width={{sm:'8.5em',md:'12em'}}
    >
      <Link to={'/admin/dashboard'} className='styledlinks' style={{color : `${location.pathname === '/admin/dashboard' ? '#1565c0' : '#42a5f5'}`}}>
      <Dashboard/>
      <Typography >Dashboard</Typography>
      </Link>
     
      <StyleTreview
      defaultCollapseIcon = {<ExpandMore />}
      defaultExpandIcon = {<ImportExport  />}
 
   
      >
        <TreeItem nodeId='1' label='Products' className='styledlinks' style={{display:'flex',flexDirection:'column',color : `${location.pathname === '/admin/product' || location.pathname === '/admin/products'  ? '#1565c0' : '#42a5f5'}`}}>
          <Link to={'/admin/products'} className='styledlinks' style={{color : `${location.pathname === '/admin/products' ? '#1565c0' : '#42a5f5'}`}}>
            <TreeItem nodeId='2' label='All' icon={<PostAdd/>}/>
          </Link>
          <Link to={'/admin/product'} className='styledlinks' style={{color : `${location.pathname === '/admin/product' ? '#1565c0' : '#42a5f5'}`}}>
            <TreeItem nodeId='3' label='Create' icon={<Add/>}/>
          </Link>

        </TreeItem>

      </StyleTreview>

      <Link to={'/admin/orders'} className='styledlinks' style={{color : `${location.pathname === '/admin/orders' ? '#1565c0' : '#42a5f5'}`}}>
      <ListAlt/>
      <Typography >Orders</Typography>
      </Link>
      <Link to={'/admin/users'} className='styledlinks' style={{color : `${location.pathname === '/admin/users' ? '#1565c0' : '#42a5f5'}`}}>
      <People/>
      <Typography >Users</Typography>
      </Link>
      <Link to={'/admin/reviews'} className='styledlinks' style={{color : `${location.pathname === '/admin/reviews' ? '#1565c0' : '#42a5f5'}`}}>
      <RateReview/>
      <Typography >Reviews</Typography>
      </Link>
   
    </StyledBox>
   
    </>
  )
}

export default Sidebar
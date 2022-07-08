import { AccountBox, Search, ShoppingCart } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from './style'
import React, { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import StatesContext from '../../../context/StatesContext';
import Profile from './Profile';
import { useLoadUserQuery } from '../../../services/userApi';
import Loader from '../loader/Loader';




const pages = ['Home', 'Products', 'About', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const smallerthen1050 = useMediaQuery('(max-width:1050px)')

  const context = useContext(StatesContext)
  const { isAuthenticated, setisAuthenticated } = context

 


  const location = useLocation()
  const headerLinks1 = {
    textDecoration: 'none',
    color: `${location.pathname === '/' ? 'white' : 'rgba(225,255,225,0.6)'}`,

  }
  const headerLinks2 = {
    textDecoration: 'none',
    color: `${location.pathname === '/products' ? 'white' : 'rgba(225,255,225,0.6)'}`,

  }
  const headerLinks3 = {
    textDecoration: 'none',
    color: `${location.pathname === '/contact' ? 'white' : 'rgba(225,255,225,0.6)'}`,

  }
  const headerLinks4 = {
    textDecoration: 'none',
    color: `${location.pathname === '/about' ? 'white' : 'rgba(225,255,225,0.6)'}`,

  }


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget);
  };
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
 
 <AppBar position='sticky' >

      <Toolbar disableGutters >
        <Logo
          variant="h6"
          noWrap
          component={Link}
          to="/"

          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },

          }}
        >
          Ecommerce
        </Logo>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >

            <MenuItem onClick={handleCloseNavMenu}>
              <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }} >Home</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to={'/products'} style={{ textDecoration: 'none', color: 'black' }}>Products</Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to={'/contact'} style={{ textDecoration: 'none', color: 'black' }}> Contact</Link>

            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to={'/about'} style={{ textDecoration: 'none', color: 'black' }}> About</Link>
            </MenuItem>

          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Stack direction={'row'} spacing={smallerthen1050 ? 4 : 7} paddingLeft={smallerthen1050 ? 7 : 10}>
            <Link to={'/'} style={headerLinks1} >Home</Link>
            <Link to={'/products'} style={headerLinks2}>Products</Link>
            <Link to={'/contact'} style={headerLinks3}> Contact</Link>
            <Link to={'/about'} style={headerLinks4}> About</Link>
          </Stack>
        </Box>

        <Box sx={{ flexGrow: 0 }} display='flex' alignItems={'center'}>
          <IconButton >
            <Link to={'/search'}>  <Search sx={{ color: 'white' }} style={{ marginTop: `${isAuthenticated ? '10px' : '5px'}` }} /></Link>
          </IconButton>
          <IconButton   style={{ marginRight: `${isAuthenticated ? '1.5em' : '0'}` }}>
         <Link to='/cart' >   <ShoppingCart sx={{ color: 'white'}} style={{ marginTop: `${isAuthenticated ? '10px' : '5px'}` }}/> </Link>
          </IconButton>

          <Box onClick={handleOpenUserMenu} sx={{ p: 0, marginRight: '15px', marginLeft: '10px' }}>
            { isAuthenticated  ? (
             
              <Profile />
              
              ) : (
                <Link to='/login'><AccountBox sx={{ color: 'white' }} /></Link>

            )}

          </Box>
         
        </Box>
      </Toolbar>

    </AppBar>

    </>
  );
};
export default Header;

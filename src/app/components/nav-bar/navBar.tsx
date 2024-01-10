import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { DinnerDining } from '@mui/icons-material';
import { deepOrange } from '@mui/material/colors';
import AuthService from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';




const NavBar = () => {
    
const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () =>{
    
    AuthService.Logout().then(response =>{
        navigate("/auth")
        AuthService.DeleteCookie("_connected_user")
        console.log(response.data);
        console.log("navigate to login");
        
    }).catch(err=>console.log(err));
  }
  const handleProfile = () => {
    console.log('navigate to profile');

  }
  const handleDashboard = () => {
    navigate("/dashboard")
    console.log('navigate to dashboard');
  }
  
    
  
    return (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <DinnerDining sx={{ display: { xs: 'none', md: 'flex' }, mr: 5 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href={"/dashboard"}
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                Sesame 
              </Typography>
    
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                
                   
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Menu
                  </Button>
                  <Button
                  
                   
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Tables
                  </Button>
                  <Button
               
                   
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Reservations
                  </Button>
              </Box>
    
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>{AuthService.GetCookie("_connected_user").substring(0,2).toUpperCase()}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                 <MenuItem  onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={handleProfile} >Profil</Typography>
                    </MenuItem>
                    <MenuItem  onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={handleDashboard} >Dashboard</Typography>
                    </MenuItem>
                    <MenuItem  onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={handleLogout} >Déconnecter</Typography>
                    </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      );
}

export default NavBar
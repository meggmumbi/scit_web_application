import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ToggleColorMode from './ToggleColorMode';
import Logo from './SitemarkIcon';
import Sitemark from './SitemarkIcon';

 const logo = 'logo.png';

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };



  return (

    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          variant="regular"
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor:
              theme.palette.mode === 'light'
                ? 'hsla(220, 60%, 99%, 0.6)'
                : 'hsla(220, 0%, 0%, 0.7)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              theme.palette.mode === 'light'
                ? '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)'
                : '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)',
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              px: 0,
            }}
          >
           <img src="/logo.png" alt="Logo" style={{ height: 30, marginRight: 10 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => navigate('/about')}
                sx={{ minWidth: 0 }}
              >
                About Us
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => navigate('/academicList')}
              >
                Academics
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => navigate("/programmes")}
              >
                Programmes
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={() => navigate("/staffList")}
              >
                Staff
              </Button>             
           
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 0.5,
              alignItems: 'center',
            }}
          >
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            <Link to="/scit/dashboard">
            <Button color="primary" variant="text" size="small">
              DashBoard
            </Button>
            </Link>
             <Link to="/sign-in">
            <Button color="primary" variant="text" size="small">
              Sign in
            </Button>
            </Link>
            <Link to="/sign-up">
            <Button color="primary" variant="contained" size="small">
              Sign up
            </Button>
            </Link>
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: 'background.default',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
                <MenuItem  onClick={() => navigate('/about')}>
                  About Us
                </MenuItem>
                <MenuItem onClick={() => navigate('/academicList')}>
                  Academics
                </MenuItem>
                <MenuItem  onClick={() => navigate("/programmes")}>
                  Programmes
                </MenuItem>
                <MenuItem  onClick={() => navigate("/staffList")}>
                  Staff
                </MenuItem>
                
                <MenuItem>
                <Link to="/sign-up">
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                  </Link>
                </MenuItem>
                <MenuItem>
                <Link to="/sign-in">
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                  </Link>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;

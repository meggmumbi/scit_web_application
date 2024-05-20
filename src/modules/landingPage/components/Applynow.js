import React, { useState, useEffect,useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { Typography, Button, Container,Grid, CardContent,Card,Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {
    MaterialReactTable
  
  } from 'material-react-table';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import getLPTheme from '../getLPTheme';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';




function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100dvw',
                position: 'fixed',
                bottom: 24,
            }}
        >
            <ToggleButtonGroup
                color="primary"
                exclusive
                value={showCustomTheme}
                onChange={toggleCustomTheme}
                aria-label="Toggle design language"
                sx={{
                    backgroundColor: 'background.default',
                    '& .Mui-selected': {
                        pointerEvents: 'none',
                    },
                }}
            >
                <ToggleButton value>
                    <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
                    Custom theme
                </ToggleButton>
                <ToggleButton value={false}>Material Design 2</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

ToggleCustomTheme.propTypes = {
    showCustomTheme: PropTypes.shape({
        valueOf: PropTypes.func.isRequired,
    }).isRequired,
    toggleCustomTheme: PropTypes.func.isRequired,
};

export default function ApplyNowPage() {
    const tableInstanceRef = useRef(null);
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const navigate = useNavigate();


    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };
      
    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Box sx={{ bgcolor: 'background.default', py: 8, mt:10 }}>
        <Container maxWidth="lg">
          {/* Hero Section */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" align="center" gutterBottom>
              Join Our Prestigious University
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary">
              Start your journey with us and achieve your academic dreams
            </Typography>
          </Box>

          {/* Apply Now Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              onClick={() => navigate("/sign-in")}
              size="large"
              sx={{
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                px: 5,
                py: 1,
                borderRadius: 2,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              }}
            >
              Apply Now
            </Button>
          </Box>

          {/* Payment Instructions in a List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4 }}>
            <Typography component="h2" align="center" variant="h4" color="text.primary" gutterBottom>
              Payment Instructions
            </Typography>

            {/* M-Pesa Payment */}
            <Paper elevation={3} sx={{ my: 2, py: 2, px: 3, bgcolor: 'primary.light', maxWidth: 500 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PaymentIcon color="primary" sx={{ mr: 1 }} />
                <Typography align="center" variant="subtitle1" gutterBottom>
                  **To pay via M-Pesa:**
                </Typography>
              </Box>
              <Typography align="center" variant="body1">
                Go to the M-Pesa menu on your phone, select "Lipa na M-Pesa", then "Pay Bill". Enter the university's business number and account number, then enter the amount and your PIN.
              </Typography>
            </Paper>

            {/* Direct University Payment */}
            <Paper elevation={3} sx={{ my: 2, py: 2, px: 3, bgcolor: '#4ab7e0', maxWidth: 500 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AccountBalanceWalletIcon color="secondary" sx={{ mr: 1 }} />
                <Typography align="center" variant="subtitle1" gutterBottom>
                  **To pay directly to the university:**
                </Typography>
              </Box>
              <Typography align="center" variant="body1">
                Please visit the university's finance office or use the official university website to access the payment portal.
              </Typography>
            </Paper>
          </Box>

          {/* Additional Content Sections */}
          <Grid container spacing={4}>
            {/* Section 1 */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Our Programs
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Explore our wide range of academic programs and find the right fit for you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Section 2 */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Campus Life
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Discover the vibrant campus life and the numerous activities you can engage in.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Section 3 */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Alumni Success
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Read about the success stories of our alumni and how they are making a difference.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
        </ThemeProvider>
    );
}

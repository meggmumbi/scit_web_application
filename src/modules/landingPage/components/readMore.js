import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { Typography, Button, Container, Grid, CardContent, CircularProgress, Card, Paper } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import {
  MaterialReactTable

} from 'material-react-table';
import { getActivityById } from "../../../common/apis/activities";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import getLPTheme from '../getLPTheme';
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";


function decodeBase64Image(base64Image) {
  const byteCharacters = atob(base64Image); // Decode Base64 string
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const imageBlob = new Blob([byteArray], { type: 'image/jpeg' }); // Create Blob from binary array
  const imageUrl = URL.createObjectURL(imageBlob); // Create object URL from Blob
  return imageUrl;
}


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

export default function ReadMorePage() {
  const tableInstanceRef = useRef(null);
  const [mode, setMode] = useState('light');
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const navigate = useNavigate();

  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActivityById(postId);
        setPost(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant="h6" color="error">
            Error loading post data.
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }
  return (

    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box sx={{ bgcolor: 'background.default', py: 8, mt: 10 }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Paper
            sx={{
              position: 'relative',
              backgroundColor: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
              color: '#333',
              mb: 4,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundImage: `url(${post?.data?.image})`,
              ':before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'rgba(255,255,255,.3)',
              }
            }}
          >
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 }
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                {post?.data?.activityName}
              </Typography>

              <Box
                component="img"
                sx={{
                  height: 'auto',
                  maxWidth: '100%',
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                  marginBottom: 5
                }}
                src={decodeBase64Image(post?.data?.image)}
                alt={post?.data?.activityName}
              />
              <Typography variant="body1" color="inherit">
                {post?.data?.description}
              </Typography>
            </Box>
          </Paper>
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

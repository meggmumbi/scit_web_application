import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Grid, Typography, Card, CardContent, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import getLPTheme from '../getLPTheme';
import { getActivity } from "../../../common/apis/activities";
import { useQuery } from "@tanstack/react-query";
import Pagination from '@mui/material/Pagination';

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

export default function AboutUsPage() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const [activities, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };
    const { data, isLoading, error } = useQuery({
        queryKey: 'getActivity',
        queryFn: getActivity,

    });

    useEffect(() => {
        if (data?.data) {
            setData(data.data);
        }

    }, [data]);

    const aboutUs = activities.filter(activity => activity.activityType === 'About');


    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
            <Box sx={{ bgcolor: 'background.default',marginTop:"50px" }}>
                <Container
                    id="testimonials"
                    sx={{
                        pt: { xs: 4, sm: 12 },
                        pb: { xs: 8, sm: 16 },
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: { xs: 3, sm: 6 },
                    }}
                >
                    <Box
                        sx={{
                            width: { sm: '100%', md: '60%' },
                            textAlign: { sm: 'left', md: 'center' },
                        }}
                    >
                        <Typography component="h2" variant="h4" color="text.primary">
                            Our Mission
                        </Typography>
                        {aboutUs.map((aboutData) => (
                            <div key={aboutData.activityName}>
                                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                    {aboutData.mission}
                                </Typography>
                                <Box
                                    component="img"
                                    sx={{
                                        height: 233,
                                        width: 350,
                                        maxHeight: { xs: 233, md: 167 },
                                        maxWidth: { xs: 350, md: 250 },
                                    }}
                                    alt="University Image"
                                    src={decodeBase64Image(aboutData.image)}
                                />
                                <Typography variant="body1" align="center" color="text.secondary" paragraph>
                                    {aboutData.description}
                                </Typography>
                                <Typography variant="h6" align="center" color="text.primary" gutterBottom>
                                    Our Vision
                                </Typography>
                                <Typography variant="body1" align="center" color="text.secondary" paragraph>
                                    {aboutData.vision}
                                </Typography>
                            </div>

                        ))}

                    </Box>

                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

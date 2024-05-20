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
import { getstaff } from "../../../common/apis/staff";
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

export default function StaffListPage() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });

    const [staff, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };


    const { data, isLoading, error } = useQuery({
        queryKey: 'getstaff',
        queryFn: getstaff,
    });

    useEffect(() => {
        if (data?.data) {
            setData(data.data);
        }

    }, [data]);

    const totalPages = Math.ceil(staff.length / perPage);

    // Paginate the staff data
    const paginatedStaff = staff.slice((page - 1) * perPage, page * perPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

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
                            Our Staff
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            See both of our Academic and Administration Staff.
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {paginatedStaff.map((testimonial, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                                <Card
                                    sx={{
                                        maxWidth: 345,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        flexGrow: 1,
                                        p: 1,
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" color="text.secondary">
                                            <i>Specializations</i>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {testimonial.specializations}
                                        </Typography>
                                    </CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            pr: 2,
                                        }}
                                    >
                                        <CardHeader

                                            avatar={<Avatar alt={testimonial.name} src={decodeBase64Image(testimonial.image)} />}
                                            title={testimonial.name}
                                            subheader={testimonial.title}
                                        />

                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        sx={{ mt: 2, justifyContent: 'center' }}
                    />
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Grid, Typography, Card, CardActions, CardContent, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from '../components/AppAppBar';
import Footer from '../components/Footer';
import getLPTheme from '../getLPTheme';
import { getActivity } from "../../../common/apis/activities";
import { useQuery } from "@tanstack/react-query";





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

export default function AcademicListPage() {
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [selectedActivity, setSelectedActivity] = useState(null);

    const [activities, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

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

    const handleActivityClick = (activityId) => {
        setSelectedActivity(activityId === selectedActivity ? null : activityId);
    };

    const academicActivities = activities.filter(activity => activity.activityType === 'Academic');


    const getIcon = (activityName) => {
        if (activityName.toLowerCase().includes('oracle')) {
            return <img src="/oracle.svg" style={{ height: 50, marginRight: 10 }} />;
        } else if (activityName.toLowerCase().includes('microsoft')) {
            return <img src="/microsoft.svg" style={{ height: 70, marginRight: 10 }} />;
        } else if (activityName.toLowerCase().includes('huawei')) {
            return <img src="/Huawei.svg" style={{ height: 50, marginRight: 10 }} />;
        } else if (activityName.toLowerCase().includes('cisco')) {
            return <img src="/cisco.svg" style={{ height: 50, marginRight: 10 }} />;
        }
        return <img src="/school.svg" style={{ height: 50, marginRight: 10 }} />;
    };
    return (
        <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

            <Box sx={{ bgcolor: 'background.default' }}>
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
                            mb: 4,
                        }}
                    >
                        <Typography component="h2" variant="h4" color="text.primary">
                            Academic Excellence
                        </Typography>
                        
                        <Typography variant="body1" color="text.secondary">
                            Our academic programs are tailored to foster innovation, critical thinking, and scholarly excellence. Dive into a world of knowledge with our diverse range of ongoing academic activities.
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {academicActivities.map((activity) => (
                            <Grid item xs={12} sm={6} md={4} key={activity.id} sx={{ display: 'flex' }}>

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
                                        <Typography gutterBottom variant="h5" component="div">
                                            {activity.activityName}
                                        </Typography>
                                        {getIcon(activity.activityName)}
                                        <Typography variant="body2" color="text.secondary">
                                        <strong>End:</strong>  {new Date(activity.startDate).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                        <strong>End:</strong> {new Date(activity.endDate).toLocaleDateString()}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                            {expanded ? activity.description : activity.description.slice(0, 80)}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            onClick={toggleExpanded}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {expanded ? 'Show Less' : 'Read More'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="primary">
                                            Apply Now
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

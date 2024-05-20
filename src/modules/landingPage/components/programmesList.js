import React, { useState, useEffect, useRef, useMemo } from "react";
import PropTypes from 'prop-types';
import { Typography, Button, Container } from '@mui/material';
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
import { getProgrammes } from "../../../common/apis/scit";
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

export default function ProgrammeListPage() {
    const tableInstanceRef = useRef(null);
    const [mode, setMode] = React.useState('light');
    const [showCustomTheme, setShowCustomTheme] = React.useState(true);
    const LPtheme = createTheme(getLPTheme(mode));
    const defaultTheme = createTheme({ palette: { mode } });
    const [rowSelection, setRowSelection] = useState({});
    const [showMore, setShowMore] = useState({});

    const [programmes, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const toggleCustomTheme = () => {
        setShowCustomTheme((prev) => !prev);
    };

    const handleToggleShowMore = (id) => {
        setShowMore((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const { data, isLoading, error } = useQuery({
        queryKey: 'getProgrammes',
        queryFn: getProgrammes,
    });

    useEffect(() => {
        if (data?.data) {
            setData(data.data);
        }

    }, [data]);

    const columns = useMemo(
        () => [

            {
                accessorKey: 'name',
                header: 'Programme Name'
            },
            {
                accessorKey: 'programmeType',
                header: 'Programme Type'
            },
            {
                accessorKey: 'description',
                header: 'Program Requirements',
                Cell: ({ cell, row }) => (
                    <Box>
                        <Typography variant="body2" color="text.primary" component="div">
                            {showMore[row.id] ? cell.row.original.description : `${cell.row.original.description.slice(0, 100)}...`}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="primary"
                            onClick={() => handleToggleShowMore(row.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {showMore[row.id] ? 'Show Less' : 'Read More'}
                        </Typography>
                    </Box>
                ),
            },
        ],
        [showMore]
    );
    const tableTheme = useMemo(

        () =>

            createTheme({

                palette: {
                    background: {
                        default: '#fff'
                    }
                }
            })
    );

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

                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: { xs: 3, sm: 6 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: { sm: '100%', md: '60%' },
                            textAlign: 'center', // Center text for all screen sizes
                        }}
                    >
                        <Typography component="h2" variant="h4" color="text.primary" gutterBottom>
                            Programmes
                        </Typography>

                        <Typography>
                            Our university offers a diverse range of programs to cater to the academic needs and career aspirations of our students. Whether you're interested in pursuing certifications, diplomas, undergraduate, or postgraduate studies, we have programs tailored to meet your educational goals.
                        </Typography>
                    </Box>
                    <ThemeProvider theme={tableTheme}>
                        <MaterialReactTable
                            columns={columns}
                            data={programmes}
                            enableColumnActions={false}
                            onRowSelectionChange={setRowSelection}
                            state={{ rowSelection }}
                            tableInstanceRef={tableInstanceRef}
                            muiTableHeadCellProps={{
                                sx: {
                                    '& .Mui-TableHeadCell-Content': {
                                        fontSize: '18px',
                                        color: '#000',
                                        fontWeight: 'bold'
                                    },
                                },
                            }}
                            muiTableHeadCellFilterTextFieldProps={{
                                sx: {
                                    m: '1rem 0', width: '100%', fontSize: '12px',
                                    '& .MuiInputBase-root': {
                                        color: '#0E6073',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        opacity: 0.9
                                    },
                                    '& .MuiBox-root': {
                                        color: '#0E6073',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        opacity: 0.9
                                    },
                                    input: {
                                        color: '#667085',
                                        "&::placeholder": {    // <----- Add this.
                                            opacity: 0.9,
                                            color: '#0E6073',
                                        }
                                    }
                                },
                                variant: 'outlined'
                            }}


                            initialState={{
                                pagination: {
                                    pageSize: 10,
                                    pageIndex: 0
                                },
                                columnVisibility: { id: false }
                            }} muiTablePaginationProps={{
                                rowsPerPageOptions: [5, 10, 20],
                                showFirstButton: false,
                                showLastButton: false,
                                SelectProps: {
                                    native: true
                                },
                                labelRowsPerPage: 'Number of rows visible'
                            }}
                        //add custom action buttons to top-left of top toolbar

                        />
                    </ThemeProvider>

                </Container>
                <Footer />
            </Box>
        </ThemeProvider>
    );
}

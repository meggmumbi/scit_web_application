import React, { useMemo, useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

import { Card, CardContent, Typography, CardHeader,Grid, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import VillaIcon from '@mui/icons-material/Villa';
import { useQuery } from "@tanstack/react-query";
import {getApplications} from  '../../common/apis/applications'
import {getProgrammes} from  '../../common/apis/scit'
import {getstaff} from  '../../common/apis/staff'
import {getActivity} from  '../../common/apis/activities'
import {getDepartments} from  '../../common/apis/department'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    margin: '1rem',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '15px',
    '&:hover': {
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
    },
  },
  avatar: {
    backgroundColor: '#1976d2',
 
  },
  header: {
    textAlign: 'center',
    color: '#1976d2',
  },
  content: {
    textAlign: 'center',
    fontSize: '1.2rem',
  },
});

const defaultTheme = createTheme();

export default function Dashboard() {
  const [data, setData] = useState([]);
  // const [staffData, setData] = useState([]);
  // const [tableData, setData] = useState([]);
  // const [tableData, setData] = useState([]);
  const [open, setOpen] = useState(true);
  const classes = useStyles();
  
  const { data : programmesData} = useQuery({
    queryKey: 'getApplications',
    queryFn: getApplications,
  });
  const { data : staffData } = useQuery({
    queryKey: 'getstaff',
    queryFn: getstaff,
  });
  const { data : activityData } = useQuery({
    queryKey: 'getActivity',
    queryFn: getActivity,
  });
  const { data : departmentData } = useQuery({
    queryKey: 'getDepartments',
    queryFn: getDepartments,
  });
  const { data : programmes } = useQuery({
    queryKey: 'getProgrammes',
    queryFn: getProgrammes,
  });

  useEffect(() => {      
    if (programmesData?.data) {
      setData(programmesData.data);    
    }
  }, [programmesData]);
 
  
  const cardInfo = [
    { title: 'Activities', value: `${activityData?.data.length}`, icon: <AssessmentIcon /> },
    { title: 'Staff', value: `${staffData?.data.length}`, icon: <PeopleIcon /> },
    { title: 'Programmes', value: `${programmes?.data.length}`, icon: <SchoolIcon /> },
    { title: 'Department', value: `${departmentData?.data.length}`, icon: <VillaIcon /> },
  ];

  const columns = useMemo(
    () => [

      {
        accessorKey: 'fullName',
        header: 'Full Name',
        size: 150
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 150,
      },
      {
        accessorKey: 'qualifications',
        header: 'Qualifications',
        size: 150,
      }

    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>       
          <Toolbar />
          <Grid maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {cardInfo.map((info, index) => (
                <Card key={index} className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar className={classes.avatar}>
                        {info.icon}
                      </Avatar>
                    }
                    title={info.title}
                    titleTypographyProps={{ align: 'center' }}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div" align="center">
                      {info.value}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
           
           <MaterialReactTable table={table}/>
          </Grid>
       
      </Box>
    </ThemeProvider>
  );
}

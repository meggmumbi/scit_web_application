import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';
import { getstaff } from "../../../common/apis/staff";
import { useQuery, useQueryClient } from "@tanstack/react-query";


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

export default function Testimonials() {
  const theme = useTheme();
  

  const [staff, setData] = useState([]);
 
  const { data, isLoading, error } = useQuery({
    queryKey: 'getstaff',
    queryFn: getstaff,
  });

  useEffect(() => {    
    if (data?.data) {
      setData(data.data);      
    }

  }, [data]);

  const userTestimonials = staff.map(event => ({
    name: `${event.designation} ${event.name}`,
    occupation: event.title,
    avatar: <Avatar alt={event.name} src={decodeBase64Image(event.image)} />,
    testimonial: event.specializations,
   
  }));

  return (
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
        {userTestimonials.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
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
                  {testimonial.testimonial}
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
                  avatar={testimonial.avatar}
                  title={testimonial.name}
                  subheader={testimonial.occupation}
                />
                
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="outlined" color="primary" href="/staffList">
        ...click to See the Full list of our staff
      </Button>
    </Container>
  );
}

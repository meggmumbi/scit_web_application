import React, { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getActivity } from "../../common/apis/activities";
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';




const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

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


export default function Blog() {
  const [activities, setData] = useState([]);
 
  const { data, isLoading, error } = useQuery({
    queryKey: 'getActivity',
    queryFn: getActivity,

  });

  useEffect(() => {    
    if (data?.data) {
      setData(data.data);      
    }

  }, [data]);

  const ongoingEvents = activities.filter(activity => activity.activityType === 'Events' && activity.status === 'Ongoing');
  const FeaturedEvents = activities.filter(activity =>  activity.status === 'Upcoming' && activity.activityType != 'Academic');
  const directorsMessage = activities.filter(activity =>  activity.activityType === 'message');
  const pastEvents = activities.filter(activity =>  activity.status === 'Past');

  const mainFeaturedPost = ongoingEvents.map(event => ({
    title: event.activityName,
    description: event.description,
    image: decodeBase64Image(event.image), // Decode base64 image
    imageText: event.activityName,
    linkText: 'Continue reading…',
  }));

  const directorMessage = directorsMessage.map(event => ({
    title: event.activityName,
    description: event.description, 
    date: event.startDate,      
  }));

  const featuredPosts = FeaturedEvents.map(event => ({   
    date: event.startDate,   
    title: event.activityName,
    description: event.description,
    image: decodeBase64Image(event.image), // Decode base64 image
    imageLabel: event.activityName,
    linkText: 'Continue reading…',
  }));
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{marginTop:"100px"}}>
        
        <main>
        <MainFeaturedPost posts={mainFeaturedPost}  />
          <Grid container spacing={4} sx={{marginTop:"10px"}}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="Director's Message" posts={directorMessage} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
     
    </ThemeProvider>
  );
}

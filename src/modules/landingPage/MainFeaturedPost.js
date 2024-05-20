import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MainFeaturedPost(props) {
  const { posts } = props;

  const settings = {
    dots: true,
    infinite: posts.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Set the speed of automatic sliding (in milliseconds)
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + '...';
  };

  return (
    <Slider {...settings}>
      {posts.map((post, index) => (
        <Paper
          key={index}
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${post.image})`,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: 'rgba(0,0,0,.3)',
            }}
          />
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                }}
              >
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  {truncateDescription(post.description)}
                </Typography>

                <Link to={`/read-more/${post?.id}`} style={{ textDecoration: 'none' }}>
                  <Typography variant="subtitle1" color="primary" sx={{
                    color: '#ffeb3b', // Bright yellow color for high visibility
                    textDecoration: 'none', // No underline for a cleaner look
                    fontWeight: 'bold', // Bold font for better visibility
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Text shadow for contrast
                    ':hover': {
                      color: '#cddc39', // A different color on hover for interactivity
                      textDecoration: 'underline', // Underline on hover for a change in style
                    }
                  }}>
                    {post?.linkText || 'Read more'}
                  </Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Slider>
  );
}

MainFeaturedPost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default MainFeaturedPost;

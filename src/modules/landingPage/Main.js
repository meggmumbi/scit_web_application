import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';

function Main(props) {
  const { posts, title } = props;

  console.log("dir posts", posts);

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      {posts.map((post) => (
        <div key={post.title}>
          {/* <Typography variant="h6" gutterBottom>
            {post.title}
          </Typography> */}
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {new Date(post.date).toLocaleDateString()}
          </Typography>
          <Markdown className="markdown">
            {post.description}
          </Markdown>
        </div>
      ))}
    </Grid>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;

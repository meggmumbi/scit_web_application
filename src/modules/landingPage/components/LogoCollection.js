import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import { useTheme } from '@mui/system';

const whiteLogos = [
  'microsoft.svg',
  'Huawei.svg',
  'oracle.svg',
  'cisco.svg',
  
];

const darkLogos = [
  'microsoft.svg',
  'Huawei.svg',
  'oracle.svg',
  'cisco.svg',
];

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 32px',
  opacity: 0.7,
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
      >
        In Partnership with
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 0.5 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Fake company number ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

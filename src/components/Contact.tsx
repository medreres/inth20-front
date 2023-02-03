import React from 'react';
import {Grid, Link, Box} from '@mui/material';

const Contact = () => {
  return (
    <Box
     sx={{
      backgroundColor: '#A4A4A4',
      padding: "96px",
     }}
    >
      <Grid 
         container
         direction="row"
         justifyContent="space-between"
         alignItems="center"
         sx={{
          fontWeight: '700',
          fontSize: '48px',
          lineHeight: '64px',
          color: 'white',
        }}
      >
        <Grid 
          item 
          xs={6}
          sx={{
            fontWeight: '700',
            fontSize: '48px',
            lineHeight: '66px',
          }}
        >
          Any questions? Contact us
        </Grid>
        <Grid item xs={6}>
          <Link href={`mailto:infridge@gmail.com`} underline="none" color="white">
            infridge@gmail.com
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact
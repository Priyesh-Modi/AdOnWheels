import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PublisherDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: 3,
        marginTop: '80px',
      }}
    >
      <Typography variant="h4" mb={3}>
        Publisher Dashboard
      </Typography>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Ad Opportunities</Typography>
              <Typography variant="h6">View assigned ads</Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate('/publisher/ad-opportunities')}
              >
                View Ads
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Update Ad Status</Typography>
              <Typography variant="h6">Manage your assigned ads</Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => navigate('/publisher/update-ad-status')}
              >
                Update Status
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            {/* Add more features or content here */}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublisherDashboard;

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

const Dashboards = () => {
  const [stats, setStats] = useState({
    adsCount: 0,
    publishersCount: 0,
    bodyShopsCount: 0,
    pendingTasks: 0,
  });
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err.message);
      setError('Failed to load dashboard stats.');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3}>
        Admin Dashboard Overview
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Ads</Typography>
              <Typography variant="h6">{stats.adsCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Publishers</Typography>
              <Typography variant="h6">{stats.publishersCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Body Shops</Typography>
              <Typography variant="h6">{stats.bodyShopsCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Pending Tasks</Typography>
              <Typography variant="h6">{stats.pendingTasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboards;

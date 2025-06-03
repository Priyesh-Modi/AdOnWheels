import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbarr from '../navbar/Navbarr';
import Footer from '../../footer';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    adsCount: 0,
    publishersCount: 0,
    bodyShopsCount: 0,
    pendingTasks: 0,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');

      // Log token
      console.log('Fetching stats with token:', token);

      const response = await axios.get('http://localhost:5001/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log API response
      console.log('Stats API response:', response.data);

      // Update state with correct structure
      setStats({
        adsCount: response.data.adsCount,
        publishersCount: response.data.publishersCount,
        bodyShopsCount: response.data.bodyShopsCount,
        pendingTasks: response.data.pendingTasks,
      });
    } catch (err) {
      console.error('Error fetching stats:', err.message);
      console.error('Error details:', err.response?.data || 'No additional error details');

      setError('Failed to load dashboard stats. Please try again later.');
    }
  };

  useEffect(() => {
    console.log('AdminDashboard mounted');
    fetchStats();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Navbarr />

      {/* Main content */}
      <Box
        sx={{
          flex: '1 0 auto',
          padding: 3,
          marginTop: '80px',
        }}
      >
        <Typography variant="h4" mb={3}>
          Admin Dashboard
        </Typography>

        {/* Log error message if present */}
        {error && (
          <>
            <Typography color="error">{error}</Typography>
            {console.log('Error displayed to user:', error)}
          </>
        )}

        {/* Metrics Overview */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">Total Ads</Typography>
                <Typography variant="h6">{stats.adsCount}</Typography>
                {/* Log metric */}
                {console.log('Total Ads:', stats.adsCount)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">Total Publishers</Typography>
                <Typography variant="h6">{stats.publishersCount}</Typography>
                {console.log('Total Publishers:', stats.publishersCount)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">Total Body Shops</Typography>
                <Typography variant="h6">{stats.bodyShopsCount}</Typography>
                {console.log('Total Body Shops:', stats.bodyShopsCount)}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">Pending Tasks</Typography>
                <Typography variant="h6">{stats.pendingTasks}</Typography>
                {console.log('Pending Tasks:', stats.pendingTasks)}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => {
              console.log('Navigating to Manage Ads');
              navigate('/admin/manage-ads');
            }}
          >
            Manage Ads
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log('Navigating to Manage Publishers');
              navigate('/admin/manage-publishers');
            }}
          >
            Manage Publishers
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log('Navigating to Manage Body Shops');
              navigate('/admin/manage-bodyshops');
            }}
          >
            Manage Body Shops
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              console.log('Navigating to Assign Tasks');
              navigate('/admin/assign-tasks');
            }}
          >
            Assign Tasks
          </Button>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default AdminDashboard;

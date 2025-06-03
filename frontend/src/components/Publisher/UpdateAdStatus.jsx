import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateAdStatus = () => {
  const [status, setStatus] = useState('');
  const [selectedAd, setSelectedAd] = useState('');
  const [ads, setAds] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, severity: '', message: '' });
  const navigate = useNavigate();

  // Fetch ads with "Ready for Publishing" status
  const fetchAssignedAds = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/publishers/ads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response:', response.data);
      setAds(response.data.ads || []);
    } catch (err) {
      console.error('Error fetching ads:', err.message);
      setAds([]);
      setSnackbar({ open: true, severity: 'error', message: 'Failed to fetch ads. Please try again later.' });
    }
  };

  // Handle status update
  const handleUpdateStatus = async () => {
    if (!selectedAd || !status) {
      setSnackbar({ open: true, severity: 'warning', message: 'Please select an ad and status.' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:5001/api/publishers/ads/${selectedAd}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSnackbar({ open: true, severity: 'success', message: response.data.message || 'Status updated successfully!' });
      setSelectedAd('');
      setStatus('');
      fetchAssignedAds();
    } catch (err) {
      console.error('Error updating status:', err.message);
      setSnackbar({ open: true, severity: 'error', message: 'Failed to update status. Please try again.' });
    }
  };

  useEffect(() => {
    fetchAssignedAds();
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        marginTop: '80px',
      }}
    >
      <Button
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      <Typography variant="h4" mb={3}>
        Update Ad Status
      </Typography>

      <Select
        value={selectedAd}
        onChange={(e) => setSelectedAd(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>
          Select an Ad
        </MenuItem>
        {ads && ads.length > 0 ? (
          ads.map((ad) => (
            <MenuItem key={ad.adId} value={ad.adId}>
              {ad.title || 'Untitled Ad'}
            </MenuItem>
          ))
        ) : (
          <MenuItem value="" disabled>
            No Ads Available
          </MenuItem>
        )}
      </Select>

      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>
          Select Status
        </MenuItem>
        <MenuItem value="Accepted">Accepted</MenuItem>
        <MenuItem value="Declined">Declined</MenuItem>
      </Select>

      <Button variant="contained" onClick={handleUpdateStatus}>
        Update Status
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UpdateAdStatus;

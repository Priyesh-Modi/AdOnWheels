import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Snackbar,
  Alert,
  TableContainer,
  Paper,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdOpportunities = () => {
  const [adOpportunities, setAdOpportunities] = useState([]);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  // Fetch ad opportunities with status "Ready for Publishing"
  const fetchAdOpportunities = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/publishers/ads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Ad opportunities response:', response.data);

      setAdOpportunities(response.data.ads); // Update to match the response structure
    } catch (err) {
      console.error('Error fetching ad opportunities:', err.message);
      setError('Failed to fetch ad opportunities. Please try again later.');
    }
  };

  useEffect(() => {
    fetchAdOpportunities();
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        marginTop: '80px', // Adjusts for fixed navbar height
      }}
    >
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onClick={() => navigate(-1)} // Navigate back to the previous page
      >
        Back
      </Button>

      {/* Page Title */}
      <Typography variant="h4" mb={3}>
        Ad Opportunities
      </Typography>

      {/* Error Message */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Table for Ad Opportunities */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Ad Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Payment</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Advertiser</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adOpportunities.length > 0 ? (
              adOpportunities.map((ad) => (
                <TableRow key={ad.adId}>
                  <TableCell>{ad.title}</TableCell>
                  <TableCell>
                    {ad.adminPrice != null ? `$${ad.adminPrice.toLocaleString()}` : 'Not Set'}
                  </TableCell>
                  <TableCell>{ad.advertiserName}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No ad opportunities available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for Feedback */}
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

export default AdOpportunities;

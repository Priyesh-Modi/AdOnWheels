import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const ManageBodyShops = () => {
  const [bodyShops, setBodyShops] = useState([]);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ open: false, severity: 'info', message: '' });
  const navigate = useNavigate();

  // Fetch body shops
  const fetchBodyShops = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated. Token not found.');
      }

      console.log('Fetching body shops with token:', token);

      const response = await axios.get('http://localhost:5001/api/admin/bodyshops', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Body Shops API response:', response.data);
      setBodyShops(response.data.bodyShops);
    } catch (err) {
      console.error('Error fetching body shops:', err.message);
      console.error('Error details:', err.response?.data || 'No additional error details');

      if (err.response?.status === 401) {
        setError('Unauthorized access. Please log in again.');
      } else {
        setError('Failed to fetch body shops. Please try again later.');
      }
    }
  };

  // Delete body shop
  const deleteBodyShop = async (bodyShopId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated. Token not found.');
      }

      console.log(`Deleting body shop with ID: ${bodyShopId}`);

      await axios.delete(`http://localhost:5001/api/admin/bodyshops/${bodyShopId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAlert({ open: true, severity: 'success', message: 'Body shop deleted successfully!' });
      fetchBodyShops(); // Refresh the list after deletion
    } catch (err) {
      console.error('Error deleting body shop:', err.message);
      console.error('Error details:', err.response?.data || 'No additional error details');

      // Determine error type
      if (err.response?.status === 400) {
        setAlert({ open: true, severity: 'error', message: 'Invalid body shop ID. Please try again.' });
      } else if (err.response?.status === 404) {
        setAlert({ open: true, severity: 'error', message: 'Body shop not found. It may have been deleted already.' });
      } else if (err.response?.status === 401) {
        setAlert({ open: true, severity: 'error', message: 'Unauthorized access. Please log in again.' });
      } else {
        setAlert({ open: true, severity: 'error', message: 'Failed to delete body shop. Please try again later.' });
      }
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    console.log('ManageBodyShops component mounted.');
    fetchBodyShops();
  }, []);

  return (
    <Box sx={{ padding: 3,
      marginTop: '80px', }}>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
        onClick={() => navigate(-1)} // Navigate to the previous page
      >
        Back
      </Button>

      {/* Page Title */}
      <Typography variant="h4" mb={3}>
        Manage Body Shops
      </Typography>
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

      {/* Table */}
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bodyShops.length > 0 ? (
              bodyShops.map((bodyShop) => (
                <TableRow key={bodyShop._id}>
                  <TableCell>{bodyShop.name}</TableCell>
                  <TableCell>{bodyShop.email}</TableCell>
                  <TableCell>{bodyShop.contactNumber}</TableCell>
                  <TableCell>{bodyShop.address}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteBodyShop(bodyShop._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No body shops available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Snackbar for Alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ManageBodyShops;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManagePublishers = () => {
  const [publishers, setPublishers] = useState([]);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  const fetchPublishers = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/admin/publishers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPublishers(response.data.publishers);
    } catch (err) {
      console.error('Error fetching publishers:', err.message);
      setError('Failed to fetch publishers. Please try again later.');
      setSnackbar({
        open: true,
        message: 'Failed to fetch publishers. Please try again later.',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  return (
    <Box sx={{ padding: 3,
      marginTop: '80px',}}>
      {/* Back Button */}
      <Button
        variant="outlined"
        sx={{ marginBottom: 2 }}
        onClick={() => navigate(-1)} // Navigate back
      >
        Back
      </Button>

      <Typography variant="h4" mb={3}>
        Manage Publishers
      </Typography>
      {error && <Typography color="error" mb={2}>{error}</Typography>}

      <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Vehicle Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publishers.length > 0 ? (
              publishers.map((publisher) => (
                <TableRow key={publisher._id} hover>
                  <TableCell>{publisher.name}</TableCell>
                  <TableCell>{publisher.email}</TableCell>
                  <TableCell>{publisher.contactNumber}</TableCell>
                  <TableCell>
                    {publisher.vehicleDetails.vehicleType} - {publisher.vehicleDetails.vehicleNumber}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No publishers available
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

export default ManagePublishers;

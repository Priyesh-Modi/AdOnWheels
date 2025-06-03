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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  TableContainer,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageAds = () => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);
  const [adminPrice, setAdminPrice] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  // Function to format numbers with commas
  const formatNumber = (number) => {
    return number?.toLocaleString('en-US');
  };

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/admin/ads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAds(
        response.data.ads.map((adObj) => ({
          ...adObj.ad,
          advertiserName: adObj.advertiserName,
          advertiserEmail: adObj.email,
          advertiserBudget: adObj.ad.budget,
          adminPrice: adObj.ad.adminPrice || 'Not Set', // Handle null adminPrice
          advertiserId: adObj.advertiserId,
        }))
      );
    } catch (err) {
      setError('Failed to fetch ads. Please try again later.');
    }
  };

  const handleSetPrice = async () => {
    try {
        if (!adminPrice || parseFloat(adminPrice) <= 0) {
            setSnackbar({ open: true, message: 'Price must be greater than 0.', severity: 'warning' });
            return;
        }
        const token = localStorage.getItem('token');
        const response = await axios.patch(
            `http://localhost:5001/api/admin/ads/${selectedAd._id}/set-price`,
            { advertiserId: selectedAd.advertiserId, adminPrice: parseFloat(adminPrice) },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setSnackbar({ open: true, message: response.data.message || 'Price set successfully!', severity: 'success' });
        setOpenDialog(false);
        setAdminPrice('');

        // Fetch updated ads after setting the price
        fetchAds();
    } catch (err) {
        setSnackbar({
            open: true,
            message: err.response?.data?.message || 'Failed to set price. Please try again.',
            severity: 'error',
        });
    }
};

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        marginTop: '80px', // Ensure content starts below the navbar
      }}
    >
      {/* Back Button */}
      <Button variant="outlined" sx={{ marginBottom: 2 }} onClick={() => navigate(-1)}>
        Back
      </Button>

      <Typography variant="h4" mb={3}>
        Manage Ads
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Advertiser Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Advertiser Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Budget</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Admin Price</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.length > 0 ? (
              ads.map((ad) => (
                <TableRow key={ad._id} hover>
                  <TableCell>{ad.advertiserName}</TableCell>
                  <TableCell>{ad.advertiserEmail}</TableCell>
                  <TableCell>{ad.title}</TableCell>
                  <TableCell>{ad.description}</TableCell>
                  <TableCell>${formatNumber(ad.advertiserBudget)}</TableCell>
                  <TableCell>
                    {ad.adminPrice === 'Not Set' ? ad.adminPrice : `$${formatNumber(ad.adminPrice)}`}
                  </TableCell>
                  <TableCell>{ad.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      disabled={ad.status === 'Ready for Publishing' || ad.status === 'Rejected' ||ad.status === 'Accepted'||ad.status === 'Declined' }
                      onClick={() => {
                        setSelectedAd(ad);
                        setOpenDialog(true);
                      }}
                    >
                      Set Price
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No ads available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for setting price */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Set Price for Ad</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the price for the ad titled <strong>{selectedAd?.title}</strong>.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Admin Price"
            type="number"
            fullWidth
            variant="outlined"
            value={adminPrice}
            onChange={(e) => setAdminPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSetPrice}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

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

export default ManageAds;

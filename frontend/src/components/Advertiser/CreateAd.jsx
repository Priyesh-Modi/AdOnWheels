import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
    CircularProgress,
    Alert,
} from '@mui/material';
import axios from 'axios';

const CreateAd = ({ onAdd }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:5001/api/advertiser/ads',
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // onAdd(response.data.ad); // Pass the newly created ad back to the parent
            setOpen(false);
            setFormData({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                budget: '',
            });
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to create ad.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                Create Ad
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Ad</DialogTitle>
                <DialogContent>
                    {error && (
                        <Alert severity="error" style={{ marginBottom: '10px' }}>
                            {error}
                        </Alert>
                    )}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="Start Date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                type="date"
                                label="End Date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Budget"
                                name="budget"
                                type="number"
                                value={formData.budget}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? <CircularProgress size={20} /> : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreateAd;

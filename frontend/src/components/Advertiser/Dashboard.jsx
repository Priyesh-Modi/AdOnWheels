import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import CreateAd from './CreateAd';
import ListAllAds from './ListAllAds';

const AdvertiserDashboard = () => {
    const [stats, setStats] = useState({ approved: 0, pending: 0 });
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5001/api/advertiser/stats', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const advertiser = response.data;

                // Calculate the count of pending ads
                const pendingAdsCount = advertiser.ads.filter(ad => ad.status === 'Pending Approval').length;

                // Calculate the count of approved ads
                const approvedAdsCount = advertiser.ads.filter(ad => ad.status === 'Ready for Publishing').length;
                
                setStats({
                    pending: pendingAdsCount,
                    approved: approvedAdsCount
                });

            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Custom styles
    const StyledCard = styled(Card)(({ theme }) => ({
        textAlign: 'center',
        padding: '20px',
        borderRadius: '15px',
        backgroundColor: '#0072ff',
        color: '#fff',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    }));

    return (
        <Container maxWidth="lg" sx={{ marginTop: '50px', padding: 3 }}>
            {/* Dashboard Title */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        color: '#0072ff',
                        fontFamily: 'Poppins, sans-serif',
                    }}
                >
                    Advertiser's Dashboard
                </Typography>
                <CreateAd />
            </Box>

            {/* Statistics Section */}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                    <CircularProgress size={60} color="secondary" />
                </Box>
            ) : (
                <Grid container spacing={4} sx={{ marginBottom: '40px' }}>
                    <Grid item xs={12} sm={6}>
                        <StyledCard>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                {stats.approved}
                            </Typography>
                            <Typography variant="h6">Approved Ads</Typography>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledCard>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                {stats.pending}
                            </Typography>
                            <Typography variant="h6">Pending Ads</Typography>
                        </StyledCard>
                    </Grid>
                </Grid>
            )}

            {/* List of Ads */}
            <ListAllAds />
        </Container>
    );
};

export default AdvertiserDashboard;

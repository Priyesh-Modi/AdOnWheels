import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { Modal, TextField, IconButton, Paper } from "@mui/material"; //// hh
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";

const ListAllAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false); //
  const [adToEdit, setAdToEdit] = useState(null); //

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5001/api/advertiser/ads",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const adsData = response.data?.ads || [];
        setAds(adsData);
        console.log(adsData);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch ads.");
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdToEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }
      console.log("Request payload:", adToEdit);
      const response = await axios.patch(
        `http://localhost:5001/api/advertiser/ads/${adToEdit._id}`,
        adToEdit,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the ad list with edited ad
      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad._id === adToEdit._id ? { ...response.data } : ad
        )
      );
      window.location.reload();
      setEditModalOpen(false);
      setError(null);
    } catch (error) {
      setError("Failed to update ad.");
      console.error("Error updating ad:", error);
    }
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "15px",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(to top left, #00c6ff, #0072ff)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    },
    padding: "20px",
    color: "#fff",
  }));

  const handleQuoteAction = async (adId, action) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found.");
        return;
      }

      const newStatus = action === "accept" ? "Approved" : "Rejected";

      const response = await axios.patch(
        `http://localhost:5001/api/advertiser/ads/${adId}/response`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAds((prevAds) =>
        prevAds.map((ad) =>
          ad._id === adId ? { ...ad, status: newStatus } : ad
        )
      );
    } catch (error) {
      setError("Failed to process the action");
      console.error("Error handling quote action:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px", padding: 3 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#0072ff",
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
          marginBottom: "40px",
        }}
      >
        Ads Listings
      </Typography>

      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
        >
          <CircularProgress size={80} color="secondary" />
        </Box>
      )}

      {error && (
        <Alert
          severity="error"
          sx={{ marginTop: "20px", fontSize: "1rem", padding: "10px 20px" }}
        >
          {error}
        </Alert>
      )}

      {!loading && !error && ads.length === 0 && (
        <Typography
          variant="h6"
          sx={{ marginTop: "40px", textAlign: "center", color: "#7D8B8C" }}
        >
          No ads found. Please check back later.
        </Typography>
      )}

      <Grid container spacing={4}>
        {ads.map((ad) => (
          <Grid item xs={12} sm={6} md={4} key={ad._id}>
            <StyledCard>
              <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: "15px",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {ad.title}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    color: "#f1f1f1",
                    marginBottom: "20px",
                  }}
                >
                  {ad.description}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#e0e0e0",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Start Date:</strong>{" "}
                  {new Date(ad.startDate).toLocaleDateString()}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#e0e0e0",
                    marginBottom: "10px",
                  }}
                >
                  <strong>End Date:</strong>{" "}
                  {new Date(ad.endDate).toLocaleDateString()}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#e0e0e0",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Budget:</strong> ${ad.budget}
                </Typography>

                <Typography
                  sx={{
                    fontWeight: "bold",
                    color:
                      ad.status === "Approved"
                        ? "#4caf50"
                        : ad.status === "Rejected"
                        ? "#f44336"
                        : "#ff9800",
                  }}
                >
                  <strong>Status:</strong> {ad.status}
                </Typography>

                {ad.adminPrice && (
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "#ffeb3b",
                      marginTop: "20px",
                    }}
                  >
                    <strong>Admin Requoted Price:</strong> ${ad.adminPrice}
                  </Typography>
                )}

                {ad.adminPrice && ad.status === "Price Sent" && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#388E3C",
                        },
                        padding: "10px 20px",
                        fontWeight: "600",
                      }}
                      onClick={() => handleQuoteAction(ad._id, "accept")}
                    >
                      Accept
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#F44336",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#D32F2F",
                        },
                        padding: "10px 20px",
                        fontWeight: "600",
                      }}
                      onClick={() => handleQuoteAction(ad._id, "deny")}
                    >
                      Deny
                    </Button>
                  </Box>
                )}
                <IconButton
                  onClick={() => {
                    setAdToEdit(ad); // Set the current ad to be edited
                    setEditModalOpen(true); // Open the modal
                  }}
                  sx={{ color: "#fff" }}
                >
                  <EditIcon />
                </IconButton>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ padding: 4, minWidth: 400 }}>
          <Typography variant="h5" gutterBottom>
            Edit Ad
          </Typography>

          <TextField
            label="Title"
            name="title"
            value={adToEdit?.title || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={adToEdit?.description || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Budget"
            name="budget"
            type="number"
            value={adToEdit?.budget || ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setEditModalOpen(false)}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};

export default ListAllAds;

import React, { useState } from "react";
// import { Box, TextField, Button, Typography, Grid, Paper } from "@mui/material";

const CreateAd = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch("/api/ads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Ad created successfully!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error creating ad:", error);
      alert("An error occurred while creating the ad.");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}
    >
      <Grid item xs={10} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "20px", borderRadius: "8px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Create a New Ad
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              "& .MuiTextField-root": { margin: "10px 0" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Ad Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              multiline
              rows={4}
            />
            <TextField
              label="Start Date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField
              label="End Date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
            <TextField
              label="Budget ($)"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              fullWidth
              type="number"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Create Ad
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreateAd;

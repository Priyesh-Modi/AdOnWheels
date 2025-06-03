import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const servicesData = [
  {
    title: "Ad Placement",
    description:
      "Seamlessly place your advertisements on vehicles and maximize visibility. Choose from a variety of placement options to fit your marketing needs.",
    image: "https://via.placeholder.com/150",  },
  {
    title: "Real-Time Tracking",
    description:
      "Track your ad campaigns in real-time and analyze performance metrics to measure ROI effectively.",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Targeted Marketing",
    description:
      "Use our advanced algorithms to target specific locations and demographics, ensuring your ads reach the right audience.",
    image: "https://via.placeholder.com/150",
  },
  {
    title: "Customizable Campaigns",
    description:
      "Design and execute campaigns tailored to your business goals with complete control over content and duration.",
    image: "https://via.placeholder.com/150",
  },
];

const Services = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: 3,
        marginTop: "80px", // Adjust to ensure visibility below navbar
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Our Services
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Discover how AdOnWheels can help you grow your business with cutting-edge marketing solutions.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {servicesData.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, mx: "auto" }}>
              <CardMedia
                component="img"
                height="140"
                image={service.image}
                alt={service.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;

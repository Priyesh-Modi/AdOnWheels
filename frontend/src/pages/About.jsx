import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        paddingTop: "80px", // To ensure it's not hidden under the navbar
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>
          About AdOnWheels
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Welcome to AdOnWheels, your premier platform for seamless advertising
          and marketing! We connect businesses with advertisers, body shops, and
          publishers to create a smooth and effective advertising experience.
        </Typography>
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  To provide a one-stop platform for advertisers, body shops,
                  and publishers, enabling seamless advertising campaigns that
                  reach the right audience at the right time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  What We Do
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  AdOnWheels leverages cutting-edge technology to connect
                  businesses with publishers and advertisers, streamlining the
                  process of managing ad campaigns and maximizing impact.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Why Choose Us
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  With a user-friendly platform, a commitment to quality, and
                  comprehensive support, AdOnWheels empowers businesses to
                  achieve their marketing goals efficiently.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* <Box
        sx={{
          backgroundColor: "#212529",
          color: "#fff",
          padding: 3,
          marginTop: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body2">
          Have questions or need assistance? Contact us at{" "}
          <a
            href="mailto:support@adonwheels.com"
            style={{ color: "#4caf50", textDecoration: "none" }}
          >
            support@adonwheels.com
          </a>{" "}
          or call us at +1-800-555-1234.
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 2 }}>
          © 2024 AdOnWheels. All Rights Reserved.
        </Typography>
      </Box> */}
    </Box>
  );
};

export default About;

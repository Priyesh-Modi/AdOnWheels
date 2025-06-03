import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
const Footer = () => {
  const d = new Date();
  const year = d.getFullYear();
  return (
    <footer className="bg-dark text-white py-4">
      <Box
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
      </Box>
    </footer>
  );
};

export default Footer;

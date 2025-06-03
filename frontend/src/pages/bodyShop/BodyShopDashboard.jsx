import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Box,
} from "@mui/material";

const BodyShopDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState(""); // For filtering tasks based on status

  // Fetch tasks when the page loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/bodyshops/tasks", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data.tasks); // Assuming the tasks response is in { tasks: [] }
        } else {
          console.error(data.message || "Error fetching tasks");
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchTasks();
  }, []);

  // Handle task status update
  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/bodyshops/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } else {
        console.error(data.message || "Error updating task status");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: "80px", // Ensure the page content starts below the navbar
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          BodyShop Dashboard
        </Typography>

        <FormControl
          sx={{
            mt: 3, // Gap between the header and dropdown
            mb: 3,
            width: "300px", // Reduced width for the dropdown
          }}
        >
          <InputLabel id="task-status-select-label">Filter by Task Status</InputLabel>
          <Select
            labelId="task-status-select-label"
            id="taskStatus"
            value={taskStatus}
            onChange={(e) => setTaskStatus(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {/* Use Grid layout for better responsiveness */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Task ID</TableCell>
                    <TableCell>Ad Details</TableCell>
                    <TableCell>AdId</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks
                    .filter((task) => taskStatus === "" || task.status === taskStatus)
                    .map((task) => (
                      <TableRow key={task._id}>
                        <TableCell>{task._id}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{task.adId}</TableCell>
                        <TableCell>{task.status}</TableCell>
                        <TableCell>
                          {task.status === "Pending" && (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleStatusUpdate(task._id, "In Progress")}
                              fullWidth
                            >
                              Start Task
                            </Button>
                          )}
                          {task.status === "In Progress" && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleStatusUpdate(task._id, "Completed")}
                              fullWidth
                            >
                              Mark as Completed
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>

      <Box
        component="footer"
        sx={{
          backgroundColor: "#212529",
          color: "#fff",
          p: 2, // Reduced footer padding for a smaller size
          textAlign: "center",
        }}
      >
        <Typography variant="body1">About Us</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          We are the perfect bridge for you to market and advertise your products to
          reaching the right customers.
        </Typography>
        <Typography variant="body2">
          © 2024 AdOnWheels. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default BodyShopDashboard;

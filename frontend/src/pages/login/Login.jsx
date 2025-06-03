import React, { useState } from "react";
import "./Login.css";
import { Modal, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
const Login = () => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(""); // For the dropdown
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate(); // Initialize the navigation hook

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goBack = () => {
    window.history.back();
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);

    // General email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value) && value !== "") {
      setError("Enter a valid email address.");
    } else {
      setError("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    if (value.length < 6 && value !== "") {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!error && !passwordError && username && password && userType) {
      try {
        const response = await fetch("http://localhost:5001/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
            type: userType,
          }),
        });

        const data = await response.json();
        console.log(data);
        if (data.token && data.type) {
          dispatch(login({ token: data.token, type: data.type }));
        }
        console.log("Login Request Payload:", {
          email: username,
          password: password,
          type: userType,
        });

        if (response.ok) {
          alert(`Login successful! Welcome, ${userType}`);
          console.log(data.token); // Store token in localStorage or state management for authentication.

          // Navigate to the /home endpoint
          switch (userType) {
            case "Admin":
              navigate("/admin");
              break;
            case "Advertiser":
              navigate("/addashboard");
              break;
            case "Publisher":
              navigate("/publisher/dashboard");
              break;
            case "BodyShop":
              navigate("/bodyshop-dashboard");
              break;
            default:
              navigate("/");
          }
        } else {
          setApiError(data.message || "An error occurred. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setApiError("Server error. Please try again later.");
      }
    } else {
      setApiError("Please fill out all fields correctly.");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4">
        <div className="d-flex justify-content-center align-items-center mb-4 position-relative">
          <button
            className="btn btn-link back-btn"
            onClick={goBack}
            style={{ textDecoration: "none" }}
          >
            <FaArrowLeft /> Back
          </button>
          <h2 className="login-heading">Login</h2>
        </div>
        <div className="text-center">
          <form onSubmit={handleSubmit}>
            <div className="row mt-3 text-start">
              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={username}
                  onChange={handleUsernameChange}
                />
                {error && <p className="text-danger">{error}</p>}
              </div>
              <div className="col-12">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className="text-danger">{passwordError}</p>
                )}
              </div>
              <div className="col-12">
                <label htmlFor="userType" className="form-label">
                  User Type
                </label>
                <select
                  id="userType"
                  className="form-select mb-4"
                  value={userType}
                  onChange={handleUserTypeChange}
                >
                  <option value="">Select User Type</option>
                  <option value="Admin">Admin</option>
                  <option value="Advertiser">Advertiser</option>
                  <option value="Publisher">Publisher</option>
                  <option value="BodyShop">Body Shop</option>
                </select>
              </div>
            </div>
            {apiError && <p className="text-danger">{apiError}</p>}
            <div className="text-center">
              <button className="btn btn-primary btn-block mb-3" type="submit">
                Get Started
              </button>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-muted">
                <a href="#" onClick={handleShow}>
                  Forgot Password?
                </a>
              </p>
              <p className="text-muted">
                <Link to="/signup">Create Account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please contact the administrator for assistance in changing your
          password.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;

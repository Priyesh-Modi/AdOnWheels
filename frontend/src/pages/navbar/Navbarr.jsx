import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
const Navbarr = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userType = useSelector((state) => state.auth.type);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <Navbar
      bg="dark"
      className="custom-navbar-color fixed-top"
      variant="dark"
      expand="sm"
      style={{
        padding: "0",
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo-part">
          <div className="logo-img">
            <img src={logo} alt="" />
          </div>
          AdOnWheels
        </Navbar.Brand>
        <div className="d-flex align-items-center">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-2" />
        </div>
        <Navbar.Collapse id="basic-navbar-nav" className="ms-3 ">
          <Nav className="ms-auto">
            {isAuthenticated ? (
              // <Nav.Link
              //   role="button"
              //   onClick={handleLogout}
              //   className="btn-login"
              // >
              //   Logout
              // </Nav.Link>
              <>
                <span className="navbar-text me-3">
                  Welcome, <strong>{userType}</strong>!
                </span>

                <button
                  onClick={handleLogout}
                  className="btn btn-danger ms-2" // Styling for the button
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/services">
                  Services
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="btn-login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbarr;

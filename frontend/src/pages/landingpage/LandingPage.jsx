// import React from "react";
import { Container, Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import heroImg from "../../assets/hero.jpeg";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Navbarr from "../navbar/Navbarr";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Container
      fluid
      className="d-flex align-items-center flex-column flex-md-row landing"
      style={{ height: "100vh" }}
    >
      {/* <Navbarr /> */}
      <div className="d-flex flex-column desc-part gap-2">
        <h1 className="line-1">
          Welcome to{" "}
          <Badge bg="secondary" className="brand-name-color">
            AdOnWheels
          </Badge>
        </h1>
        <p className="line-2">
          This is a brief description of what we offer. Explore our services and
          find the perfect solution for your needs! We connect advertisers with
          vehicle owners to create powerful mobile ads.
        </p>
        <Button
          className="line-3"
          variant="success"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
      </div>
      <div
        className=" d-md-flex justify-content-center img-part"
        style={{ maxWidth: "500px" }}
      >
        <img
          src={heroImg}
          alt="Hero"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
    </Container>
  );
};

export default LandingPage;

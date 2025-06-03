import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Home from "./pages/home/home";
import Signup from "./pages/signup/Signup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateAd from "./components/Advertiser/CreateAd";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageAds from "./components/Admin/ManageAds";
import ManagePublishers from "./components/Admin/ManagePublishers";
import ManageBodyShops from "./components/Admin/ManageBodyShops";
import AssignTasks from "./components/Admin/AssignTasks";
import ListAllAds from "../src/components/Advertiser/ListAllAds";
import BodyShopDashboard from "./pages/bodyShop/BodyShopDashboard";
import PublisherDashboard from "./pages/Publisher/PublisherDashboard";
import AdOpportunities from "./components/Publisher/AdOpportunities";
import UpdateAdStatus from "./components/Publisher/UpdateAdStatus";
import Dashboard from "./components/Advertiser/Dashboard";
import { loadToken } from "./redux/slices/authSlice";
import Navbarr from "./pages/navbar/Navbarr";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import About from "./pages/About";
import Services from "./pages/Services";
import Footer from "./footer";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);

  if (loading) {
    // Show a loading screen while token is being loaded
    return <div>Loading App...</div>;
  }
  return (
    <Router>
      <Navbarr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/createad" element={<CreateAd />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminDashboard />} allowedType="Admin" />
          }
        />
        <Route path="/admin/manage-ads" element={<ManageAds />} />
        <Route path="/admin/manage-publishers" element={<ManagePublishers />} />
        <Route path="/admin/manage-bodyshops" element={<ManageBodyShops />} />
        <Route path="/admin/assign-tasks" element={<AssignTasks />} />
        <Route path="/ads" element={<ListAllAds />} />
        <Route
          path="/addashboard"
          element={
            <ProtectedRoute element={<Dashboard />} allowedType="Advertiser" />
          }
        />
        <Route path="/publisher/dashboard" element={<PublisherDashboard />} />
        <Route
          path="/publisher/ad-opportunities"
          element={<AdOpportunities />}
        />
        <Route
          path="/publisher/update-ad-status"
          element={<UpdateAdStatus />}
        />
        <Route path="/bodyshop-dashboard" element={<BodyShopDashboard />} />{" "}
        {/* Add the route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

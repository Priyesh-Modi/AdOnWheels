// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ element, allowedType }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const userType = useSelector((state) => state.auth.type);

//   console.log(userType);

//   // Check if the user is authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check if the user has the correct type
//   if (allowedType && userType !== allowedType) {
//     return <Navigate to="/login" replace />;
//   }

//   // If authenticated and authorized, render the component
//   return element;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, allowedType }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userType = useSelector((state) => state.auth.type);
  const loading = useSelector((state) => state.auth.loading);

  if (loading) {
    // Show a spinner or placeholder while loading
    return <div>Loading...</div>;
  }
  console.log("Auth state:", { isAuthenticated, userType }); // Debuggin

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedType && userType !== allowedType) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;

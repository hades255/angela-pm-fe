import React from "react";
import { useAuth } from "@contexts/AuthContext";
import Signin from "@pages/Signin";

const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Signin />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;

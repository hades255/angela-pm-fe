import React, { lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signin = lazy(() => import("../pages/Signin"));
const AdminMessages = lazy(() => import("../pages/AdminMessages"));
const Messages = lazy(() => import("../pages/Messages"));

const Router = () => {
  return (
    <Suspense fallback={<div className=""></div>}>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/message" element={<MessagePage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;

const MessagePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  console.log(isAuthenticated, isAdmin);
  if (!isAuthenticated) {
    navigate("/");
    return <></>;
  }

  return isAuthenticated && isAdmin ? <AdminMessages /> : <Messages />;
};

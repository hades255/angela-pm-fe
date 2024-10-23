import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Signin = lazy(() => import("../pages/Signin"));
const AdminMessages = lazy(() => import("../pages/AdminMessages"));
const Messages = lazy(() => import("../pages/Messages"));

const Router = () => {
  return (
    <Suspense fallback={<div className=""></div>}>
      <Routes>
        <Route path="/" element={<MessagePage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;

const MessagePage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  console.log(isAuthenticated, isAdmin);
  if (isAuthenticated) {
    return isAdmin ? <AdminMessages /> : <Messages />;
  }
  return <Signin />;
};

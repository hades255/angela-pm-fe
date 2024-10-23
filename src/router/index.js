import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Signin = lazy(() => import("../pages/Signin"));
const AdminMessages = lazy(() => import("../pages/AdminMessages"));
const Messages = lazy(() => import("../pages/Messages"));

const Router = () => {
  return (
    <Suspense fallback={<div className=""></div>}>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/message" element={<Messages />} />
        <Route path="/admin-message" element={<AdminMessages />} />
      </Routes>
    </Suspense>
  );
};

export default Router;

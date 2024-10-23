import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AdminMessages = lazy(() => import("../pages/AdminMessages"));
const Messages = lazy(() => import("../pages/Messages"));

const Router = () => {
  return (
    <Suspense fallback={<div className=""></div>}>
      <Routes>
        <Route path="/" element={<Messages />} />
        <Route path="/message" element={<AdminMessages />} />
      </Routes>
    </Suspense>
  );
};

export default Router;

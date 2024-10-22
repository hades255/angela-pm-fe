import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Messages = lazy(() => import("../pages/Messages"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Messages />} />
    </Routes>
  );
};

export default Router;

import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import withAuth from "../components/layouts/WithAuth";

const Signin = lazy(() => import("../pages/Signin"));
const Messages = lazy(() => import("../pages/Messages"));

const Router = () => {
  return (
    <Suspense fallback={<div className=""></div>}>
      <Routes>
        <Route path="/signin" element={Signin} />
        <Route path="/" element={withAuth(Messages)()} />
      </Routes>
    </Suspense>
  );
};

export default Router;

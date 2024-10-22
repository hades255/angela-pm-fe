import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import Sidebar from "./components/layouts/admin/sidebar";
import Header from "./components/layouts/admin/header";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;

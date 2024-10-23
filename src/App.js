import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Router from "./router";
import Sidebar from "./components/layouts/admin/sidebar";
import Header from "./components/layouts/admin/header";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Sidebar />
        <Header />
        <Router />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

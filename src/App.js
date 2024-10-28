import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@redux/store";
import { AuthProvider } from "@contexts/AuthContext";
import Router from "./router";
import Sidebar from "./components/layouts/admin/sidebar";
import Header from "./components/layouts/admin/header";
import { WebSocketProvider } from '@contexts/WebSocketContext';

function App() {
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <AuthProvider>
          <BrowserRouter>
            <Sidebar />
            <Header />
            <Router />
          </BrowserRouter>
        </AuthProvider>
      </WebSocketProvider>
    </Provider>
  );
}

export default App;

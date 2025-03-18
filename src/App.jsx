import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import UserAccount from "./pages/UserAccount";
import Claims from "./pages/Claims"; // ✅ Import the Claims page
import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/claims" element={<Claims />} /> {/* ✅ New Route */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

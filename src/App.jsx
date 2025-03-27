import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import UserAccount from "./pages/UserAccount";
import Claims from "./pages/Claims";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import "./styles/global.css";
import Bank from "./components/BankDetailsForm"
import DocumentsUpload from "./components/DocumentsUpload";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/payment" element={<Bank/>} />
            <Route path="/documents" element={<DocumentsUpload/>}/>
          </Routes>
        </Layout>
      )}
    </>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;

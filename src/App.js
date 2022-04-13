import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //also import Navigate for default routing

import { AuthContext } from "./shared/context/auth-context";

import AuthPage from "./users/pages/AuthPage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { UserAuth } from "./shared/hooks/auth-hook";
import Dashboard from "./users/pages/Dashboard";
import Count from "./count/pages/Count";

function App() {
  const {
    token,
    login,
    logout,
    UID,
    email,
    firstName,
    lastName,
    imageUrl,
    jobCode,
    permissions,
    phoneNumber,
    preferredName,
  } = UserAuth();
  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/count" exact element={<Count />} />
        <Route path="/" exact element={<Dashboard />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="*" element={<AuthPage />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        UID,
        login,
        logout,
        email,
        firstName,
        lastName,
        imageUrl,
        jobCode,
        permissions,
        phoneNumber,
        preferredName,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

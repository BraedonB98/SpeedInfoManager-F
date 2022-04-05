import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //also import Navigate for default routing

import { AuthContext } from "./shared/context/auth-context";

import AuthPage from "./users/pages/AuthPage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { UserAuth } from "./shared/hooks/auth-hook";
import Dashboard from "./users/pages/Dashboard";

function App() {
  //return <h1>Let's start!</h1>;
  const { token, login, logout, UID } = UserAuth();
  let routes;
  if (token) {
    routes = (
      <Routes>
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

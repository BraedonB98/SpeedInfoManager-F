import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //also import Navigate for default routing

import { AuthContext } from "./shared/context/auth-context";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { UserAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

import AuthPage from "./users/pages/AuthPage";
const Dashboard = React.lazy(() => import("./users/pages/Dashboard"));
const Count = React.lazy(() => import("./count/pages/Count"));
const Parts = React.lazy(() => import("./parts/pages/Parts"));
const Kart = React.lazy(() => import("./kart/pages/KartOrder"));

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
        <Route path="/parts" exact element={<Parts />} />
        <Route path="/count" exact element={<Count />} />
        <Route path="/kart" exact element={<Kart />} />
        <Route path="/" exact element={<Dashboard />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/kart" exact element={<Kart />} />
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
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

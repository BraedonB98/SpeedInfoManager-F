import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //also import Navigate for default routing

import AuthPage from "./.user/pages/authpage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

function App() {
  //return <h1>Let's start!</h1>;
  console.log("test");
  let routes;
  routes = (
    <Routes>
      <Route path="/" exact element={<AuthPage />} />
    </Routes>
  );
  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
      <footer className="Footer">
        Copyright 2016. Monument Dental. All Rights Reserved.
      </footer>
    </Router>
  );
}

export default App;

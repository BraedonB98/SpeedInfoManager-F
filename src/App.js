import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; //also import Navigate for default routing

import AuthPage from "./users/pages/AuthPage";
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
    </Router>
  );
}

export default App;

import React, { useContext, useState } from "react";
import NavItem from "./NavItem";
import DropDownMenu from "../UIElements/DropDownMenu";
import DropDownItem from "../UIElements/DropDownItem";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

import "./styling/NavLinks.css";

const NavLinks = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext); //eslint-disable-next-line
  const imageUrl = auth.imageUrl;
  const [showUserDropDown, setShowUserDropDown] = useState();
  const settingsHandler = (event) => {
    event.preventDefault();
    setShowUserDropDown(false);
    navigate("/userpreferences");
  };
  const logoutHandler = (event) => {
    setShowUserDropDown(false);
    auth.logout();
  };
  return (
    <ul className="nav-links">
      {!auth.isLoggedIn && (
        <NavItem to="/kart" title={"Kart Tracker"}></NavItem>
      )}
      <NavItem to="/" title={auth.isLoggedIn ? "DashBoard" : "Login"}></NavItem>
      {auth.isLoggedIn && <NavItem to="/count" title={"Count"}></NavItem>}
      {auth.isLoggedIn && <NavItem to="/parts" title={"Parts"}></NavItem>}
      {auth.isLoggedIn && <NavItem to="/kart" title={"Kart Tracker"}></NavItem>}

      {auth.isLoggedIn && props.userDropDown && (
        <NavItem
          className="Nav-Item__Button"
          //!icon={`${process.env.REACT_APP_ASSET_URL}${imageUrl}`} //change it back to this after users can upload images
          icon={`./images/default.svg`}
          onOpen={(event) => {
            setShowUserDropDown(!showUserDropDown);
          }}
        >
          {showUserDropDown && (
            <DropDownMenu>
              <DropDownItem onClick={settingsHandler}>Settings</DropDownItem>
              <DropDownItem onClick={logoutHandler}>Logout</DropDownItem>
            </DropDownMenu>
          )}
          <h1>&nbsp;&nbsp;&nbsp;&nbsp;</h1>{" "}
          {/*!probably should just do this in css but its a temp solution ^*/}
        </NavItem>
      )}
      {auth.isLoggedIn && !props.userDropDown && (
        <React.Fragment>
          <NavItem to="/userpreferences" title={"Settings"}></NavItem>
          <button onClick={auth.logout}>LOGOUT</button>
        </React.Fragment>
      )}
    </ul>
  );
};

export default NavLinks;

import React, { useContext, useState } from "react";
import NavItem from "./NavItem";
import DropDownMenu from "../UIElements/DropDownMenu";
import DropDownItem from "../UIElements/DropDownItem";
import { AuthContext } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

import "./styling/NavLinks.css";

const NavLinks = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
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
      <NavItem to="/" title={auth.isLoggedIn ? "DashBoard" : "Login"}></NavItem>
      {auth.isLoggedIn && <NavItem to="/count" title={"Count"}></NavItem>}
      {auth.isLoggedIn && <NavItem to="/parts" title={"Parts"}></NavItem>}

      {auth.isLoggedIn && (
        <NavItem
          className="Nav-Item__Button"
          icon={`${process.env.REACT_APP_ASSET_URL}${imageUrl}`}
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
    </ul>
  );
};

export default NavLinks;

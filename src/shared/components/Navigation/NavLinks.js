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
  const closeDropDownHandler = () => {
    setShowUserDropDown(false);
  };
  return (
    <ul className="nav-links">
      <NavItem to="/" title={auth.isLoggedIn ? "DashBoard" : "Login"}></NavItem>

      {auth.isLoggedIn && (
        <NavItem
          className="Nav-Item__Button"
          icon={`${
            process.env.REACT_APP_ASSET_URL
          }/${"data/images/default.svg"}`}
          onOpen={(event) => {
            setShowUserDropDown(!showUserDropDown);
            console.log(showUserDropDown);
          }}
        >
          {showUserDropDown && (
            <DropDownMenu>
              <DropDownItem onClick={settingsHandler}>Settings</DropDownItem>
              <DropDownItem onClick={logoutHandler}>Logout</DropDownItem>
            </DropDownMenu>
          )}
        </NavItem>
      )}
    </ul>
  );
};

export default NavLinks;

import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import StoreMenu from "../components/StoreMenu";

import "./styling/Count.css";

const Count = () => {
  const auth = useContext(AuthContext);
  const stores = auth.permissions.map((permission) => {
    return (
      <li className="count__storeMenuListItem" key={permission.storeID}>
        <StoreMenu storeNumber={permission.storeId} />
      </li>
    );
  });
  return (
    <div className="count">
      <h1>Inventory</h1>
      <ul className="count__storeMenuList">{stores}</ul>
    </div>
  );
};

export default Count;

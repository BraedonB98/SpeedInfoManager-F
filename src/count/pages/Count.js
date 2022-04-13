import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import StoreMenu from "../components/StoreMenu";

const Count = () => {
  const auth = useContext(AuthContext);
  console.log(auth.permissions);
  const stores = auth.permissions.map((permission) => {
    return (
      <li key={permission.storeID}>
        <StoreMenu storeNumber={permission.storeId} />
      </li>
    );
  });
  return (
    <div className="Text__Body">
      <h1>Inventory</h1>
      {stores}
    </div>
  );
};

export default Count;

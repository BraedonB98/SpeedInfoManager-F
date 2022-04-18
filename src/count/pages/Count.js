import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import StoreMenu from "../components/StoreMenu";
import ActiveCounter from "../components/ActiveCounter";

import "./styling/Count.css";

const Count = () => {
  const [activeCount, setActiveCount] = useState();
  const auth = useContext(AuthContext);
  const stores = auth.permissions.map((permission) => {
    return (
      <li className="count__storeMenuListItem" key={permission.storeID}>
        <StoreMenu
          activateCount={(countInfo) => {
            activateCountHandler(countInfo);
          }}
          storeNumber={permission.storeId}
        />
      </li>
    );
  });

  const activateCountHandler = (countInfo) => {
    setActiveCount(countInfo);
  };

  const closeCountHandler = () => {
    console.log("closing count");
    setActiveCount(null);
  };

  return (
    <div className="count">
      {!activeCount && (
        <React.Fragment>
          <h1 className="center">Inventory</h1>
          <ul className="count__storeMenuList">{stores}</ul>
        </React.Fragment>
      )}
      {activeCount && (
        <ActiveCounter
          store={activeCount.store}
          action={activeCount.action}
          closeCount={closeCountHandler}
        />
      )}
    </div>
  );
};

export default Count;

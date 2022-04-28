import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import StoreMenu from "../components/StoreMenu";
import ActiveCounter from "../components/ActiveCounter";

import "./styling/Count.css";

const Count = () => {
  const [activeCount, setActiveCount] = useState();
  const auth = useContext(AuthContext);
  const activateCountHandler = (countInfo) => {
    setActiveCount(countInfo);
  };

  const closeCountHandler = () => {
    setActiveCount(null);
  };
  const submitCountHandler = (store) => {
    console.log("submitting count");
    //!get store -- not all stores passed in may be accurate

    var tempStore = store; //!can get rid of temp store because I am no longer on use state
    tempStore.inventoryCountHistory.push(tempStore.activateInventoryCount); //saves from needing to send back revised store between backend and frontend
    tempStore.activateInventoryCount = null;
    //console.log(tempStore);
    //! try {
    //   await sendRequest(
    //     `${process.env.REACT_APP_BACKEND_API_URL}/inventory/countNext/`,
    //     "PATCH",
    //     JSON.stringify({ sid: store.storeNumber }),
    //     {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${auth.token}`,
    //     }
    //   );
    //   setStore(tempStore);
    //   setActiveCount(null);
    // } catch (error) {}
  };

  const stores = auth.permissions.map((permission) => {
    return (
      <li className="count__storeMenuListItem" key={permission.storeID}>
        <StoreMenu
          activateCount={(countInfo) => {
            activateCountHandler(countInfo);
          }}
          submitCount={submitCountHandler}
          storeNumber={permission.storeId}
        />
      </li>
    );
  });

  return (
    <div className="count">
      {!activeCount && (
        <React.Fragment>
          <h1 className="center">Inventory</h1>
          <ul className="count__store-menu-list">{stores}</ul>
        </React.Fragment>
      )}
      {activeCount && (
        <ActiveCounter
          store={activeCount.store}
          action={activeCount.action}
          closeCount={closeCountHandler}
          submitCount={submitCountHandler}
        />
      )}
    </div>
  );
};

export default Count;

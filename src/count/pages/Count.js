import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import StoreMenu from "../components/StoreMenu";
import ActiveCounter from "../components/ActiveCounter";
import ReviewCount from "../components/ReviewCount";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./styling/Count.css";

const Count = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [activeCount, setActiveCount] = useState();
  const auth = useContext(AuthContext);
  const activateCountHandler = (countInfo) => {
    setActiveCount(countInfo);
  };

  const closeCountHandler = () => {
    setActiveCount(null);
  };
  const submitCountHandler = async (store) => {
    console.log(store.storeNumber);
    try {
      const closedCount = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API_URL}/inventory/closeCount/`,
        "PATCH",
        JSON.stringify({ sid: store.storeNumber }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setActiveCount(closedCount);
    } catch (error) {}
  };

  const viewCountHandler = (store) => {
    const getCount = async (cid) => {
      let count;
      try {
        count = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/inventory/${cid}`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        setActiveCount(count);
      } catch (error) {
        console.log(error);
      }
    };
    if (store.inventoryCountHistory.length !== 0) {
      getCount(
        //!eventually display all counts by date, then when user selects one, pull it up
        store.inventoryCountHistory[store.inventoryCountHistory.length - 1]
      );
    }
  };

  const stores = auth.permissions.map((permission) => {
    return (
      <li className="count__storeMenuListItem" key={permission.storeID}>
        <StoreMenu
          activateCount={(countInfo) => {
            activateCountHandler(countInfo);
          }}
          submitCount={submitCountHandler}
          viewCounts={viewCountHandler}
          storeNumber={permission.storeId}
        />
      </li>
    );
  });

  return (
    <div className="count">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!activeCount && (
        <React.Fragment>
          <h1 className="center">Inventory</h1>
          <ul className="count__store-menu-list">{stores}</ul>
        </React.Fragment>
      )}
      {activeCount && !activeCount.complete && (
        <ActiveCounter
          store={activeCount.store}
          action={activeCount.action}
          closeCount={closeCountHandler}
          submitCount={submitCountHandler}
        />
      )}
      {activeCount && activeCount.complete && (
        <ReviewCount count={activeCount} />
      )}
    </div>
  );
};

export default Count;

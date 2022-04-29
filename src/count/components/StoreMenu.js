import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./styling/StoreMenu.css";

const StoreMenu = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [activeCount, setActiveCount] = useState();
  const [store, setStore] = useState();

  useEffect(() => {
    const getStore = async () => {
      let responseData;
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/store/store/${props.storeNumber}`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
        setStore(responseData);
        setActiveCount(!!responseData.activeInventoryCount);
      } catch (error) {
        console.log(error);
      }
    };
    getStore();
  }, [props.storeNumber, sendRequest, auth.token]);

  const runCount = (type) => {
    const count = { store: store, action: type };
    props.activateCount(count);
  };
  const closeCountHandler = async () => {
    props.submitCount(store);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card>
        {isLoading && <LoadingSpinner asOverlay />}
        {store && (
          <h2 className="center">{`${store.name} (${props.storeNumber})`}</h2>
        )}
        <div className="store-menu__navigation-buttons">
          {!activeCount && (
            <Button
              className="store-menu__navigation-button-item"
              onClick={() => {
                runCount("StartCount");
              }}
            >
              Start Count
            </Button>
          )}
          {!activeCount && (
            <Button
              className="store-menu__navigation-button-item"
              onClick={() => {
                props.viewCounts(store);
              }}
            >
              Retrieve Count
            </Button>
          )}
          {activeCount && (
            <Button
              className="store-menu__navigation-button-item"
              onClick={() => {
                runCount("ContinueCount");
              }}
            >
              Continue Count
            </Button>
          )}
          {activeCount && (
            <Button
              className="store-menu__navigation-button-item"
              onClick={() => {
                runCount("RestartCount");
              }}
            >
              Restart Count
            </Button>
          )}
          {activeCount && (
            <Button
              className="store-menu__navigation-button-item"
              onClick={() => {
                closeCountHandler();
              }}
            >
              Submit Count
            </Button>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default StoreMenu;

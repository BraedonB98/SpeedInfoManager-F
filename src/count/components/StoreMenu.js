import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const StoreMenu = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [activeCount, setActiveCount] = useState();
  //const [finishedCount, setFinishedCount] = useState();
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
      } catch (error) {
        console.log(error);
      }
      if (!error) {
        setStore(responseData);
        setActiveCount(!!responseData.activeInventoryCount);
        //setFinishedCount(responseData.activeInventoryCount.length !== 0);
      }
    };
    getStore();
  }, [props.storeNumber, sendRequest, auth.token]);

  const runCount = (type) => {
    const count = { store: store, action: type };
    props.activateCount(count);
  };
  const generateCountHandler = (type) => {
    props.generateCount(store);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card>
        {isLoading && <LoadingSpinner asOverlay />}
        {store && <h2>{`${store.name} - ${props.storeNumber}`}</h2>}
        {!activeCount && (
          <Button
            onClick={() => {
              runCount("StartCount");
            }}
          >
            Start Count
          </Button>
        )}
        {/* {!activeCount && (
        <Button
          onClick={() => {
            generateCountHandler();
          }}
        >
          Generate Count
        </Button>
      )} */}
        {activeCount && (
          <Button
            onClick={() => {
              runCount("ContinueCount");
            }}
          >
            Continue Count
          </Button>
        )}
        {activeCount && (
          <Button
            onClick={() => {
              runCount("RestartCount");
            }}
          >
            Restart Count
          </Button>
        )}
      </Card>
    </React.Fragment>
  );
};

export default StoreMenu;

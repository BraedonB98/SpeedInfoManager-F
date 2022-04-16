import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

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
      } catch (error) {
        console.log(error);
      }
      if (!error) {
        setStore(responseData);
        setActiveCount(!!responseData.activeCount);
      }
    };
    getStore();
  }, [props.storeNumber, sendRequest, auth.token]);

  const runCount = (type) => {
    const count = { store: store, action: type };
    props.activateCount(count);
  };

  return (
    <Card>
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
  );
};

export default StoreMenu;

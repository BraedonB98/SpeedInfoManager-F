import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

const StoreMenu = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [activeCount, setActiveCount] = useState();

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
        setActiveCount(!!responseData.activeCount);
      }
      console.log(responseData);
    };
    getStore();
  }, [props.storeNumber, sendRequest, auth.token]);

  const startCount = () => {
    console.log("starting count");
  };

  return (
    <Card>
      Store {props.storeNumber}
      {!activeCount && <Button onClick={startCount}>Start Count</Button>}
      {activeCount && <Button>Continue Count</Button>}
      {activeCount && <Button>Restart Count</Button>}
    </Card>
  );
};

export default StoreMenu;

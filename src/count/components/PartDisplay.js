import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";

const PartDisplay = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [activePart, setActivePart] = useState(); //part object of partnumber

  useEffect(() => {
    const getPart = async () => {
      let responseData;
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/part/${props.partNumber}`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
      } catch (error) {
        console.log(error);
      }
      if (responseData) {
        setActivePart(responseData);
      }
    };
    getPart();
  }, [props.partNumber, props.store, sendRequest, auth.token]);

  return (
    <React.Fragment>
      <h1 className="center">{props.store.name}</h1>
      <Card>
        {activePart && <h2>{props.store.name}</h2>}
        {activePart && <Button>Start Count</Button>}
        {activePart && <Button>Continue Count</Button>}
        {activePart && <Button>Restart Count</Button>}
      </Card>
    </React.Fragment>
  );
};

export default PartDisplay;

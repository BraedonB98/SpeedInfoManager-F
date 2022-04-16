import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PartDisplay from "./PartDisplay";

const ActiveCounter = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [activePart, setActivePart] = useState("059283"); //

  useEffect(() => {
    const startCount = async () => {}; //!put in the call to back end to start count
    const resumeCount = async () => {}; //find active count and get part number at the start of to count
    const restartCount = async () => {}; //!need to make backend be able to restart count
    if (props.action === "StartCount") {
      startCount();
    } else if (props.action === "ContinueCount") {
      resumeCount();
    } else if (props.action === "RestartCount") {
      restartCount();
    }
  }, [props.store, sendRequest, auth.token, props.action]);

  return (
    <React.Fragment>
      <h1 className="center">{props.store.name}</h1>
      <Card>
        {activePart && (
          <PartDisplay store={props.store} partNumber={activePart} />
        )}
      </Card>
    </React.Fragment>
  );
};

export default ActiveCounter;

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PartDisplay from "./PartDisplay";

const ActiveCounter = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [activePart, setActivePart] = useState();
  const [activeCount, setActiveCount] = useState();

  useEffect(() => {
    const startCount = async () => {
      console.log("starting count");
      let time = new Date();
      let newCount = {
        name: props.store.name,
        sid: props.store.storeNumber,
        notes: `${time.getMonth()}/
        ${time.getDate()}/
        ${time.getFullYear()}
        -${auth.firstName}-
        ${auth.lastName}`,
      };
      try {
        const count = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/inventory/count/`,
          "POST",
          JSON.stringify(newCount),
          {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          }
        );
        setActiveCount(count);
        setActivePart(count.status.toCount[0]);
        //!set next active part here
      } catch (err) {}
    };
    const resumeCount = async () => {
      console.log("resuming count");
      let responseData;
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/inventory/${props.store.activeInventoryCount}`,
          "GET",
          null,
          { Authorization: `Bearer ${auth.token}` }
        );
      } catch (error) {
        console.log(error);
      }
      if (responseData) {
        console.log(responseData);
        setActiveCount(responseData);
        setActivePart(responseData.status.toCount[0]);
      }
    }; //find active count and get part number at the start of to count
    const restartCount = async () => {}; //!need to make backend be able to restart count
    console.log(props.action);
    if (props.action === "StartCount") {
      startCount();
    } else if (props.action === "ContinueCount") {
      resumeCount();
    } else if (props.action === "RestartCount") {
      restartCount();
    }
  }, [props.store, sendRequest, auth, props.action]);

  const nextHandler = async (counted) => {
    try {
      let partCount = {
        pid: activePart,
        cid: activeCount._id,
        counted: counted.value,
      };
      const nextPart = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API_URL}/inventory/countNext/`,
        "PATCH",
        JSON.stringify(partCount),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setActivePart(nextPart);
    } catch (err) {}
  };
  const previousHandler = async () => {
    try {
      let requestData = {
        cid: activeCount._id,
      };
      const prevPart = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API_URL}/inventory/undoCount/`,
        "PATCH",
        JSON.stringify(requestData),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setActivePart(prevPart);
    } catch (err) {}
  };
  const postponeHandler = () => {};

  return (
    <React.Fragment>
      <h1 className="center">{props.store.name}</h1>
      <Card>
        {activePart && activeCount && (
          <PartDisplay
            store={props.store}
            partNumber={activePart}
            previousPart={true} //!needs to be updated to keep track of if there is a previous part
            onNext={(count) => {
              nextHandler(count);
            }}
            onPrevious={previousHandler}
            onPostpone={postponeHandler}
          />
        )}
      </Card>
    </React.Fragment>
  );
};

export default ActiveCounter;

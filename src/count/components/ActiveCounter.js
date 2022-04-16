import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PartDisplay from "./PartDisplay";

const ActiveCounter = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [activePart, setActivePart] = useState("059283");
  const [activeCount, setActiveCount] = useState();

  useEffect(() => {
    const startCount = async () => {
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
        //!set next active part here
      } catch (err) {}
    };
    const resumeCount = async () => {
      let responseData;
      try {
        responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/count/${props.store.activeInventoryCount}`,
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
    }; //find active count and get part number at the start of to count
    const restartCount = async () => {}; //!need to make backend be able to restart count
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
        counted: counted,
      };
      const count = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API_URL}/inventory/countNext/`,
        "PATCH",
        JSON.stringify(partCount),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setActiveCount(count);
      //!set active part to next in array
    } catch (err) {}
  };
  const previousHandler = () => {};
  const postponeHandler = () => {};

  return (
    <React.Fragment>
      <h1 className="center">{props.store.name}</h1>
      <Card>
        {activePart && (
          <PartDisplay
            store={props.store}
            partNumber={activePart}
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

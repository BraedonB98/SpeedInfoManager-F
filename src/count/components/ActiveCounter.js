import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PartDisplay from "./PartDisplay";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./styling/ActiveCounter.css";

const ActiveCounter = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [activePart, setActivePart] = useState();
  const [activeCount, setActiveCount] = useState();
  const [previousPart, setPreviousPart] = useState(false);

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
        console.log(count.status.counted.length);
        setActivePart(count.status.toCount[0]);
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
        setPreviousPart(responseData.status.counted.length !== 0);
        setActivePart(responseData.status.toCount[0]);
      }
    };
    //find active count and get part number at the start of to count
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
      const tempCount = activeCount;
      tempCount.status.counted.push({ partNumber: activePart, value: counted });
      tempCount.status.toCount.shift();
      setActiveCount(tempCount);
      setActivePart(nextPart);
      setPreviousPart(true);
    } catch (error) {}
  };
  const previousHandler = async () => {
    try {
      const prevPart = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API_URL}/inventory/undoCount/`,
        "PATCH",
        JSON.stringify({ cid: activeCount._id }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );
      const tempCount = activeCount;
      tempCount.status.toCount.unshift(
        tempCount.status.counted[tempCount.status.counted.length - 1].partNumber //get the last part number in the counter array
      );
      tempCount.status.counted.pop();
      setActiveCount(tempCount);
      setActivePart(prevPart);
      setPreviousPart(activeCount.status.counted.length !== 0);
    } catch (error) {}
  };
  const postponeHandler = () => {};

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <Card>
        <div className="active-counter__header">
          <Button
            className="active-counter__header-close-button-item"
            onClick={() => {
              props.closeCount();
            }}
          >
            Home
          </Button>
          <h1 className="active-counter__header-title center">
            {props.store.name}
          </h1>
          <Button
            className="active-counter__header-submit-button-item"
            onClick={() => {
              props.submitCount(props.store);
            }}
          >
            Submit
          </Button>
        </div>
        {isLoading && <LoadingSpinner asOverlay />}

        {activePart && activeCount && (
          <PartDisplay
            store={props.store}
            partNumber={activePart}
            previousPart={previousPart}
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

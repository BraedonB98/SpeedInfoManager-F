import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import NewPartModal from "../../parts/components/NewPartModal";

import "./styling/PartDisplay.css";

const PartDisplay = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [newPart, setNewPart] = useState(false);
  const [activePart, setActivePart] = useState(); //part object of partnumber

  const [formState, inputHandler, setFormData] = useForm(
    {
      number: {
        value: 0,
        isValid: false,
      },
    },
    false
  );

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
        setActivePart(responseData);
      } catch (error) {
        setActivePart(null);
        console.log(error);
      }
    };
    getPart();
  }, [props.partNumber, props.store, sendRequest, auth.token]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <NewPartModal
        onClear={() => {
          setNewPart(false);
        }}
        onSubmit={(partSubmitted) => {
          setNewPart(false);
          setActivePart(partSubmitted);
        }}
        open={newPart}
      />
      <Card className="part-display__content">
        {isLoading && <LoadingSpinner className="center" />}
        {!activePart && (
          <React.Fragment>
            <h2 className="center">{`There seems to be an issue finding ${props.partNumber}`}</h2>
            <div className="part-display__navigation-buttons">
              <Button
                className="part-display__navigation-button-item"
                onClick={() => {
                  props.onPrevious();
                }}
              >
                Previous
              </Button>
              <Button
                className="part-display__navigation-button-item"
                onClick={() => {
                  setNewPart(true);
                }}
              >
                New Part
              </Button>
            </div>
          </React.Fragment>
        )}
        {activePart && (
          <h2 className="part-display__header ">{activePart.partNumber}</h2>
        )}
        {activePart && (
          <h4 className="part-display__header">{activePart.name}</h4>
        )}

        {activePart && activePart.imageUrl && (
          <img
            className="part-display__part-image"
            src={`${process.env.REACT_APP_ASSET_URL}/${activePart.imageUrl}`}
            alt={activePart.partNumber}
          />
        )}
        {activePart && !activePart.imageUrl && (
          <img
            className="part-display__logo-image center"
            src={`/images/K1SpeedLogo.png`}
            alt="default logo(not available)"
          />
        )}
        {activePart && (
          <Input
            className="part-display__count-input"
            id="number"
            element="input"
            type="text"
            label="Counted"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid number."
            onInput={inputHandler}
            initialValue={""}
            initialValid={false}
          />
        )}
        <div className="part-display__navigation-buttons">
          {activePart && (
            <Button
              className="part-display__navigation-button-item"
              type="submit"
              onClick={props.onPrevious}
              disabled={!props.previousPart}
            >
              Previous
            </Button>
          )}
          {activePart && (
            <Button
              type="submit"
              onClick={props.onPostpone}
              className="part-display__navigation-button-item"
            >
              Postpone
            </Button>
          )}
          {activePart && (
            <Button
              type="submit"
              className="part-display__navigation-button-item"
              onClick={() => {
                props.onNext(formState.inputs.number);
              }}
              disabled={!formState.isValid}
            >
              Next
            </Button>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default PartDisplay;

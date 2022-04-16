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

import "./styling/PartDisplay.css";

const PartDisplay = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
        console.log("here");
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
        console.log(responseData);
      }
    };
    getPart();
  }, [props.partNumber, props.store, sendRequest, auth.token]);

  const nextHandler = () => {};
  const previousHandler = () => {};
  const postponeHandler = () => {};

  return (
    <React.Fragment>
      <Card>
        {activePart && <h2 className="center">{activePart.partNumber}</h2>}
        {activePart && <h4 className="center">{activePart.name}</h4>}
        {activePart && activePart.imageUrl && (
          <img
            className="part-display__part-image center"
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
            className="new-item-modal__text-input new-item-modal__input"
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
        {activePart && (
          <Button type="submit" onClick={previousHandler}>
            Previous
          </Button>
        )}
        {activePart && (
          <Button type="submit" onClick={postponeHandler}>
            Postpone
          </Button>
        )}
        {activePart && (
          <Button
            type="submit"
            onClick={nextHandler}
            disabled={!formState.isValid}
          >
            Next
          </Button>
        )}
      </Card>
    </React.Fragment>
  );
};

export default PartDisplay;

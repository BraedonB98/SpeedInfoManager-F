import React, { useState, useContext } from "react";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Modal from "../../shared/components/UIElements/Modal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const NewPartModal = (props) => {
  const auth = useContext(AuthContext);
  const uid = auth.UID;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      partNumber: {
        value: "",
        isValid: false,
      },

      description: {
        value: "",
        isValid: false,
      },

      notes: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      let partNew = {
        name: formState.inputs.name.value,
        partNumber: formState.inputs.partNumber.value,
        description: formState.inputs.description.value,
        notes: formState.inputs.notes.value,
        uid: uid,
      };

      const newPart = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API_URL}/todo/createItem`, //!update this address
        "POST",
        JSON.stringify(partNew),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        }
      );

      props.submitted(newPart);
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <Modal
        onCancel={() => {
          props.onClear();
        }}
        header={`New Part`}
        className="to-do-item-modal"
        headerClass="to-do-item-modal__header"
        contentClass="to-do-item-modal__content"
        footerClass="to-do-item-modal__footer"
        show={props.open}
        footer={
          <React.Fragment>
            <Button
              className="to-do-item-modal__button"
              onClick={() => {
                props.onClear();
              }}
            >
              Cancel
            </Button>
            <Button
              className="to-do-item-modal__button"
              type="submit"
              onClick={submitHandler}
              disabled={!formState.isValid}
            >
              {" "}
              Submit{" "}
            </Button>{" "}
          </React.Fragment>
        }
      >
        <div id="new-item-modal__form">
          <Input
            className="new-item-modal__text-input new-item-modal__input"
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid part name."
            onInput={inputHandler}
            initialValue={""}
            initialValid={false}
          />
          <Input
            className="new-item-modal__text-input new-item-modal__input"
            id="partNumber"
            element="input"
            type="text"
            label="Part Number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid part name."
            onInput={inputHandler}
            initialValue={""}
            initialValid={false}
          />
          <Input
            className="new-item-modal__text-input"
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={""}
            initialValid={false}
          />
          <Input
            className="new-item-modal__text-input"
            id="notes"
            element="textarea"
            label="Notes"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid note (at least 5 characters)."
            onInput={inputHandler}
            initialValue={""}
            initialValid={false}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default NewPartModal;

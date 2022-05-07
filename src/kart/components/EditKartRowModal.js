import React, { useReducer, useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const EditKartRowModal = (props) => {
  const [karts, setKarts] = useState(props.kartPreset);
  const [kartCount, setKartCount] = useState(props.kartPreset.length);
  const [formState, inputHandler] = useForm(
    {
      kartCount: {
        value: props.kartCount,
        isValid: true,
      },
      kartsInRow: {
        value: props.kartPreset,
        isValid: true,
      },
    },
    true
  );

  const kartCountOptions = props.kartOptions.map((countOption) => {
    return <option value={countOption}>{countOption}</option>;
  });

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(formState.inputs.kartCount.value); //!WHY IS THIS READING 0!!! the input js is outputing the correct value on change
    props.onClear();
  };

  return (
    <React.Fragment>
      <Modal
        onCancel={() => {
          props.onClear();
        }}
        header={`Edit Row ${props.row + 1}`}
        className="edit-kart-row-modal"
        headerClass="edit-kart-row-modal__header"
        contentClass="edit-kart-row-modal__content"
        footerClass="edit-kart-row-modal__footer"
        show={props.open}
        footer={
          <React.Fragment>
            <Button
              className="edit-kart-row-modal__button"
              onClick={() => {
                props.onClear();
              }}
            >
              Cancel
            </Button>
            <Button
              className="edit-kart-row-modal__button"
              type="submit"
              onClick={submitHandler}
            >
              {" "}
              Submit{" "}
            </Button>{" "}
          </React.Fragment>
        }
      >
        <div id="edit-kart-row-modal__form">
          <Input
            className="new-item-modal__text-input new-item-modal__input"
            id="partNumber"
            element="select"
            label="Karts In Row"
            validators={[VALIDATOR_REQUIRE()]}
            errorText=""
            onInput={inputHandler}
            initialValue={props.kartCount}
            initialValid={true}
          >
            {kartCountOptions}
          </Input>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EditKartRowModal;

import React, { useReducer, useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Input from "../../shared/components/FormElements/Input";

import { useForm } from "../../shared/hooks/form-hook";

const EditKartRowModal = (props) => {
  const [karts, setKarts] = useState(props.kartPreset);
  const [kartCount, setKartCount] = useState(props.kartPreset.length);

  const [formState, inputHandler, setFormData] = useForm(
    {
      kartCount: {
        value: props.kartPreset.length,
        isValid: true,
      },
    },
    false
  );

  const kartCountOptions = props.kartOptions.map((countOption) => {
    return <option value={countOption}>{countOption}</option>;
  });

  const submitHandler = () => {
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
            validators={[]}
            errorText=""
            onInput={inputHandler}
            initialValue={props.kartPreset.length}
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

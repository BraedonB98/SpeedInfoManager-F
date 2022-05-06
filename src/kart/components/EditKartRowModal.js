import React, { useEffect, useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/auth-context";

const EditKartRowModal = (props) => {
  const auth = useContext(AuthContext);
  const [karts, setKarts] = useState(props.kartPreset);
  const [kartCount, setKartCount] = useState(props.kartPreset.length);

  const kartCountOptions = props.kartOptions.map((countOption) => {
    return <option name={countOption}>{countOption}</option>;
  });

  const submitHandler = () => {
    props.onClear();
  };

  const kartCountChangeHandler = (event) => {
    console.log(kartCount);
    setKartCount(event.target.value);
    console.log(kartCount);
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
          <select
            id="karts"
            name="karts"
            value={kartCount}
            onChange={kartCountChangeHandler}
          >
            {kartCountOptions}
          </select>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default EditKartRowModal;

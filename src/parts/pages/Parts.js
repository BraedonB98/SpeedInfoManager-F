import React, { useContext, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import NewPartModal from "../components/NewPartModal";

const Parts = () => {
  const auth = useContext(AuthContext);
  const [newPart, setNewPart] = useState(false);

  const newPartButtonHandler = () => {
    setNewPart(true);
  };

  const newPartSubmitHandler = () => {
    setNewPart(false);
  };
  return (
    <React.Fragment>
      <NewPartModal
        onClear={() => {
          setNewPart(false);
        }}
        onSubmit={newPartSubmitHandler}
        open={newPart}
      />
      <div className="parts">
        <h1>Parts</h1>
        <Button>Find Part</Button>
        <Button onClick={newPartButtonHandler}>New Part</Button>
      </div>
    </React.Fragment>
  );
};

export default Parts;

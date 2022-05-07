import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import EditKartRowModal from "./EditKartRowModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./styling/KartRow.css";

const KartRow = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [karts, setKarts] = useState([]);
  const [activeKarts, setActiveKarts] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ]);

  const [editRowModal, setEditRowModal] = useState(false);

  const openKartSelect = () => {};

  const editRowProperties = (row) => {
    setEditRowModal(true);
  };

  const runRow = () => {};

  useEffect(() => {
    const startKarts = async () => {
      let row = [];
      for (let i = 0; i < props.kartsInRow; i++) {
        row.push(i);
      }
      setKarts(row.reverse());
    };
    startKarts();
  }, [props.kartsInRow]);
  const kartsItem = karts.map((kartNumber) => {
    //Can turn this into a kart component later instead of <li><Button>
    return (
      <li key={kartNumber} className="kart-row__kart-list-item">
        <Button
          className="kart-row__kart-list-item-button"
          onClick={openKartSelect}
        >
          {kartNumber}
        </Button>
      </li>
    );
  });

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <EditKartRowModal
        open={editRowModal}
        row={props.row}
        onClear={() => {
          setEditRowModal(false);
        }}
        kartPreset={karts}
        kartCount={karts.length}
        kartOptions={[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]}
      />
      <Card className="kart-row__row-div">
        <Button className="kart-row__row-title" onClick={editRowProperties}>
          {props.name}
        </Button>
        {/*edit row count/active carts*/}
        <ul className="kart-row__kart-list">{kartsItem}</ul>
        <Button className="kart-row__row-title" onClick={runRow}>
          Run Row
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default KartRow;

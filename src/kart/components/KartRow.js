import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./styling/KartRow.css";

const KartRow = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [numberOfKarts, setNumberOfKarts] = useState([]);
  useEffect(() => {
    const startKarts = async () => {
      let row = [];
      for (let i = 0; i < props.kartsInRow; i++) {
        row.push(i);
      }
      console.log(props.kartsInRow);
      setNumberOfKarts(row.reverse());
    };
    startKarts();
  }, [props.kartsInRow]);
  const karts = numberOfKarts.map((kartPosition) => {
    return (
      <li className="kart-row__kart-list-item">
        <Button>{kartPosition}</Button>
      </li>
    );
  });
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card>
        <h1>{props.name}</h1>
        <ul>{karts}</ul>
        {/*will want to put a input for number of karts to run here*/}
        <Button>Run Row </Button>
      </Card>
    </React.Fragment>
  );
};

export default KartRow;

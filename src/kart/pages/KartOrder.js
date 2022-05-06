import React, { useContext, useRef } from "react";
import { AuthContext } from "../../shared/context/auth-context";

import KartRow from "../components/KartRow";

import "./styling/KartOrder.css";

const KartOrder = () => {
  const auth = useContext(AuthContext);
  let rows = [12, 11, 10, 9];

  return (
    <React.Fragment>
      <div className="kart-order__header">
        <h1>Kart Tracker</h1>
      </div>
      <div className="kart-order__display-div">
        <KartRow
          className="kart-order__row"
          name="Row 4"
          kartsInRow={rows[3]}
          row={3}
        />
        <KartRow
          className="kart-order__row"
          name="Row 3"
          kartsInRow={rows[2]}
          row={2}
        />
        <KartRow
          className="kart-order__row"
          name="Row 2"
          kartsInRow={rows[1]}
          row={1}
        />
        <KartRow
          className="kart-order__row"
          name="Row 1"
          kartsInRow={rows[0]}
          row={0}
        />
      </div>
    </React.Fragment>
  );
};

export default KartOrder;

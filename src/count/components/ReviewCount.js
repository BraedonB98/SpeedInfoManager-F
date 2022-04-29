import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { Spreadsheet } from "react-spreadsheet";

import "./styling/PartDisplay.css";

const ReviewCount = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ]);
  const [count, setCount] = useState(props.count);
  useEffect(() => {
    //taking completed data and putting it into form for spread sheet

    console.log(count);
    const tempData = count.complete.map((item) => {
      return [{ value: item.partNumber }, { value: item.counted }];
    });
    setData(tempData);
  }, [count, setData]);
  return (
    <React.Fragment>
      <h1>Review Counter</h1>
      <Spreadsheet data={data} />
    </React.Fragment>
  );
};

export default ReviewCount;

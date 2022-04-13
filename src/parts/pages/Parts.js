import React, { useContext, useState } from "react";
import { AuthContext } from "../../shared/context/auth-context";

const Parts = () => {
  const auth = useContext(AuthContext);
  console.log(auth.permissions);

  //be able to search for parts
  //modal to add new parts(assuming no identical part number)
  return (
    <div className="Text__Body">
      <h1>Parts</h1>
    </div>
  );
};

export default Parts;

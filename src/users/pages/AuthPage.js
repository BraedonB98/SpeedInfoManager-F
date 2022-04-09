import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

const AuthPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      employeeNumber: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_API_URL}/user/login`,
        "POST",
        JSON.stringify({
          employeeId: formState.inputs.employeeNumber.value,
          password: formState.inputs.password.value,
        }),
        { "Content-Type": "application/json" }
      );
      auth.login(
        responseData._id,
        responseData.token,
        undefined,
        responseData.email,
        responseData.firstName,
        responseData.lastName,
        responseData.imageUrl,
        responseData.jobCode,
        responseData.permissions,
        responseData.phoneNumber,
        responseData.preferredName
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="employeeNumber"
            type="text"
            label="Employee Number"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Not a valid employee number "
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />

          <Button type="submit" disabled={!formState.isValid}>
            LOG IN
          </Button>
        </form>
        <br />
      </Card>
    </React.Fragment>
  );
};

export default AuthPage;

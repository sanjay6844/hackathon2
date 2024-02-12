import React from "react";
import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
import LoginPage from "./login";
import {} from "react-router-dom";

const Login = (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <LoginPage />
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default Login;

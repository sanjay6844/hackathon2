import React from "react";
import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
import SignUpPage from "./signup";
import {} from "react-router-dom";

const Signup = (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <SignUpPage />
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default Signup;

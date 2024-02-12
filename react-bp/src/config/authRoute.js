import React from "react";
import { Navigate } from "react-router-dom";
import cookie from "react-cookies";

const AuthRoute = ({ Element }) => {
  const acctoken = cookie.load("currentuser");
  console.log(acctoken, "currentuser");
  if (!acctoken || acctoken === undefined) {
    return <Navigate to="/" />;
  }
  return Element;
};

const PrivateRoute = ({ Element }) => {
  const acctoken = cookie.load("currentuser");
  console.log(acctoken, "currentuser");
  if (acctoken || acctoken !== undefined) {
    return <Navigate to="/sales" />;
  }
  return Element;
};

export { AuthRoute, PrivateRoute };

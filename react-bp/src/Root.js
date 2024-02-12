import React from "react";
import "./Root.css";
import { Provider } from "react-redux";
import Application from "./pages/application";
import Reduxifier from "./utilities/reduxifier";

function Root() {
  return (
    <Provider store={Reduxifier.rootStore}>
      <Application />
    </Provider>
  );
}

export default Root;

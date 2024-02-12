import React from "react";
import { BrowserRouter as Route } from "react-router-dom";

import Reduxifier from "Utilities/reduxifier";
import Registry from "Utilities/registry";
import { fetchRoutes } from "Config/routes";

const Containers = Reduxifier.bindReactRedux(Registry);
const Routes = fetchRoutes(Containers);

const Application = () => {
  const renderContent = () => {
    const components = [];
    components.push(
      <>
        <Route />
      </>
    );

    return components;
  };

  return (
    <div className="fullHeight">
      <Routes />
    </div>
  );
};

export default Application;

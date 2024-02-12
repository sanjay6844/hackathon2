import React from "react";
// import { oneOfType, arrayOf, node, shape } from 'prop-types';

import RefContext from "Utilities/refContext";

const RefProvider = (props) => {
  const { data, children } = props;

  const Context = RefContext;

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default RefProvider;

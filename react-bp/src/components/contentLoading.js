import React, { useState, useEffect } from "react";
import { string, func, bool, arrayOf, any } from "prop-types";
import { Spin } from "antd";

const ContentLoading = ({
  dom,
  isLoaded = null,
  dependencies = null,
  size = "large",
}) => {
  const loadingWrapper = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const spinner = (
    <div style={loadingWrapper}>
      <Spin size={size} />
    </div>
  );

  const renderContent = () => {
    if (dependencies !== null || isLoaded !== null) {
      if (
        dependencies !== null &&
				dependencies.filter((x) => x === null).length > 0
      ) {
        return spinner;
      } else if (isLoaded !== null && !isLoaded) {
        return spinner;
      } else {
        return dom();
      }
    }
    return null;
  };

  const [content, setContent] = useState(renderContent());

  useEffect(() => {
    setContent(renderContent());
  }, [isLoaded, dependencies, dom]);

  return <>{content}</>;
};

ContentLoading.propTypes = {
  dom: func.isRequired,
  isLoaded: bool,
  dependencies: arrayOf(any),
  size: string,
};

export default ContentLoading;

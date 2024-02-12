import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ApiErrorHandler from "Components/apiErrorHandler";
import { useLocation, useNavigate } from "react-router-dom";

const RefErrorBoundary = (props) => {
  const { children, store } = props;

  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(children);
  }, []);

  const unauthorizedCard = () => {
    return (
      <button
        type="primary"
        onClick={() => {
          console.log("iamhere");
          return window.location.assign("/login");
        }}
      >
				Login
      </button>
    );
  };

  // eslint-disable-next-line no-unused-vars
  const errorFallbackComponent = ({ error, resetErrorBoundary }) => {
    return (
      <>
        {error.status === 401 ? (
          unauthorizedCard(error)
        ) : (
          <button type="primary" onClick={resetErrorBoundary}>
						Refresh
          </button>
        )}
      </>
    );
  };
  let { pathname } = useLocation();
  let navigate = useNavigate();

  return (
    <ErrorBoundary
      FallbackComponent={errorFallbackComponent}
      onReset={() => navigate(pathname)}
    >
      {content}
      <ApiErrorHandler store={store} />
    </ErrorBoundary>
  );
};

export default RefErrorBoundary;

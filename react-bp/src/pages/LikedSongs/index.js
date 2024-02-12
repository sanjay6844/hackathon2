import React from "react";
import RefProvider from "Utilities/refProvider";
import RefErrorBoundary from "Utilities/refErrorBoundary";
import { formStoreData } from "Utilities/helpers";
import LikedSongs from "./likedsong";
import {} from "react-router-dom";

const LikeSong = (props) => {
  const propShape = formStoreData(props, ["dashboard"]);
  return (
    <>
      <RefProvider data={propShape}>
        <RefErrorBoundary {...props}>
          <LikedSongs />
        </RefErrorBoundary>
      </RefProvider>
    </>
  );
};

export default LikeSong;

import React, { useContext, useEffect } from "react";
import RefContext from "Utilities/refContext";
import ReactAudioPlayer from "react-audio-player";

const Homepage = () => {
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { getAllRequetUser } = actions;
  const { testData } = store;

  // console.log(ctx, "ctx");


 
  return(

    //  <h1>Home Page</h1>;
    //enable this if need to use DB json
    <div>
      <ReactAudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        autoPlay
        controls
      />
    </div>
  )
};

export default Homepage;

import React, { useContext, useEffect } from "react";
import RefContext from "Utilities/refContext";
import ReactAudioPlayer from "react-audio-player";

const Homepage = () => {
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  
  
  useEffect(()=>{

  })

  // console.log(ctx, "ctx");


 
  return(

    //  <h1>Home Page</h1>;
    //enable this if need to use DB json
    <div>
      
    </div>
  )
};

export default Homepage;

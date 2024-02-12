import React, { useContext, useEffect } from "react";
import RefContext from "Utilities/refContext";
import "./home.css"

const Homepage = () => {
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  
  
  useEffect(()=>{

  })

  // console.log(ctx, "ctx");

  return(

    //  <h1>Home Page</h1>;
    //enable this if need to use DB json
    <div className="home-container">
      
    </div>
  )
};

export default Homepage;

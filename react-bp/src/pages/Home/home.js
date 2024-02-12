import React, { useContext, useEffect } from "react";
import RefContext from "Utilities/refContext";
import ReactAudioPlayer from "react-audio-player";
import "./homeStyle.css";

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const Homepage = () => {
  


 
  return(

    //  <h1>Home Page</h1>;
    //enable this if need to use DB json
    <div>
      <ReactAudioPlayer
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        controls
      />
      <div className="LikedsongBody">
        <div className="title">Playlist</div>
        <div className="likedsongdesign">
          <div className="likedsonglist"><MusicNoteIcon style={{padding:"10px", borderRadius:"25px", border:"1px solid gray", fontSize:"20px",color:"white", background:"#9147ff"}} /></div>
          <div className="SongTitle">Song title</div>
          <div className="playbutton"><PlayArrowIcon style={{fontSize:"40px", cursor:"pointer"}} /></div>
        </div>  
        <Divider />
      </div>
    </div>
  )
};

export default Homepage;

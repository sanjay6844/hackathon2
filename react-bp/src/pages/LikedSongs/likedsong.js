import * as React from "react";
import { useState, useEffect } from "react";
import "./likedsongStyle.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function LikedSongs(){
  const [isliked, setLiked] = useState(false)
  return(
    <div className="LikedsongBody">
      <div className="title">Liked Songs</div>
      <div className="likedsongdesign">
        <div className="likedsonglist"><MusicNoteIcon style={{padding:"10px", borderRadius:"25px", border:"1px solid gray", fontSize:"20px",color:"white", background:"#9147ff"}} /></div>
        <div className="SongTitle">Song title</div>
        <div className="playbutton"><PlayArrowIcon style={{fontSize:"40px", cursor:"pointer"}} /></div>
        <div><FavoriteIcon  onClick={() => setLiked(true)} style={{color: isliked ? "black" : "red", fontSize:"30px",cursor:"pointer"}} /></div>
      </div>
      <Divider />
      <div className="likedsongdesign">
        <div className="likedsonglist"><MusicNoteIcon style={{padding:"10px", borderRadius:"25px", border:"1px solid gray", fontSize:"20px",color:"white", background:"#9147ff"}} /></div>
        <div className="SongTitle">Song title</div>
        <div className="playbutton"> <GraphicEqIcon style={{fontSize:"40px"}} /></div>
        <div><FavoriteIcon onClick={() => setLiked(true)} style={{color: isliked ? "black" : "red", fontSize:"30px"}} /></div>
      </div>
      <Divider />
      <div className="likedsongdesign">
        <div className="likedsonglist"><MusicNoteIcon style={{padding:"10px", borderRadius:"25px", border:"1px solid gray", fontSize:"20px",color:"white", background:"#9147ff"}} /></div>
        <div className="SongTitle">Song title</div>
        <div className="playbutton"><PlayArrowIcon style={{fontSize:"40px"}} /></div>
        <div><FavoriteIcon onClick={() => setLiked(true)} style={{color: isliked ? "black" : "red", fontSize:"30px"}} /></div>
      </div>
      <Divider />
    </div>
  );
}
export default LikedSongs
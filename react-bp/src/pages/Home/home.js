import React, { useContext, useEffect, useState } from "react";
import RefContext from "Utilities/refContext";
import ReactAudioPlayer from "react-audio-player";
import "./homeStyle.css";

import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Cookies from "js-cookie";

const Homepage = () => {
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { songs,users } =store;
  const { fetchSongs } = actions
  console.log(songs, "songs");
  const [song, setsong] = useState(null);
  const [name, setname]= useState(null);
  const [isliked, setLiked] = useState(false)
  useEffect(()=>{
    fetchSongs()
  }, [])
  const [LoggedInUser,setLoggedInUser] = useState(JSON.parse(Cookies.get("currentuser")))
  // const LoggedInUser = Cookies.get("currentuser")
  // let logedinusers = JSON.parse(LoggedInUser)
  // console.log(logedinusers)
  // console.log(ctx, "ctx");
  
  const storesongDetail = (url,name) =>{
    setsong(url);
    setname(name);
  }

 
  return(

    //  <h1>Home Page</h1>;
    //enable this if need to use DB json
    <div>
      
      <div className="LikedsongBody">
        <div className="audioplay">
          <div style={{color:"white", paddingBottom:"15px", fontSize:"30px"}}>Song Name: {name}</div>
          <ReactAudioPlayer style={{width:"100%"}}
            src={song}
            controls
            autoPlay
          />
        </div>
        <div className="title">Playlist</div>
        {songs?.map((song,index) => 
          
          
          <>
            <div key={index} className="likedsongdesign">
              <div className="likedsonglist"><MusicNoteIcon style={{padding:"10px", borderRadius:"25px", border:"1px solid gray", fontSize:"20px",color:"white", background:"#9147ff"}} /></div>
              <div className="SongTitle">{song.songName}</div>
              <div className="playbutton"><PlayArrowIcon style={{fontSize:"40px", cursor:"pointer"}} onClick={() => storesongDetail(song.url, song.songName) } /></div>
              <div><FavoriteIcon  onClick={() => setLiked(true)} style={{color: isliked ? "red" : "black", fontSize:"30px",cursor:"pointer"}} /></div>
            </div> 
            <Divider />
          </> 
            
        )}
        
      </div>
     
    </div>
  )
};

export default Homepage;

import * as React from "react";
import { useState, useEffect ,useContext} from "react";
import "./likedsongStyle.css";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RefContext from "Utilities/refContext";
import Cookies from "js-cookie";
import ReactAudioPlayer from "react-audio-player";



function LikedSongs(){
  const [isliked, setLiked] = useState(false)
  const ctx = useContext(RefContext);
  const { store, actions } = ctx;
  const { postUsers,fetchUsers,fetchSongs } = actions;
  const [song, setsong] = useState(null);
  const [name, setname]= useState(null);

  const LoggedInUser = Cookies.get("currentuser")
  useEffect(()=>{
    fetchSongs()
    fetchUsers()
  },[])
  const likedSongs = ["lsitpo81","lsiu6yak"]
  let loggedInUser = JSON.parse(LoggedInUser)
  const storesongDetail = (url,name) =>{
    setsong(url);
    setname(name);
  }
  const showLikedSongs = ()=>{
    // const likedSongs = loggedInUser.likedSongs
   
    
   

    // for(let i=0;i<likedSongs?.length;i++){
    //   for(let j=0;j<store.songs?.length;j++){
    //     if(likedSongs[i]===store.songs[j].id){
    //       arr.push(
    //         <div key={i}>
    //           <div className="likedsongdesign">
    //             <div className="likedsonglist"><MusicNoteIcon style={{padding:"10px", borderRadius:"25px", border:"1px solid gray", fontSize:"20px",color:"white", background:"#9147ff"}} /></div>
    //             <div className="SongTitle">{store.songs[j].songName}</div>
    //             <div className="playbutton"><PlayArrowIcon style={{fontSize:"40px", cursor:"pointer"}} /></div>
    //             <div><FavoriteIcon  onClick={() => setLiked(true)} style={{color: isliked ? "black" : "red", fontSize:"30px",cursor:"pointer"}} /></div>
    //             <Divider />
    //           </div>
              
    //         </div>
    //       )
        

    //     }
    //   }
    // }

   
  }

  return(
    <div className="LikedsongBody">
      {/* {showLikedSongs()} */}
      <div className="audioplay">
        <div style={{color:"white", paddingBottom:"15px", fontSize:"30px"}}>Song Name: {name}</div>
        <ReactAudioPlayer style={{width:"100%"}}
          src={song}
          controls
          autoPlay
        />
      </div>
      { store.songs?.map((song,key)=>{
        if(likedSongs.includes(song.id)&&song.show){
          return(
            <div key={key}>
              <div className="likedsongdesign">
                <div className="likedsonglist"><MusicNoteIcon style={{padding:"10px", borderRadius:"25px", border:"1px solid gray", fontSize:"20px",color:"white", background:"#9147ff"}} /></div>
                <div className="SongTitle">{song.songName}</div>
                <div className="playbutton"><PlayArrowIcon style={{fontSize:"40px", cursor:"pointer"}} onClick={() => storesongDetail(song.url, song.songName) }/></div>
                <div><FavoriteIcon  onClick={() => setLiked(true)} style={{color: isliked ? "black" : "red", fontSize:"30px",cursor:"pointer"}} /></div>
                <Divider />
              </div>
            </div>
          )
        }
      })}
    </div>
  );
}
export default LikedSongs
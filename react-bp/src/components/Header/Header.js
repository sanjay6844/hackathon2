import React, { useEffect } from "react";
import { useState,useContext } from "react";
import "./Header.css"
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import uniqid from "uniqid";
import RefContext from "Utilities/refContext";
import {openDB} from "idb"
import Cookies from "js-cookie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import { Notification } from "@contentful/f36-notification";
// import { Button } from "@mui/base";
import { UploadOutlined } from "@ant-design/icons";
import { uniqueId } from "lodash";
// import { Button, message, Upload } from "antd";
import { useNavigate } from "react-router-dom";
const Header= (data)=>{
  const [dialog,setDialog] = useState(false)

  const navigate = useNavigate()
  const [audioUrl,setAudioUrl] = useState(null)
  const [upload,setUpload] = useState(false)
  const [songPrivate,setSongPrivate] = useState(false)
  const [songInput,setSongInput] = useState("")
  const [songName,setSongName] = useState("")
  const loggedInUser = Cookies.get("currentuser")

  useEffect(()=>{
    console.log(data)
  },[])
  const handleUpload = ()=>{
    setDialog(true)
   
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleLogOut =()=>{
    
    setAnchorEl(null);
    navigate("/")
    Cookies.remove("currentuser")
    Notification.setPlacement("top");
    Notification.success("Signed-Out Successfully!",{ duration: 5000},);
  }

  const handleClose = ()=>{
    setDialog(false)
  }

  const postSongs = async(data) =>{
    const usersDb = await openDB("db1",1)
    usersDb.add("songs",data)
    const parsed = JSON.parse(loggedInUser)
    console.log(parsed)
    usersDb.get("users",parsed.id)
      .then((response)=>{
        let arr = [...response.upload]
        arr.push(data.id)
        let obj = {
          id:parsed.id,
          email:parsed.email,
          name:parsed.name,
          password:parsed.password,
          likedSongs:parsed.likedSongs,
          upload:arr
        }
        usersDb.put("users",obj)
      })
  }

  const handleConfirmUpload = ()=>{
   
    if(songName===""){
      toast.warn("song name is required")
      return
    }
    if(upload){
      const obj = {
        id:uniqid(),
        songName:songName,
        show:!songPrivate,
        url:audioUrl
      }
      console.log(obj)
      postSongs(obj)
      handleClose()
    }
    else{
      toast.warn("no file choosen")
    }
  }

  const handleNameChange = (e)=>{
    console.log(e.target.value,"value")
    setSongName(e.target.value)
  }

  const storeUrl = (data)=>{
    console.log(data)
    setAudioUrl(data)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setCurrentPage(null)
  };

  const handleClosed =()=>{
    setAnchorEl(null)
  }

  const handleFileChange = (event)=>{
   
   
    if(event.target.files.length===0){
      setUpload(false)
    }
    else{
      getBase64(event.target.files[0],storeUrl)
      setUpload(true)
    }
  }

  const getBase64 = (audio, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(audio);
    console.log(audio, "audio")
  };

  const handleSwitch=(event)=>{
    setSongPrivate(event.target.checked)
  }
  // const props = {
  //   beforeUpload: (file) => {
  //     const isAudio = file.type === "audio/mpeg";
  //     if (!isAudio) {
  //       message.error(`${file.name} is not an audio file`);
  //     }
  //     return isAudio || Upload.LIST_IGNORE;
  //   },
  //   onChange: (info) => {
  //     if (info.file.status === "uploading") {
  //       // setLoading(true);
  //       return;
  //     }
  //     if (info.file.status === "done") {
  //       // Get this url from response in real world.
  //       getBase64(info.file.originFileObj, (url) => {
  //         // setLoading(false);
  //         console.log(url)
  //         setAudioUrl(url);
  //       });
  //     }
  //   },
  // };

  const cookieValues = JSON.parse(Cookies.get("currentuser"))
  console.log(cookieValues, "cook")
  return(
    <div className="header-container">
      <Dialog
        open={dialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ToastContainer />
        <DialogTitle>
          {"Upload your song"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
          {/* <Button icon={<UploadOutlined />}>upload</Button> */}
          <input type="file" accept="audio/mpeg" onChange={handleFileChange}/>
          <form onSubmit={handleConfirmUpload}>
            <TextField required type="text" name="songName" id="outlined-basic" label="Song name" error={!!songInput} onChange={handleNameChange} helperText={songInput} variant="outlined" />
          </form>
        </DialogContent>
        <DialogActions>
          <div>
            <FormControlLabel  control={<Switch onChange={handleSwitch} />} label="Private" />
          </div>
          <div className="button-container">
            <div className="button" aria-hidden onClick={handleClose}>cancel</div>
            <div className ="button" type="submit" aria-hidden onClick={handleConfirmUpload} autoFocus>
            upload
            </div>


          </div>
        </DialogActions>
      </Dialog>
      <div className="name-container"> 
        <div className="heading">SanSham Audio Player</div>
      </div>
      <div className="routes">
        <div className="button" onClick={() => navigate("/home")}>Home</div>
        <div className="button" onClick={() => navigate("/likedsongs")}><FavoriteIcon /></div>
        <div className="button" aria-hidden onClick={handleUpload}>
          <UploadFileIcon />
        </div>
        <div className="button" aria-hidden onClick={(e)=>handleClick(e)}>
          <AccountCircleIcon />
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClosed}
          onClick={handleClosed}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root":{
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: "\"\"",
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >

            
          <MenuItem>
            <Avatar /> {cookieValues?.name}
          </MenuItem>
          <Divider />
            
           
     
          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
          Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default Header
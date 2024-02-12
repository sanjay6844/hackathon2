import React from "react";
import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FavoriteIcon from '@mui/icons-material/Favorite';


// import { Button } from "@mui/base";
import { UploadOutlined } from "@ant-design/icons";
// import { Button, message, Upload } from "antd";
const Header= ()=>{
  const [dialog,setDialog] = useState(false)
  const [audioUrl,setAudioUrl] = useState(null)
  const [upload,setUpload] = useState(false)
  const [songPrivate,setSongPrivate] = useState(false)


  const navigate=useNavigate();
  const handleUpload = ()=>{
    setDialog(true)
  }
  const handleClose = ()=>{
    setDialog(false)
  }

  const handleConfirmUpload = ()=>{
    if(upload){

      handleClose()
    }
    else{
      toast.warn("no file choosen")
    }
  }


  const handleFileChange = (event)=>{
    if(event.target.files.length===0){
      setUpload(false)
    }
    else{
      setUpload(true)
    }
  }

  const getBase64 = (audio, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(audio);
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

        </DialogContent>
        <DialogActions>
          <div>
            <FormControlLabel  control={<Switch onChange={handleSwitch} />} label="Private" />
          </div>
          <div className="button-container">
            <div className="button" aria-hidden onClick={handleClose}>cancel</div>
            <div className ="button" aria-hidden onClick={handleConfirmUpload} autoFocus>
            upload
            </div>
          </div>
        </DialogActions>
      </Dialog>
      <div className="name-container"> 
        <div className="heading">song player</div>
      </div>
      <div className="routes">
        <div className="button">Home</div>
        <div className="button" onClick={() => navigate("/likedsongs")}><FavoriteIcon /></div>
        <div className="button" aria-hidden onClick={handleUpload}>
          <UploadFileIcon />
          {/* <div className="icon-container
          "><AddIcon sx={{width:"20px"}}/></div> */}
        </div>
      </div>
    </div>
  )
}

export default Header
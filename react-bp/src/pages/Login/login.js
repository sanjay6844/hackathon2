import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField"; 
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container"; 
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// import { LoginBody, LoginPage,WelcomeTag } from "./loginStyle";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Notification } from "@contentful/f36-notification";
import "./loginStyle.css";
// import ModalForm from "../../components/Modal";
// import {
//   Modal,
//   FormControl,
//   Form,
//   TextInput,
// } from "@contentful/f36-components";

const defaultTheme = createTheme();
function Login() {



 
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // const [isShown, setShown] = useState(false);
  // const [UserName, setUserName] = useState("");
  // const [changedPassword, setChangedPassword] = useState("");
  // const [changedPasswordError, setChangedPasswordError] = useState("");
  // const [changedPasswordConfirm, setChangedPasswordConfirm] = useState("");
  // const [changedPasswordConfirmError, setChangedPasswordConfirmError] = useState("");
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [newPassword, setNewPassword] = useState(false);
  const navigate = useNavigate();


 

 
  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset previous error messages
    setEmailError("");
    setPasswordError("");

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Validate email
    if (!email) {
      setEmailError("Email or Username is required");
      return;
    }
    

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if(!/^(?=.*[A-Z]).+$/.test(password)){
      setPasswordError("Min one Capital letter is required");
      return;
    }
    if(!/^(?=.*[0-9]).+$/.test(password)){
      setPasswordError("Min one digit is required");
      return;
    }
    if(!/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).+$/.test(password)){
      setPasswordError("Min one Special Character is required");
      return;
    }
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/.test(password)){
      setPasswordError("Min 8 characters required");
      return;
    }
    const SignedUpUsers = JSON.parse(localStorage.getItem("users"))
    const already = SignedUpUsers.find((userss) =>
      userss.email === email || userss.name === email && userss.password === password);
    if(already){
      Cookies.set("currentuser", JSON.stringify(already), {
        expires: 7,
      });
      Notification.setPlacement("top");
      Notification.success("Signed-In Successfully!",{ duration: 5000},);
      navigate("/home");
    }
  }
    
    
    
  
  //   const createdPassword = () => {
    
  //     setChangedPasswordError("");
  //     setChangedPasswordConfirmError("");
  //     if (!changedPassword) {
  //       setChangedPasswordError("Password is required");
  //       return;
  //     }

  //     if(!/^(?=.*[A-Z]).+$/.test(changedPassword)){
  //       setChangedPasswordError("Min one Capital letter is required");
  //       return;
  //     }
  //     if(!/^(?=.*[0-9]).+$/.test(changedPassword)){
  //       setChangedPasswordError("Min one digit is required");
  //       return;
  //     }
  //     if(!/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).+$/.test(changedPassword)){
  //       setChangedPasswordError("Min one Special Character is required");
  //       return;
  //     }
  //     if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/.test(changedPassword)){
  //       setChangedPasswordError("Min 8 characters required");
  //       return;
  //     }
  //     if(!changedPasswordConfirm) {
  //       setChangedPasswordConfirmError("Confirm password is required");
  //       return;
  //     }

  //     if(changedPassword!==changedPasswordConfirm){
  //       setChangedPasswordConfirmError("Password does not match");
  //       return
  //     }
  //     setNewPassword(false);
  //     Notification.setPlacement("top");
  //     Notification.success("Password reset done successfully",{ duration: 4000},);
  //   }


  
  // const forgetPassword = ()=>{
  //   console.log("hello")
  //   setShown(true);
  // }

  return (
    <>
      <div className="LoginBody">
        
        {/* <LoginPage> */}
        <ThemeProvider  theme={defaultTheme}>
             
          <Container style={{maxWidth:"480px", display:"flex", justifyContent:"center", alignItems:"center"}} component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                padding:"40px",
                boxShadow:"rgba(0, 0, 0, 0.24) 0px 2px 8px;",
                alignItems: "center",
                backgroundColor:"white",
              }}
            >
              {/* <WelcomeTag>Welcome back to Chartinfo!</WelcomeTag> */}
              <Avatar style={{background:"#9147ff"}} sx={{ m: 1, bgcolor: "secondary.main" }}>
              
              </Avatar>
              <Typography component="h1" variant="h5">
            Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address or Uername"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button style={{background:"#9147ff"}}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
              Sign In
                </Button>
                <Grid container>
                  <Grid style={{cursor:"pointer"}} item xs>
                    <Link onClick={()=>forgetPassword()} variant="body2">
                  Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account?"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        {/*          
      </LoginPage>   */}
     
      </div>
    
      {/* <Modal onClose={() => setShown(false)} isShown={isShown}>
        {() => (
          <>
            <Modal.Header
              title="Changing the Password"
              onClose={() => setShown(false)}
            />
            <Modal.Content>
              <Form onSubmit={submitForm}>
                <FormControl>
                  <FormControl.Label isRequired>UserName</FormControl.Label>
                  <TextInput
                    maxLength={20}
                    value={UserName}
                    placeholder="UserName"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </FormControl>
              </Form>
            </Modal.Content>
            <Modal.Controls>
              <Button
                size="small"
                variant="transparent"
                onClick={() => setShown(false)}
              >
              Close
              </Button>
              <Button
                size="small"
                variant="positive"
                isDisabled={UserName.length === 0}
                onClick={submitForm}
              >
              Done
              </Button>
            </Modal.Controls>
          </>
        )}
      </Modal>

    
      <Modal onClose={() => setNewPassword(false)} isShown={newPassword}>
        {() => (
          <>
            <Modal.Header
              title="Changing the Password"
              onClose={() => setNewPassword(false)}
            />
            <Modal.Content>
              <Form onSubmit={createdPassword}>
                <FormControl>
                  <FormControl.Label isRequired>New Password</FormControl.Label>
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={changedPassword}
                    onChange={(e) => {
                      setChangedPassword(e.target.value);
                    }}
                    name="password"
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    error={!!changedPasswordError}
                    helperText={changedPasswordError}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl.Label isRequired>Confirm Password</FormControl.Label>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={changedPasswordConfirm}
                    onChange={(e) => {
                      setChangedPasswordConfirm(e.target.value);
                    }}
                    name="password"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    error={!!changedPasswordConfirmError}
                    helperText={changedPasswordConfirmError}
                    onPaste={handlePaste}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              </Form>
            </Modal.Content>
            <Modal.Controls>
              <Button
                size="small"
                variant="transparent"
                onClick={() => setNewPassword(false)}
              >
              Close
              </Button>
              <Button
                size="small"
                variant="positive"
                isDisabled={changedPassword.length === 0}
                onClick={createdPassword}
              >
              Done
              </Button>
            </Modal.Controls>
          </>
        )}
      </Modal> */}
    </>
  );
}
export default Login;
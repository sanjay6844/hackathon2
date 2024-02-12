import * as React from "react";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import IconButton from "@mui/material/IconButton";
// import InputAdornment from "@mui/material/InputAdornment";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Notification } from "@contentful/f36-notification";


const defaultTheme = createTheme(); 

function Signup() {
  
  
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();


  

  //To avoid copy-paste option in confirm password field
  const handlePaste = (event) => {
    event.preventDefault();
    setConfirmPasswordError("Copy-paste is not allowed");
  };
 
  //check the validation and create the account
  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset previous error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");



    //Valid name
    if (!name) {
      setNameError("UserName is required");
      return;
    }
    if(!/^.{5,}$/.test(name)){
      setNameError("Required min characters 5");
      return;
    }

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email");
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
    if(!confirmPassword) {
      setConfirmPasswordError("Confirm password is required");
      return;
    }

    if(password!==confirmPassword){
      setConfirmPasswordError("Password does not match");
      return
    }

    

    const userObj={
      name:name,
      email:email,
      password:password,
    }

    
    let localData=JSON.parse(localStorage.getItem("users"));
    if(localData){
      localData.push(userObj);
    }
    else{
      localData=[userObj]
    }
    localStorage.setItem("users", JSON.stringify(localData)) 
      
    
    
    Notification.setPlacement("top");
    Notification.info("Request has been sent to Admin, wait till admin approve!",{ duration: 5000},)
    navigate("/home")
    
  }
  return (  
  // <LoginBody> 
  //   <LoginPage>
        
    <ThemeProvider style={{display:"flex"}} theme={defaultTheme}>
      <Container style={{display:"flex", justifyContent:"center", alignItems:"center"}} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            padding:"30px",
            boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 8px",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor:"white",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="name"
              autoComplete="name"
              autoFocus
              error={!!nameError}
              helperText={nameError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
                
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
            //   InputProps={{
            //     endAdornment: (
            //       <InputAdornment position="end">
            //         <IconButton
            //           onClick={() => setShowPassword(!showPassword)}
            //           edge="end"
            //         >
            //           {showPassword ? <Visibility /> : <VisibilityOff />}
            //         </IconButton>
            //       </InputAdornment>
            //     ),
            //   }}
            />

               
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="current-password"
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              onPaste={handlePaste}
            //   InputProps={{
            //     endAdornment: (
            //       <InputAdornment position="end">
            //         <IconButton
            //           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            //           edge="end"
            //         >
            //           {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
            //         </IconButton>
            //       </InputAdornment>
            //     ),
            //   }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Already have an account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    //   </LoginPage>
    // </LoginBody>
  );
}
export default Signup
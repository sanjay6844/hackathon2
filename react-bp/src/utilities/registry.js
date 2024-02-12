// Controllers
import Home from "Pages/Home";
import Login from "Pages/Login/login";
import Signup from "Pages/Signup";
import Header from  "Components/Header/Header";
import LikeSong from "Pages/LikedSongs";

function Injector(component, name) {
  const hoc = component;
  hoc.displayName = name;

  return hoc;
}

export default {
  Login: Injector(Login, "Login"),
  Signup: Injector(Signup,"Signup"),
  Home: Injector(Home, "Home"),
  Header:Injector(Header,"Header"),
  LikeSong:Injector(LikeSong, "LikeSong")
};

// Controllers
import Home from "Pages/Home";
import Login from "Pages/Login/login";
import Signup from "Pages/Signup/signup";
import LikedSongs from "Pages/LikedSongs/likedsong";

function Injector(component, name) {
  const hoc = component;
  hoc.displayName = name;

  return hoc;
}

export default {
  Login: Injector(Login, "Login"),
  Signup: Injector(Signup,"Signup"),
  Home: Injector(Home, "Home"),
  LikedSongs: Injector(LikedSongs, "LikedSongs"),
};

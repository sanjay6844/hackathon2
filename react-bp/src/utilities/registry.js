// Controllers
import Home from "Pages/Home";
import Login from "Pages/Login/login";
import Signup from "Pages/Signup/signup";

function Injector(component, name) {
  const hoc = component;
  hoc.displayName = name;

  return hoc;
}

export default {
  Login: Injector(Login, "Login"),
  Signup: Injector(Signup,"Signup"),
  Home: Injector(Home, "Home"),
};

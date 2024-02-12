// Controllers
import Home from "Pages/Home";
import Header from  "Components/Header/Header"

function Injector(component, name) {
  const hoc = component;
  hoc.displayName = name;

  return hoc;
}

export default {
  Home: Injector(Home, "Home"),
  Header:Injector(Header,"Header")
};

import ReactDOM from "react-dom";
import App from "./app";
import Welcome from "./welcome";
import LandingPage from "./landingSearch";

let elem;

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));

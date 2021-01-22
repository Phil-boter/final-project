import ReactDOM from "react-dom";
import App from "./app";

let elem;

if(location.pathname === "/welcome") {
    elem = <LandingPage />;
}
else {
    elem = <App  />
}




ReactDOM.render(elem, document.querySelector("main"));


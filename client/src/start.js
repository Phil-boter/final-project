import ReactDOM from "react-dom";
import App from "./app";
import LandingPage from "./landingpage";


let elem;

// if(location.pathname === "/landingpage") {
//     elem = <LandingPage />;
// }
// else {
    elem = <App />
// }




ReactDOM.render(elem, document.querySelector("main"));


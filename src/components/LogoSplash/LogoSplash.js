import logo01 from "../../static/images/logo01.png";
import logo02 from "../../static/images/logo02.png";
import "./LogoSplash.css";

function LogoSplash() {
  return (
    <div className="logo-container">
      <div className="logo-left">
        <img src={logo01} className="logo spin" alt="logo" />
      </div>
      <div className="logo-right">
        <img src={logo02} className="logo spin-reverse" alt="logo" />
      </div>
    </div>
  );
}

export default LogoSplash;

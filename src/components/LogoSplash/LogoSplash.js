import logo01 from "../../static/images/logo01.png";
import logo02 from "../../static/images/logo02.png";
import "./LogoSplash.css";
import '../../static/css/App.css';

export function LogoSplash() {
  return (
    <div className="logo-container">
      <div>
        <img src={logo01} className="logo spin" alt="logo" />
      </div>
      <div>
        <img src={logo02} className="logo spin-reverse" alt="logo" />
      </div>
    </div>
  );
}

export function LogoSplash2(props) {
  if (props.visible) {
  return (
    <div>
    <div className="logo-left" >
    <img src={logo01} className={props.spinDirection1 + " moderate-size"} alt="logo"/>
    </div>
    <div className="logo-right" style={{zIndex:"2"}}>
    <img src={logo02} className={props.spinDirection2 + " moderate-size"} alt="logo"/>
    </div>
    </div>
  )}

  return ("");
}

LogoSplash2.defaultProps = {
  visible: true,
  spin: true,
  spinDirection1: "spin",
  spinDirection2: "spin-reverse"
};

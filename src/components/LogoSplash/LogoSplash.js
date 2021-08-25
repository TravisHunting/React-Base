import logo01 from "../../static/images/logo01.png";
import logo02 from "../../static/images/logo02.png";
import "./LogoSplash.css";
import '../../static/css/App.css';


export function LogoSplash() {
  return (
    <div className="flex-container">
      <div className="logo-container">
        <img src={logo01} className="logo logo-left spin" alt="logo" />
        <img src={logo02} className="logo logo-right spin-reverse" alt="logo" />
      </div>
    </div>
  );
}


export function LogoSplash2(props) {
  if (props.visible) {
  return (
    <div>
    <div className="logo-left-2" >
    <img src={logo01} className={props.spinDirection1 + " moderate-size"} alt="logo"/>
    </div>
    <div className="logo-right-2" style={{zIndex:"2"}}>
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

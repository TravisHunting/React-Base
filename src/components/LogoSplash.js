import logo01 from '../static/images/logo01.png';
import logo02 from '../static/images/logo02.png';
import '../static/css/App.css';


function LogoSplash() {
  return (
    <div>
    <div className="logo-left" >
    <img src={logo01} className="spin moderate-size" alt="logo"/>
    </div>
    <div className="logo-right" style={{zIndex:"2"}}>
    <img src={logo02} className="spin-reverse moderate-size" alt="logo"/>
    </div>
    </div>
  );
}

export default LogoSplash;

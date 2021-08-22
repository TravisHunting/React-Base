import logo01 from '../static/images/logo01.png';
import logo02 from '../static/images/logo02.png';
import '../static/css/App.css';

const imageWidth = window.innerWidth;
const imageHeight = Math.round(imageWidth * 9 / 16);

function LogoSplash() {
  return (
    <div className="logo-splash">

        <div className="centerleft" >
        <img src={logo01} className="spin moderate-size" alt="logo"/>
        </div>

        <div className="centerright" style={{zIndex:"1"}}>
        <img src={logo02} className="spin-reverse moderate-size" alt="logo" />
        </div>

    </div>
  );
}

export default LogoSplash;

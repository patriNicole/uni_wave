import './App.css';
import LogIn from "./components/Login/LogIn";
import logo from './pictures/uniwave.png';

function App() {
  return (
    <>
      <div className="log">
        <img src={logo} alt="logo" className="logo"/>
        <div className="logInContainer">
          <LogIn/>
        </div>
      </div>
    </>
  );
}

export default App;

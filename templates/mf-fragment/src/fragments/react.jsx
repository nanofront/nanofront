import "../../styles/react.css";
import reactLogo from "../react.svg";
// import viteLogo from "/vite.svg";

export default function React() {
  const clickReact = () => {
    window.alert("Hello React");
  };

  return (
    <div className="App">
      <header className="App-header" onClick={clickReact}>
        <img src={reactLogo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

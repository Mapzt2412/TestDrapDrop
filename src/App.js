import "./App.css";
import OuterBox from "./OuterBox";

function App() {
  function allowDrop(ev) {
    ev.preventDefault();
  }
  return (
    <div className="App" onDrop={allowDrop}>
      <OuterBox />
    </div>
  );
}

export default App;

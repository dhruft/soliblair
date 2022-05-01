import Nav from './components/NavFull'
import Game from './Game'

function App() {
  return (
    <div className="App">
      <Nav />
      <Game className="child"/>
    </div>
  );
}

export default App;

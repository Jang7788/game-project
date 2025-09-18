import './App.css';
import Board from './board';
import Nav from './nav';
import Register from './component/register';
import Login from './component/login';
function App() {
  return (
    <div>
      <Nav />
      <Board />
      <Register />
      <Login />
    </div>
  );
}

export default App;

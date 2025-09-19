import './App.css';
import Board from './board';
import Nav from './nav';
import Login from './component/login';
import Register from './component/register';
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

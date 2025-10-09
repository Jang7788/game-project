import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from './board';
import Nav from './nav';
import Login from './component/login';
import Register from './component/register';
import Profile from "./component/Profile"; 
import Product from './component/Product';
import { UserProvider } from "./UserContext"; // ✅ import

function App() {
  return (
    <UserProvider> {/* ✅ ครอบทั้งแอป */}
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/product" element={<Product />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

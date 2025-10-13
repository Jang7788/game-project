import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from './board';
import Nav from './component/nav';
import Login from './component/login';
import Register from './component/register';
import Profile from "./component/Profile"; 
import Product from './component/ProductPage';
import AddProduct from './component/Addproduct';
import Editproduct from './component/Editproduct';
import Cart from './component/Cart';
import ProductDetailPage from "./component/Getproduct";
import { UserProvider } from "./component/UserContext";

function App() {
  return (
    <UserProvider> 
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/product" element={<Product />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/addproduct' element={<AddProduct />}/>
          <Route path='/editproduct/:id' element={<Editproduct />}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/getproduct/:id' element={<ProductDetailPage/>}></Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

import { Link, useNavigate} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { FaShoppingCart } from "react-icons/fa";

function Nav() {
  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost:3600/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null); 
    navigate('/login');
  };

  if (loading) return <nav className="navbar bg-light px-3">กำลังโหลด...</nav>;

  return (
    <nav className="navbar bg-light px-3">
      <Link className="navbar-brand" to="/">MyApp</Link>
      <Link className="nav-link px-2 link-secondary" to="/product">Product</Link>
      <div>
        {!user ? (
          <>
            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-success mx-1" to="/register">Register</Link>
          </>
        ) : (
          <>
            <span><Link to="/cart" ><FaShoppingCart /></Link></span>
            <span className="mx-2">Hi, {user.username}</span>
            <button className="btn btn-outline-danger mx-1" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;

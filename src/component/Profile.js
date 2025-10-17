import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Profile() {
  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]); 

  if (loading) {
    return <p>Loading user data...</p>;
  }
  
  if (!user) {
      return null; 
  }

  const handleLogout = async () => {
    await fetch("https://server-qobj.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>โปรไฟล์</h2>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
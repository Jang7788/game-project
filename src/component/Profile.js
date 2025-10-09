import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext"; // ✅ import

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3600/api/me", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"));
  }, [navigate, setUser]);

  if (!user) return <p>Loading...</p>;

  const handleLogout = async () => {
    await fetch("http://localhost:3600/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null); // ✅ Navbar เปลี่ยนทันที
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

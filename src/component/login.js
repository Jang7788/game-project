import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext"; // ✅ import

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // ✅ ใช้ context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3600/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setUser(data.user); // ✅ อัปเดต Navbar ทันที
        setMessage(`✅ เข้าสู่ระบบสำเร็จ! สวัสดีคุณ ${data.user.username}`);
        navigate("/profile");
      } else {
        setMessage(`❌ ล้มเหลว: ${data.msg || data.error}`);
      }
    } catch (err) {
      setMessage(`เกิดข้อผิดพลาด: ${err.message}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            value={username}
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default Login;

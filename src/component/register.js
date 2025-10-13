import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext'; 

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { setUser } = useContext(UserContext); 
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3600/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok && data.username) {
        setMessage(`✅ สมัครสำเร็จ! สวัสดีคุณ ${data.username}`);

        setUser({ username: data.username, email });

        navigate("/profile");

        setUsername("");
        setPassword("");
        setEmail("");
      } else {
        setMessage(`❌ ล้มเหลว: ${data.msg || data.error}`);
      }
    } catch (err) {
      setMessage(`เกิดข้อผิดพลาด: ${err.message}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default Register;

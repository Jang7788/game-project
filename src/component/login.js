import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", { username, password });

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ เข้าสู่ระบบสำเร็จ! สวัสดีคุณ ${data.user.username} (role: ${data.user.role})`);
        setUsername("");
        setPassword("");
      } else {
        setMessage(`❌ ล้มเหลว: ${data.error}`);
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

      {message && (
        <div className="alert alert-info mt-3">
          {message}
        </div>
      )}
    </div>
  );
}

export default Login;
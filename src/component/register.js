import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if(res.ok) {
        setMessage(`สมัครสำเร็จ! User ID: ${data.userId}`);
        setUsername("");
        setPassword("");
        setRole("user"); 
      } else {
        setMessage(`เกิดข้อผิดพลาด: ${data.error}`);
      }
    } catch(err) {
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
          <label htmlFor="role" className="form-label">Role</label>
          <select
            id="role"
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default Register;

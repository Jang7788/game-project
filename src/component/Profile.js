import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/me", {
      method: "GET",
      credentials: "include"   // ✅ ส่ง cookie
    })
      .then(res => {
        if (res.status === 401) {
          setUser(null);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data && data.user) {
          setUser(data.user);
        }
      });
  }, []);

  if (!user) {
    return <p>ยังไม่ได้ล็อกอิน</p>;
  }

  return (
    <div className="container mt-5">
      <h2>โปรไฟล์</h2>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Email:</b> {user.email}</p>
    </div>
  );
}

export default Profile;

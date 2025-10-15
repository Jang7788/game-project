// Profile.js

import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

function Profile() {
  // 1. ดึง 'user' และ 'loading' มาจาก Context
  const { user, setUser, loading } = useContext(UserContext);
  const navigate = useNavigate();

  // 2. ใช้ useEffect เพื่อ "React" ต่อการเปลี่ยนแปลงของ user และ loading
  useEffect(() => {
    // ถ้าการโหลดข้อมูลเริ่มต้นเสร็จแล้ว (loading === false)
    // และยังไม่มีข้อมูล user อยู่ใน Context
    // ให้เด้งไปหน้า login
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]); // <-- ให้ effect นี้ทำงานเมื่อค่าเหล่านี้เปลี่ยน

  // 3. ขณะที่ UserProvider กำลังตรวจสอบ session ให้แสดง Loading...
  // นี่คือส่วนสำคัญที่ทำให้มัน "รอ"
  if (loading) {
    return <p>Loading user data...</p>;
  }
  
  // 4. ถ้าโหลดเสร็จแล้วแต่ยังไม่มี user (เผื่อไว้) ก็ไม่ต้องแสดงอะไร
  if (!user) {
      return null; // หรือกลับไปหน้า Login ก็ได้
  }

  const handleLogout = async () => {
    // โค้ดส่วน Logout เหมือนเดิม
    await fetch("http://localhost:3600/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  };

  // ถ้าทุกอย่างผ่าน จะแสดงข้อมูลโปรไฟล์
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
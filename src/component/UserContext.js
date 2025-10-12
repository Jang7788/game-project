import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3600/api/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) setUser(data.user);
      })
      .catch(err => console.error("Error fetching user:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

import { useEffect, useState } from "react";
import { api } from "./api/client";
import type { User } from "./api/client";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  const [me, setMe] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadMe() {
      try {
        const user = await api.me();
        if (!isMounted) return;
        setMe(user);
      } catch {
        // not logged in or error – keep null
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadMe();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!me) return <div>Please log in via Django /api-auth/login/.</div>;

  const isAdmin = me.role === "admin";

  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
}

export default App;

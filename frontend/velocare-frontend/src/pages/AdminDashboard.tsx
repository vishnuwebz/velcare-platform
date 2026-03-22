import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Booking } from "../api/client";


export default function AdminDashboard() {
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [pendingAssignments, setPendingAssignments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const [active, pending] = await Promise.all([
          api.activeBookings(),
          api.pendingAssignment(),
        ]);
        if (!isMounted) return;
        setActiveBookings(active);
        setPendingAssignments(pending);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || "Failed to load admin dashboard");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="page">Loading admin...</div>;
  if (error) return <div className="page text-red-500">Error: {error}</div>;

  return (
    <div className="page">
      <h1>Admin Operations HQ</h1>

      <section>
        <h2>Active orders ({activeBookings.length})</h2>
        <ul>
          {activeBookings.map((b) => (
            <li key={b.id}>
              {b.order_id} · {b.service.name} · {b.status} · {b.zone}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Pending assignment ({pendingAssignments.length})</h2>
        <ul>
          {pendingAssignments.map((b) => (
            <li key={b.id}>
              {b.order_id} · {b.service.name} · customer:{" "}
              {b.customer?.username ?? "N/A"}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

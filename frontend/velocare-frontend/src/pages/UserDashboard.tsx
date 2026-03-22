import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { User, Service, Booking, BookingPayload } from "../api/client";



export default function UserDashboard() {
  const [me, setMe] = useState<User | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");


  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const [user, svcList, bookingList] = await Promise.all([
          api.me(),
          api.services(),
          api.bookings(),
        ]);
        if (!isMounted) return;
        setMe(user);
        setServices(svcList);
        setBookings(bookingList);
      } catch (err: any) {
        if (!isMounted) return;
        setError(err.message || "Failed to load dashboard");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div className="page">Loading dashboard...</div>;
  if (error) return <div className="page text-red-500">Error: {error}</div>;

  return (
    <div className="page">
      <header>
        <h1>Welcome back, {me?.first_name || me?.username}</h1>
        <p>
          Membership: {me?.membership_tier} · Region: {me?.region}
        </p>
      </header>

      <section>
        <h2>Services</h2>
        <ul>
          {services.map((svc) => (
            <li key={svc.id}>
              <strong>{svc.name}</strong> – ₹{svc.base_price} ·{" "}
              {svc.duration_minutes} mins
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Your bookings</h2>
        <ul>
          {bookings.map((b) => (
            <li key={b.id}>
              {b.order_id} · {b.service.name} · {b.status} ·{" "}
              {new Date(b.scheduled_at).toLocaleString()} · {b.zone}
            </li>
          ))}
        </ul>
      </section>

    <section>
      <h2>Quick book (demo)</h2>
      <p>Books Premium Wash for your saved vehicle.</p>
      <button
        disabled={bookingLoading || services.length === 0 || bookings.length === 0}
        onClick={async () => {
          try {
            setBookingLoading(true);
            setBookingMessage("");

            const vehicleId = bookings[0]?.vehicle.id; // or fetch vehicles endpoint later
            const premium = services.find((s) => s.name === "Premium Wash") || services[0];

            const payload: BookingPayload = {
              service_id: premium.id,
              vehicle_id: vehicleId,
              scheduled_at: new Date().toISOString(), // for now, "now"
              address: "Flat 4B, Green View Apts, Adyar, Chennai",
              zone: "Adyar",
              amount: premium.base_price,
              gst_percent: "18.00",
            };

            const created = await api.createBooking(payload);
            setBookingMessage(`Created booking ${created.order_id} (${created.status})`);

            // optional: refresh bookings
            const updated = await api.bookings();
            setBookings(updated);
          } catch (err: any) {
            setBookingMessage(err.message || "Failed to create booking");
          } finally {
            setBookingLoading(false);
          }
        }}
      >
        {bookingLoading ? "Creating..." : "Book now"}
      </button>
      {bookingMessage && <p>{bookingMessage}</p>}
    </section>


    </div>
  );
}

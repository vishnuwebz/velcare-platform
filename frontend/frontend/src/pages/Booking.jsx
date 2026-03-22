import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const service = location.state?.service;

  // 🔥 Redirect if no service selected
  useEffect(() => {
    if (!service) {
      navigate("/services");
    }
  }, [service, navigate]);

  // 🔥 Booking State
  const [bookingData, setBookingData] = useState({
    vehicle: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 Handle Input Change
  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 Submit Booking
  const handleBooking = async () => {
    if (!bookingData.vehicle || !bookingData.address) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("simple-booking/", {
        vehicle: bookingData.vehicle,
        price: service.price,
        address: bookingData.address,
      });

      alert(`Booking Successful 🎉\nOrder ID: ${res.data.order_id}`);

      // Reset
      setBookingData({
        vehicle: "",
        address: "",
      });

      navigate("/services");

    } catch (error) {
      console.error(error);
      alert("Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page active">
        <div className="container">

          {/* TITLE */}
          <h1 className="section-title">Book Service</h1>

          {/* SERVICE DETAILS */}
          {service && (
            <div className="booking-service-card">
              <h2>{service.name}</h2>
              <p>Category: {service.category}</p>
              <p>Price: ₹{service.price}</p>
              <p>Duration: {service.duration} mins</p>
            </div>
          )}

          {/* FORM */}
          <div className="booking-form">

            {/* VEHICLE */}
            <div className="form-group">
              <label>Vehicle Type</label>
              <select
                name="vehicle"
                value={bookingData.vehicle}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select Vehicle</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>

            {/* ADDRESS */}
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={bookingData.address}
                onChange={handleChange}
                placeholder="Enter your location"
                className="form-input"
              />
            </div>

            {/* BUTTON */}
            <button
              className="btn btn-primary"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
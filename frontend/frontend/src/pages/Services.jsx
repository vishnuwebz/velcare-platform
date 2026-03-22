import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/services/ServiceCard";
import FilterBar from "../components/services/FilterBar";
import API from "../api/api";

export default function Services() {
  const [selected, setSelected] = useState("All");
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Fetch Services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);

      const res = await API.get("services/");
      setServices(res.data);

      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load services ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Categories
  const categories = [
    ...new Set(services.map((s) => s.category?.name)),
  ];

  // 🔥 Filter Logic
  const filtered =
    selected === "All"
      ? services
      : services.filter(
          (s) => s.category?.name === selected
        );

  return (
    <>
      <Navbar />

      <div className="page active">
        <div className="services-hero">
          <div className="container">
            <h1 className="section-title">Our Services</h1>

            <FilterBar
              categories={categories}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </div>

        <div className="services-grid-section container">

          {/* 🔄 LOADING */}
          {loading && (
            <div className="center-text">
              <p>Loading services...</p>
            </div>
          )}

          {/* ❌ ERROR */}
          {error && (
            <div className="center-text">
              <p>{error}</p>
            </div>
          )}

          {/* ⚠️ EMPTY */}
          {!loading && !error && filtered.length === 0 && (
            <div className="center-text">
              <p>No services available</p>
            </div>
          )}

          {/* ✅ DATA */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid-3">
              {filtered.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
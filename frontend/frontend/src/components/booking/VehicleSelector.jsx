export default function VehicleSelector({ bookingData, setBookingData, next }) {
  const vehicles = ["Hatchback", "Sedan", "SUV", "Luxury"];

  return (
    <div>
      <h3>Select Vehicle</h3>

      <div className="vehicle-grid">
        {vehicles.map((v, i) => (
          <div
            key={i}
            className={`vehicle-option ${
              bookingData.vehicle === v ? "selected" : ""
            }`}
            onClick={() =>
              setBookingData({ ...bookingData, vehicle: v })
            }
          >
            <span className="vehicle-option-icon">🚗</span>
            <div className="vehicle-option-name">{v}</div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={next}>
        Next
      </button>
    </div>
  );
}
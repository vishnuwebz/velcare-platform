export default function PackageSelector({ bookingData, setBookingData, next }) {
  const packages = [
    { name: "Basic", price: 499 },
    { name: "Standard", price: 999 },
    { name: "Premium", price: 1999 }
  ];

  return (
    <div>
      <h3>Select Package</h3>

      <div className="package-options">
        {packages.map((p, i) => (
          <div
            key={i}
            className={`pkg-option ${
              bookingData.package?.name === p.name ? "selected" : ""
            }`}
            onClick={() =>
              setBookingData({ ...bookingData, package: p })
            }
          >
            <div className="pkg-option-name">{p.name}</div>
            <div className="pkg-option-price">₹{p.price}</div>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={next}>
        Next
      </button>
    </div>
  );
}
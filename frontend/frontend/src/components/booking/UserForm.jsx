export default function UserForm({ bookingData, setBookingData, next }) {
  return (
    <div>
      <h3>Your Details</h3>

      <div className="form-group">
        <input
          className="form-input"
          placeholder="Name"
          onChange={(e) =>
            setBookingData({ ...bookingData, name: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <input
          className="form-input"
          placeholder="Phone"
          onChange={(e) =>
            setBookingData({ ...bookingData, phone: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <input
          className="form-input"
          placeholder="Address"
          onChange={(e) =>
            setBookingData({ ...bookingData, address: e.target.value })
          }
        />
      </div>

      <button className="btn btn-primary" onClick={next}>
        Continue
      </button>
    </div>
  );
}
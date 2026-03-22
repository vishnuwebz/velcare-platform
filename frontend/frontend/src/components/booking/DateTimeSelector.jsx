export default function DateTimeSelector({ bookingData, setBookingData, next }) {
  const times = ["10 AM", "12 PM", "2 PM", "4 PM"];

  return (
    <div>
      <h3>Select Time</h3>

      <div className="time-grid">
        {times.map((t, i) => (
          <div
            key={i}
            className={`time-option ${
              bookingData.time === t ? "selected" : ""
            }`}
            onClick={() =>
              setBookingData({ ...bookingData, time: t })
            }
          >
            {t}
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={next}>
        Next
      </button>
    </div>
  );
}
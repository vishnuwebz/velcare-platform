export default function OrderSummary({ bookingData }) {
  return (
    <div className="order-summary">
      <div className="summary-title">Summary</div>

      <div className="summary-row">
        <span>Vehicle:</span>
        <span>{bookingData.vehicle}</span>
      </div>

      <div className="summary-row">
        <span>Package:</span>
        <span>{bookingData.package?.name}</span>
      </div>

      <div className="summary-row">
        <span>Time:</span>
        <span>{bookingData.time}</span>
      </div>

      <div className="summary-row total">
        <span>Total:</span>
        <span className="summary-total-price">
          ₹{bookingData.package?.price || 0}
        </span>
      </div>
    </div>
  );
}
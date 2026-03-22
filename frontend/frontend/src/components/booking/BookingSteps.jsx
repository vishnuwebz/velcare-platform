export default function BookingSteps({ step }) {
  const steps = ["Vehicle", "Package", "Schedule", "Details"];

  return (
    <div className="booking-steps">
      {steps.map((s, i) => (
        <div
          key={i}
          className={`booking-step ${step === i + 1 ? "active" : ""}`}
        >
          <div className="step-circle">{i + 1}</div>
          <div className="step-name">{s}</div>
        </div>
      ))}
    </div>
  );
}
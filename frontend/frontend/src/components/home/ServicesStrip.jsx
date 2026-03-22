export default function ServicesStrip() {
  const services = [
    "Car Wash",
    "Interior Cleaning",
    "Ceramic Coating",
    "Engine Detailing",
    "Paint Protection",
    "Full Detailing"
  ];

  return (
    <div className="services-strip">
      <div className="services-strip-inner">
        {[...services, ...services].map((item, index) => (
          <div key={index} className="services-strip-item">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
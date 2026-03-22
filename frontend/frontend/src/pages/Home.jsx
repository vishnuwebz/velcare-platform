import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="page active">
        <div className="hero">
          <div className="hero-content container">
            <h1 className="hero-headline">
              PREMIUM <span className="accent">CAR CARE</span>
            </h1>

            <p className="hero-sub">
              Professional car detailing & maintenance at your doorstep.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary">Book Now</button>
              <button className="btn btn-secondary">Explore Services</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
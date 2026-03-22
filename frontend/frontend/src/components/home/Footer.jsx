export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo">
            VELO<span>CARE</span>
          </div>
          <p className="footer-desc">
            Premium car care services at your doorstep.
          </p>
        </div>

        <div>
          <div className="footer-col-title">Services</div>
          <ul className="footer-links">
            <li><a>Car Wash</a></li>
            <li><a>Detailing</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            <li><a>About</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Support</div>
          <ul className="footer-links">
            <li><a>Help</a></li>
            <li><a>Privacy</a></li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-bottom-text">
          © 2026 VELOCARE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
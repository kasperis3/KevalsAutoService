import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Keval Auto Service</h3>
            <p className="footer-text">
              Your trusted neighborhood garage for quality automotive service
              and repairs.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-list">
              <li>Oil Changes</li>
              <li>Diagnostics</li>
              <li>General Repairs</li>
              <li>Vehicle Inspections</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-text">
              Request a quote using the form above and we'll get back to you
              promptly.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Keval Auto Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

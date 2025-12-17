import "./Hero.css";

function Hero({ onRequestQuote }) {
  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <h1 className="hero-title">Keval Auto Service</h1>
        <p className="hero-subtitle">
          Professional Automotive Care You Can Trust
        </p>
        <p className="hero-description">
          Quality oil changes and complete automotive diagnostics from a trusted
          local garage
        </p>
        <button className="cta-button" onClick={onRequestQuote}>
          Request a Quote
        </button>
      </div>
    </div>
  );
}

export default Hero;

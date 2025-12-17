import "./Services.css";

function Services() {
  const services = [
    {
      icon: "🛢️",
      title: "Oil Changes",
      description:
        "Professional oil change service using quality oils and filters. Keep your engine running smoothly.",
    },
    {
      icon: "🔧",
      title: "Diagnostics",
      description:
        "Comprehensive vehicle diagnostics to identify and resolve issues quickly and accurately.",
    },
    {
      icon: "⚙️",
      title: "General Repairs",
      description:
        "Expert repair services for all makes and models. From minor fixes to major repairs.",
    },
    {
      icon: "🔍",
      title: "Inspections",
      description:
        "Thorough vehicle inspections to ensure your car is safe and road-ready.",
    },
  ];

  return (
    <section className="services section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Comprehensive automotive care from a trusted local garage
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;

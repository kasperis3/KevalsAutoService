import { useState } from "react";
import { FilloutPopupEmbed } from "@fillout/react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openQuoteForm = () => setIsFormOpen(true);
  const closeQuoteForm = () => setIsFormOpen(false);

  return (
    <div className="app">
      <Hero onRequestQuote={openQuoteForm} />
      <Services />
      <Reviews />
      <Footer />

      <FilloutPopupEmbed
        filloutId="6FJ9EYXNtvus"
        isOpen={isFormOpen}
        onClose={closeQuoteForm}
        inheritParameters
      />
    </div>
  );
}

export default App;

import Image from "next/image";
import { Plane, Ship, Package, Headphones, Award, BadgeEuro, Heart } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="hero">
        <Image
          src="/LogoTeLoResuelvoPNG.png"
          alt="Te Lo Resuelvo Viajes"
          width={280}
          height={168}
          className="hero-logo"
          priority
        />

        <h1>
          Tu agencia de viajes <span>de confianza</span> en Italia
        </h1>
        <p>
          Vuelos, paquetes turísticos, cruceros y asistencia personalizada.
          Viaja tranquilo, nosotros nos encargamos de todo.
        </p>

        <a
          href="https://wa.me/393000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta"
        >
          Contáctanos por WhatsApp
        </a>
      </section>

      {/* ─── Servicios ─── */}
      <section className="section section-alt" id="servicios">
        <h2 className="section-title">Nuestros servicios</h2>
        <p className="section-sub">
          Todo lo que necesitas para tu próximo viaje, en un solo lugar.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon"><Plane size={28} /></div>
            <h3>Vuelos</h3>
            <p>Buscamos las mejores tarifas en vuelos nacionales e internacionales.</p>
          </div>

          <div className="service-card">
            <div className="service-icon"><Package size={28} /></div>
            <h3>Paquetes turísticos</h3>
            <p>Combinaciones de vuelo + hotel a medida para cualquier destino.</p>
          </div>

          <div className="service-card">
            <div className="service-icon"><Ship size={28} /></div>
            <h3>Cruceros</h3>
            <p>Las mejores ofertas en cruceros por el Mediterráneo y el mundo.</p>
          </div>

          <div className="service-card">
            <div className="service-icon"><Headphones size={28} /></div>
            <h3>Asistencia 24/7</h3>
            <p>Soporte antes, durante y después de tu viaje. Siempre disponibles.</p>
          </div>
        </div>
      </section>

      {/* ─── Por qué elegirnos ─── */}
      <section className="section" id="nosotros">
        <h2 className="section-title">Por qué elegirnos</h2>
        <p className="section-sub">
          Más que una agencia, somos tu compañero de viaje.
        </p>

        <div className="why-grid">
          <div className="why-item">
            <div className="why-icon"><Award size={24} /></div>
            <div>
              <h3>Experiencia</h3>
              <p>Años ayudando a viajeros a descubrir el mundo con tranquilidad y confianza.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon"><BadgeEuro size={24} /></div>
            <div>
              <h3>Mejores precios</h3>
              <p>Acceso a tarifas especiales y ofertas exclusivas para nuestros clientes.</p>
            </div>
          </div>

          <div className="why-item">
            <div className="why-icon"><Heart size={24} /></div>
            <div>
              <h3>Atención personalizada</h3>
              <p>Cada viaje es único. Te escuchamos y diseñamos la experiencia perfecta para ti.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="footer-brand">Te Lo Resuelvo Viajes</div>
        <div className="footer-links">
          <a href="#servicios">Servicios</a>
          <a href="#nosotros">Nosotros</a>
          <a href="mailto:info@teloresuelvo.it">Email</a>
          <a href="https://wa.me/393000000000" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Te Lo Resuelvo Viajes. Todos los derechos reservados.</p>
      </footer>
    </>
  );
}

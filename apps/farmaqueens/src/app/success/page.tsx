import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="container">
      <div className="card">
        <div className="logo">
          <h1 style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}>
            <span style={{ color: "#eb6a56" }}>FLEX</span>{" "}
            <span style={{ color: "#1e293b" }}>FARMAQUEENS</span>
          </h1>
        </div>
        
        <h2 className="title" style={{ color: "#059669" }}>Pago realizado</h2>
        <p className="subtitle">
          Hemos recibido tu pago correctamente. Recibirás una confirmación por email de Stripe.
        </p>
        
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/" className="button button-primary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

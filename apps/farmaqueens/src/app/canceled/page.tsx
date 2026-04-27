import Link from "next/link";

export default function CanceledPage() {
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
        
        <h2 className="title" style={{ color: "#dc2626" }}>Pago cancelado</h2>
        <p className="subtitle">
          No se ha realizado ningún cargo. Puedes volver a intentarlo cuando quieras.
        </p>
        
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link href="/" className="button button-secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

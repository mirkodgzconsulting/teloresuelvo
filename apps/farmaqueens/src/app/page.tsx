"use client";

import { useMemo, useState } from "react";
import { LockKeyhole } from "lucide-react";

export default function Home() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState<null | "now" | "installments">(null);

  const valid = useMemo(() => {
    const n = parseFloat(amount);
    return description.trim().length > 0 && Number.isFinite(n) && n > 0;
  }, [description, amount]);

  async function startCheckout(mode: "now" | "installments") {
    if (!valid) return;
    try {
      setSubmitting(mode);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amount, mode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al crear la sesión");
      if (data?.url) {
        window.location.href = data.url as string;
      }
    } catch (e) {
      alert("Error al iniciar el pago. Inténtalo de nuevo.");
      console.error(e);
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <main>
      <div className="bg-shape shape-1" />
      <div className="bg-shape shape-2" />

      <div className="container">
        <div className="card">
          <div className="logo">
            <h1 style={{
              fontSize: "2rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              textAlign: "center",
            }}>
              <span style={{ color: "#eb6a56" }}>FLEX</span>{" "}
              <span style={{ color: "#1e293b" }}>FARMAQUEENS</span>
            </h1>
          </div>

          <p className="subtitle">Acepta pagos online y ofrece pagos a plazos</p>

          <div className="form-group">
            <label htmlFor="description" className="label">
              Descripción del pago
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej. Pedido farmacia online"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="label">
              Importe (EUR)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ej. 120.00"
              className="input"
            />
          </div>

          <div className="button-group">
            <button
              onClick={() => startCheckout("now")}
              disabled={!valid || submitting !== null}
              className={`button button-primary ${submitting === "now" ? "loading" : ""}`}
            >
              {submitting === "now" ? "Redirigiendo..." : "AHORA"}
            </button>

            <button
              onClick={() => startCheckout("installments")}
              disabled={!valid || submitting !== null}
              className={`button button-secondary ${submitting === "installments" ? "loading" : ""}`}
            >
              {submitting === "installments" ? "Redirigiendo..." : "EN CUOTAS"}
            </button>
          </div>

          <div
            style={{
              marginTop: "1rem",
              paddingTop: "0.9rem",
              borderTop: "1px solid rgba(148, 163, 184, 0.25)",
              textAlign: "center",
              color: "#64748b",
              fontSize: "0.82rem",
            }}
          >
            <p style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontWeight: 600 }}>
              <LockKeyhole size={14} />
              Pago seguro con Stripe
            </p>
            <p style={{ marginTop: "0.3rem" }}>
              Serás redirigido a Stripe para completar el pago.
            </p>
            <p style={{ marginTop: "0.3rem" }}>
              Powered by{" "}
              <a
                href="https://stripe.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline" }}
              >
                Stripe
              </a>
              {" · "}
              <a
                href="https://stripe.com/legal/consumer"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline" }}
              >
                Términos
              </a>
              {" · "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline" }}
              >
                Privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

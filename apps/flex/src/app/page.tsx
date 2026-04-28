"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
        {/* Decorative element for the glass card */}
        <div className="card">
          <div style={{ position: "absolute", top: 16, right: 16 }}>
            <Link
              href="/it"
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 transition-all duration-300 group cursor-pointer rounded-lg"
              aria-label="Cambiar idioma a italiano"
              title="Italiano"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 3 2" className="w-full h-full rounded-sm">
                  <rect width="1" height="2" fill="#009246" />
                  <rect x="1" width="1" height="2" fill="#fff" />
                  <rect x="2" width="1" height="2" fill="#ce2b37" />
                </svg>
              </span>
              <span className="text-[13px] uppercase tracking-widest text-white font-medium">IT</span>
            </Link>
          </div>

          <div className="logo">
            <Image
              src="/LogoTeLoResuelvoPNG.png"
              alt="Te Lo Resuelvo Viajes Logo"
              width={250}
              height={150}
              priority
            />
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
              placeholder="Ej. Vuelo i/v Lima - Milán"
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
              placeholder="Ej. 1200.00"
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
              {submitting === "installments" ? "Redirigiendo..." : "EN CUOTAS "}
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

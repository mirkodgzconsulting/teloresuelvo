"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

export default function HomeIt() {
  const [showLoader, setShowLoader] = useState(true);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState<null | "now" | "installments">(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
      if (!res.ok) throw new Error(data?.error || "Errore creazione sessione");
      if (data?.url) {
        window.location.href = data.url as string;
      }
    } catch (e) {
      alert("Errore nell'avvio del pagamento. Riprova.");
      console.error(e);
    } finally {
      setSubmitting(null);
    }
  }

  if (showLoader) {
    return (
      <div className="page-loader">
        <div className="page-loader-inner">
          <Image
            src="/LogoTeLoResuelvoPNG.png"
            alt="Te Lo Resuelvo Viajes"
            width={150}
            height={150}
            className="page-loader-logo"
            priority
          />
          <div className="page-loader-spinner" />
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="bg-shape shape-1" />
      <div className="bg-shape shape-2" />

      <div className="container">
        <div className="card">
          <div style={{ position: "absolute", top: 16, right: 16 }}>
            <p style={{ fontSize: "0.68rem", color: "#64748b", textAlign: "right", marginBottom: "0.2rem", fontWeight: 600 }}>
              Cambia lingua
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-all duration-200 cursor-pointer rounded-lg shadow-sm"
              aria-label="Cambia lingua a spagnolo"
              title="Español"
            >
              <span className="w-4 h-4 flex items-center justify-center">
                <svg viewBox="0 0 3 2" className="w-full h-full rounded-sm">
                  <rect width="3" height="2" fill="#c60b1e" />
                  <rect y="0.5" width="3" height="1" fill="#ffc400" />
                </svg>
              </span>
              <span className="text-[13px] uppercase tracking-widest text-black font-semibold">ESP</span>
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

          <p className="subtitle">TLR TRAVEL ITALY SRL ACCETTA PAGAMENTI ONLINE E OFFRE PAGAMENTI A RATE.</p>

          <div className="form-group">
            <label htmlFor="description" className="label">
              Descrizione pagamento
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Es. Volo A/R Lima - Milano"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="label">
              Importo (EUR)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Es. 1200.00"
              className="input"
            />
          </div>

          <div className="button-group">
            <button
              onClick={() => startCheckout("now")}
              disabled={!valid || submitting !== null}
              className={`button button-primary ${submitting === "now" ? "loading" : ""}`}
            >
              {submitting === "now" ? "Reindirizzamento..." : "Ora"}
            </button>

            <button
              onClick={() => startCheckout("installments")}
              disabled={!valid || submitting !== null}
              className={`button button-secondary ${submitting === "installments" ? "loading" : ""}`}
            >
              {submitting === "installments" ? "Reindirizzamento..." : "A rate"}
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
              Pagamento sicuro con Stripe
            </p>
            <p style={{ marginTop: "0.3rem" }}>
              Verrai reindirizzato a Stripe per completare il pagamento.
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
                Termini
              </a>
              {" · "}
              <a
                href="https://stripe.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "underline" }}
              >
                Privacy
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}


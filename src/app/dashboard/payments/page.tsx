"use client";
import { useState } from "react";
import type React from "react";

export default function PaymentsPage() {
  const [amount, setAmount] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!teacherName.trim()) {
      setError("Please enter the teacher's name.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setAmount("");
      setTeacherName("");
      setDescription("");
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  }

  const recentPayments = [
    {
      id: 1,
      teacher: "Alice Johnson",
      amount: 2500,
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: 2,
      teacher: "Bob Smith",
      amount: 2800,
      date: "2024-01-14",
      status: "completed",
    },
    {
      id: 3,
      teacher: "Priya Patel",
      amount: 2600,
      date: "2024-01-13",
      status: "pending",
    },
  ];

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="container">
          {/* Header */}
          <div className="page-header animate-fade-in-up">
            <h1 className="page-title">
              <span style={{ fontSize: "48px" }}>💳</span>
              <span>Payment Center</span>
            </h1>
            <p className="page-subtitle">
              Process secure payments for your teaching staff
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
              gap: "40px",
            }}
          >
            {/* Payment Form */}
            <div className="animate-fade-in-up">
              <div className="form-card">
                <div className="form-header">
                  <h2 className="form-title">Process Payment</h2>
                  <p style={{ color: "#4a5568" }}>
                    Enter payment details below
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">
                      <span style={{ fontSize: "16px" }}>👤</span>
                      <span>
                        Teacher Name<span style={{ color: "#e53e3e" }}>*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      className="form-input"
                      placeholder="Enter teacher's full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span style={{ fontSize: "16px" }}>💰</span>
                      <span>
                        Amount (USD)<span style={{ color: "#e53e3e" }}>*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="form-input"
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span style={{ fontSize: "16px" }}>📝</span>
                      <span>Description (Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-input"
                      placeholder="Monthly salary, bonus, etc."
                    />
                  </div>

                  {error && (
                    <div className="message error">
                      <span style={{ fontSize: "18px" }}>⚠️</span>
                      <span>{error}</span>
                    </div>
                  )}

                  {success && (
                    <div className="message success">
                      <span style={{ fontSize: "18px" }}>✅</span>
                      <span>Payment processed successfully! 🎉</span>
                    </div>
                  )}

                  <div className="form-actions">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-submit"
                      style={{ width: "100%" }}
                    >
                      {loading ? "Processing Payment..." : "Process Payment"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Recent Payments */}
            <div className="animate-fade-in-up">
              <div className="card">
                <h3
                  className="section-header"
                  style={{ fontSize: "24px", marginBottom: "24px" }}
                >
                  Recent Payments
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      style={{
                        padding: "20px",
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontWeight: "700",
                              fontSize: "18px",
                              color: "#2d3748",
                              marginBottom: "4px",
                            }}
                          >
                            {payment.teacher}
                          </p>
                          <p style={{ color: "#4a5568", fontSize: "14px" }}>
                            {payment.date}
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p
                            style={{
                              fontWeight: "900",
                              fontSize: "20px",
                              marginBottom: "4px",
                              background:
                                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            ${payment.amount.toLocaleString()}
                          </p>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "4px 8px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "600",
                              ...(payment.status === "completed"
                                ? { background: "#c6f6d5", color: "#2f855a" }
                                : { background: "#fef5e7", color: "#d69e2e" }),
                            }}
                          >
                            {payment.status === "completed" ? "✅" : "⏳"}{" "}
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

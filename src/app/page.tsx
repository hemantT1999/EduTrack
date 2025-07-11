import Link from "next/link";

export default function Home() {
  return (
    <div className="page-container">
      <div className="hero">
        <h1 className="hero-title">
          Welcome to
          <br />
          EduTrack
        </h1>

        <p className="hero-subtitle">
          A modern, responsive, and user-friendly platform for managing teachers
          and payments with style and efficiency.
        </p>

        <div className="hero-buttons">
          <Link href="/dashboard/teachers" className="btn-primary">
            <span style={{ fontSize: "24px" }}>👥</span>
            <span>Manage Teachers</span>
            <span style={{ fontSize: "20px" }}>→</span>
          </Link>

          <Link href="/dashboard/payments" className="btn-secondary">
            <span style={{ fontSize: "24px" }}>💳</span>
            <span>Payments</span>
            <span style={{ fontSize: "20px" }}>→</span>
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#4a5568",
            fontSize: "16px",
          }}
        >
          <span style={{ color: "#f6e05e", fontSize: "20px" }}>⭐</span>
          <span style={{ fontWeight: "600" }}>
            Built with Next.js, TypeScript, and Tailwind CSS
          </span>
          <span style={{ color: "#f6e05e", fontSize: "20px" }}>⭐</span>
        </div>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link href="/" className="logo">
          <span style={{ fontSize: "32px" }}>🎓</span>
          <span>EduTrack</span>
        </Link>

        <div className="nav-links">
          <Link
            href="/"
            className={`nav-link ${pathname === "/" ? "active" : ""}`}
          >
            <span style={{ fontSize: "18px" }}>🏠</span>
            <span>Home</span>
          </Link>

          <Link
            href="/dashboard/teachers"
            className={`nav-link ${
              pathname === "/dashboard/teachers" ? "active" : ""
            }`}
          >
            <span style={{ fontSize: "18px" }}>👥</span>
            <span>Teachers</span>
          </Link>

          <Link
            href="/dashboard/payments"
            className={`nav-link ${
              pathname === "/dashboard/payments" ? "active" : ""
            }`}
          >
            <span style={{ fontSize: "18px" }}>💳</span>
            <span>Payments</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

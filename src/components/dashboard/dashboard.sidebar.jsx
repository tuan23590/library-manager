import React from "react";

export default function DashboardSidebar() {
  return (
    <aside
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#343a40",
        color: "white",
        padding: "20px",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "24px", textAlign: "center" }}>
        Dashboard
      </h2>
      <nav>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            textAlign: "center",
          }}
        >
          <li style={{ marginBottom: "10px" }}>
            <a
              href="/dashboard"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "10px 20px",
                borderRadius: "4px",
                backgroundColor: "#007BFF",
              }}
            >
              Home
            </a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a
              href="/dashboard/book"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "10px 20px",
                borderRadius: "4px",
                backgroundColor: "#007BFF",
              }}
            >
              Book Management
            </a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a
              href="/dashboard/user"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "10px 20px",
                borderRadius: "4px",
                backgroundColor: "#007BFF",
              }}
            >
                User Management
            </a>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <a
              href="/dashboard/borrow"
              style={{
                color: "white",
                textDecoration: "none",
                display: "block",
                padding: "10px 20px",
                borderRadius: "4px",
                backgroundColor: "#007BFF",
              }}
            >
                Borrow Management
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

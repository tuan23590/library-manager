"use client";
import React, { useEffect, useState } from "react";

export default function HomeHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLoginOrLogout = () => {
    if (user) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    } else {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  return (
    <header
      style={{
        backgroundColor: "#007BFF",
        color: "white",
        padding: "10px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>My Website</h1>
        <nav>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "20px",
              margin: 0,
              padding: 0,
            }}
          >
            <li>
              <a href="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                style={{ color: "white", textDecoration: "none" }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                style={{ color: "white", textDecoration: "none" }}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                style={{ color: "white", textDecoration: "none" }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div style={{ position: "relative" }}>
          <button
            onClick={toggleDropdown}
            style={{
              background: "none",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {user?.name || "Account"}
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                backgroundColor: "white",
                color: "black",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "4px",
                padding: "10px",
                zIndex: 1,
              }}
            >
              <button
                onClick={handleLoginOrLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007BFF",
                  cursor: "pointer",
                  padding: "10px",
                  fontSize: "16px",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {user ? "Logout" : "Login"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

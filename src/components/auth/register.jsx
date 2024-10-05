"use client";
import { register } from "@/actions/user";
import React from "react";

export default function Register() {
  const action = async (e) => {
    const name = e.get("name");
    const email = e.get("email");
    const password = e.get("password");
    const confirm_password = e.get("confirm-password");

    if (password !== confirm_password) {
      alert("Passwords do not match");
    }

    const response = await register({
      name,
      email,
      password,
    });
    if (response) {
      alert("User registered successfully");
      window.location.href = "/login";
    } else {
      alert("User registration failed");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <form
        style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "400px",
        }}
        action={action}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="name"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            style={{
              width: "95%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            style={{
              width: "95%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            style={{
              width: "95%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="confirm-password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
            style={{
              width: "95%",
              padding: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <a
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "15px",
            color: "#007BFF",
            textDecoration: "none",
          }}
          href="/login"
        >
          {" "}
          Already have an account? Login
        </a>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

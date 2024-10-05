"use client";
import { login } from "@/actions/user";
import React from "react";

export default function Login() {
  const action = async (e) => {
    const email = e.get("email");
    const password = e.get("password");

    const response = await login({
      email,
      password,
    });
    if (response) {
      window.location.href = "/";
      localStorage.setItem("user", response);
    } else {
      alert("User login failed");
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
          width: "400px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
        action={action}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

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
        <a
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "15px",
            color: "#007BFF",
            textDecoration: "none",
          }}
          href="/register"
        >
          {" "}
          Don't have an account? Register{" "}
        </a>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              width: "100%",
            }}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

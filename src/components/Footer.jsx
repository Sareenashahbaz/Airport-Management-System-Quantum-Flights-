// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-auto">
      <p className="mb-0">
        &copy; {new Date().getFullYear()} Airport Management System of Quantum
        Flights. All rights reserved.
      </p>
    </footer>
  );
}

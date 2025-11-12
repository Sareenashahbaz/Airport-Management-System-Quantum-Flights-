// src/components/Button.jsx
import React from "react";
import { Button as BootstrapButton } from "react-bootstrap";

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <BootstrapButton
      type={type}
      variant={variant}
      onClick={onClick}
      className={`w-100 w-sm-auto ${className}`}
    >
      {children}
    </BootstrapButton>
  );
}

import React from "react";
import "./LoadingSpinner.css";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "medium" }) => {
  return (
    <div className={`loading-spinner loading-spinner-${size}`} />
  );
};
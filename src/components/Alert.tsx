import React, { useEffect, useState } from "react";

interface AlertType {
  type: "success" | "error" | "warning";
  message: string;
  onClose?: () => void;
}

function Alert({ type, message, onClose }: AlertType) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses = "flex justify-between items-center rounded p-2";
  const successClasses = "bg-green-100 text-green-700 border-green-400";
  const errorClasses = "bg-red-100 text-red-700 border-red-400";
  const warningClasses = "bg-yellow-100 text-yellow-700 border-yellow-400";

  let alertClasses = baseClasses;

  switch (type) {
    case "success":
      alertClasses += ` ${successClasses}`;

      break;
    case "error":
      alertClasses += ` ${errorClasses}`;
      break;
    case "warning":
      alertClasses += ` ${warningClasses}`;
      break;
    default:
      break;
  }
  if (!visible) return null;
  return (
    type &&
    message && (
      <div className={alertClasses} role="alert">
        <div className="flex items-baseline gap-2 text-base">{message}</div>
      </div>
    )
  );
}

export default Alert;

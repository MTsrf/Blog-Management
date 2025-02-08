import React, { forwardRef } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        disabled={loading}
        className="w-full bg-primary hover:shadow text-white py-2 rounded-md disabled:opacity-50"
      >
        {loading ? (
          <div className="flex w-full justify-center">
            <Spinner className="text-white animate-spin" />
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;

import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  loading?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, type = "text", error, loading, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        {label && (
          <label className="block text-gray-600 text-sm mb-1">{label}</label>
        )}
        <div className="relative">
          <input
            autoComplete="new-password"
            type={type === "password" && showPassword ? "text" : type}
            {...props}
            ref={ref}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          />
          {/* Password Toggle Icon */}
          {type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField"; // Necessary for forwardRef components

export default TextField;

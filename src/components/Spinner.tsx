import { LoaderCircle } from "lucide-react";
import React from "react";

const Spinner = ({
  size,
  className,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <LoaderCircle
      size={size}
      className={`${className ? className : "animate-spin text-primary"}`}
    />
  );
};

export default Spinner;

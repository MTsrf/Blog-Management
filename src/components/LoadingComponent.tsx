import React from "react";
import Spinner from "./Spinner";

const LoadingComponent = () => {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <Spinner className="size-9 text-primary animate-spin" />
    </div>
  );
};

export default LoadingComponent;

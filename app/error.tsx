"use client";

import React, { useEffect } from "react";

export default function error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      error
      <button onClick={() => reset()}>Refresh</button>
    </div>
  );
}

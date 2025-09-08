"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative grow">
      <div className="mt-5 mb-14 px-4 lg:px-6">
        <div className="max-w-7xl md:mx-auto">
          <h2 className="mt-12 text-3xl text-white">Something went wrong!</h2>
          <button
            onClick={() => reset()}
            className="mt-4 cursor-pointer border border-white px-8 py-2 text-base font-medium text-white"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}

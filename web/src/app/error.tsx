"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

/** Route-level error boundary (client). */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Telemetry hookpoint: log error.digest to your monitoring stack.
    console.error(error);
  }, [error]);

  return (
    <section className="grid min-h-[60vh] place-items-center py-24">
      <div className="text-center">
        <h1 className="text-display-xs font-bold text-gray-900 dark:text-gray-50">
          কিছু একটা ভুল হয়েছে
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-gray-500 dark:text-gray-400">
          সমস্যাটি লগ করা হয়েছে। আবার চেষ্টা করুন বা একটু পরে ফিরে আসুন।
        </p>
        <div className="mt-8 flex justify-center">
          <Button onClick={reset}>আবার চেষ্টা করুন</Button>
        </div>
      </div>
    </section>
  );
}

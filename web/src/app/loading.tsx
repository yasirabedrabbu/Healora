import { Container } from "@/components/shared/Container";

/** Route-level loading skeleton — flat surfaces + borders, no shimmer/gradients. */
export default function Loading() {
  return (
    <Container className="py-16">
      <div className="animate-pulse space-y-6" aria-busy="true" aria-live="polite">
        <div className="h-8 w-2/3 rounded-lg bg-gray-100 dark:bg-gray-800" />
        <div className="h-4 w-1/2 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 rounded-xl border border-gray-200 dark:border-gray-800" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="h-64 rounded-xl border border-gray-200 dark:border-gray-800" />
          ))}
        </div>
      </div>
    </Container>
  );
}

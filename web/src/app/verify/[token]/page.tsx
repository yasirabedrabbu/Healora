import { Container } from "@/components/shared/Container";
import { VerifyView } from "./verify-view";

export const metadata = { title: "প্রেসক্রিপশন যাচাই" };

// Tokens are unbounded (any QR value) → allow blocking render at request time.
export const instant = false;

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <section className="py-20">
      <Container className="max-w-xl">
        <VerifyView token={token} />
      </Container>
    </section>
  );
}

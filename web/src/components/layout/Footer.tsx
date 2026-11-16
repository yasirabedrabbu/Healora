import Link from "next/link";
import { CurrentYear } from "@/components/shared/CurrentYear";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-slate">{siteConfig.description}</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-ink">Quick links</h4>
          <ul className="space-y-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-slate hover:text-primary-600">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-ink">Contact</h4>
          <ul className="space-y-3 text-sm text-slate">
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.phone}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container className="text-center text-xs text-slate">
          © <CurrentYear /> {siteConfig.name}. Shob adhikar surakshito.
        </Container>
      </div>
    </footer>
  );
}
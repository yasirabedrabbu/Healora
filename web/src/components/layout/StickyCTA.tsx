"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useI18n } from "@/lib/i18n";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * Sticky mobile CTA — appears after scrolling past the hero on marketing
 * pages. Hidden on md+ and inside the portal.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isPortal = pathname.startsWith("/dashboard") ||
    pathname.startsWith("/records") ||
    pathname.startsWith("/prescriptions") ||
    pathname.startsWith("/blood") ||
    pathname.startsWith("/family");

  return (
    <AnimatePresence>
      {visible && !isPortal && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: EASE_STANDARD }}
          className="fixed inset-x-4 bottom-4 z-50 md:hidden"
        >
          <ButtonLink href="/doctors" block size="lg" className="border border-gray-200">
            {t.common.findDoctor}
          </ButtonLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

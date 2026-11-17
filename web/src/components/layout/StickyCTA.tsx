"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { useI18n } from "@/lib/i18n";
import { EASE_STANDARD } from "@/lib/motion";

/**
 * Sticky mobile CTA on marketing pages (rendered only by MarketingLayout,
 * so it never appears inside the portal). Leaves 5.5rem free on the right
 * for the assistant FAB so the two never overlap.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.3, ease: EASE_STANDARD }}
          className="fixed bottom-4 left-4 right-[5.5rem] z-50 md:hidden"
        >
          <ButtonLink href="/doctors" block size="lg" variant="ink">
            {t.common.findDoctor}
          </ButtonLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
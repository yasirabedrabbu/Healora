"use client";

import { HugeiconsIcon, ArrowRight01Icon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useI18n } from "@/lib/i18n";

export function AssistantInput({
  value,
  onChange,
  onSend,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled: boolean;
}) {
  const { t } = useI18n();
  return (
    <div className="border-t border-gray-200 p-3 dark:border-gray-700">
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <div className="flex-1">
          <Input
            size="sm"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={t.ui.assistantPlaceholder}
            aria-label={t.ui.assistantMessageLabel}
            maxLength={2000}
            className="rounded-full px-4"
          />
        </div>
        <Button type="submit" size="sm" disabled={disabled} aria-label={t.ui.assistantSend} className="w-9 px-0">
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden />
        </Button>
      </form>
      <p className="mt-2 text-center text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        {t.ui.assistantDisclaimer}
      </p>
    </div>
  );
}
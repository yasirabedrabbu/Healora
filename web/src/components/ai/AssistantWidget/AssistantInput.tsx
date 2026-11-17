"use client";

import { HugeiconsIcon, ArrowRight01Icon } from "@/components/icons";

/** Composer with accessible send button; disclaimer sits below. */
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
  return (
    <div className="border-t border-gray-200 p-3 dark:border-gray-800">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="লক্ষণ বা প্রশ্ন লিখুন…"
          aria-label="বার্তা"
          maxLength={2000}
          className="h-10 flex-1 rounded-xl border border-gray-300 bg-white px-3 text-sm focus-visible:outline-2 focus-visible:outline-brand-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
        />
        <button
          type="submit"
          disabled={disabled}
          aria-label="পাঠান"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white transition-colors duration-150 hover:bg-brand-600 disabled:pointer-events-none disabled:opacity-40"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden />
        </button>
      </form>
      <p className="mt-2 text-center text-[10px] leading-relaxed text-gray-400 dark:text-gray-500">
        AI চিকিৎসা পরামর্শ নয় · জরুরিতে ৯৯৯ · ডেটা বাইরে যায় না
      </p>
    </div>
  );
}

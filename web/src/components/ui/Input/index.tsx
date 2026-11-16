import { useId } from "react";
import { cn } from "@/lib/utils";
import {
  errorBase,
  hintBase,
  inputBase,
  inputSizes,
  inputStates,
  labelBase,
} from "./variants";
import type { FieldWrapProps, InputProps } from "./types";

function FieldWrap({ label, hint, error, htmlFor, children }: FieldWrapProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={htmlFor} className={labelBase}>
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p className={errorBase} role="alert">
          {error}
        </p>
      ) : (
        hint && <p className={hintBase}>{hint}</p>
      )}
    </div>
  );
}

export function Input({
  size = "md",
  prefixIcon,
  label,
  hint,
  error,
  disabled,
  className,
  id,
  ...props
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const state: keyof typeof inputStates = disabled
    ? "disabled"
    : error
      ? "error"
      : "default";

  return (
    <FieldWrap label={label} hint={hint} error={error} htmlFor={inputId}>
      <div className="relative">
        {prefixIcon && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {prefixIcon}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            inputBase,
            inputSizes[size],
            inputStates[state],
            prefixIcon && "pl-10",
            className
          )}
          {...props}
        />
      </div>
    </FieldWrap>
  );
}

import { useId } from "react";
import { cn } from "@/lib/utils";
import { errorBase, hintBase, inputBase, inputSizes, inputStates, labelBase } from "./variants";
import type { FieldWrapProps, InputProps } from "./types";

type WrapProps = FieldWrapProps & { errorId: string; hintId: string };

function FieldWrap({ label, hint, error, htmlFor, errorId, hintId, children }: WrapProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={htmlFor} className={labelBase}>
          {label}
        </label>
      )}
      {children}
      {error ? (
        <p id={errorId} className={errorBase} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className={hintBase}>
            {hint}
          </p>
        )
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
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const state: keyof typeof inputStates = disabled ? "disabled" : error ? "error" : "default";

  return (
    <FieldWrap
      label={label}
      hint={hint}
      error={error}
      htmlFor={inputId}
      errorId={errorId}
      hintId={hintId}
    >
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
          aria-describedby={error ? errorId : hint ? hintId : undefined}
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
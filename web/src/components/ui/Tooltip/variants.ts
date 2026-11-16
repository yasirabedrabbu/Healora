import type { TooltipPosition } from "./types";

export const tooltipBase =
  "pointer-events-none absolute z-50 rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-none transition-opacity duration-150 ease-standard group-hover/tt:opacity-100 group-focus-within/tt:opacity-100 dark:bg-gray-700";

export const tooltipPositions: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 mb-1.5 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-1.5 -translate-x-1/2",
  left: "right-full top-1/2 mr-1.5 -translate-y-1/2",
  right: "left-full top-1/2 ml-1.5 -translate-y-1/2",
};

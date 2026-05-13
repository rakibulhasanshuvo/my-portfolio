import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard utility for merging tailwind classes with support for conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

/**
 * Formats a date using a centralized Intl.DateTimeFormat instance for performance.
 * @param date The date to format (Date object, timestamp, or ISO string)
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
export function formatDate(date: Date | string | number) {
  return dateFormatter.format(new Date(date));
}

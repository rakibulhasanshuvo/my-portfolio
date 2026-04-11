import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class names into a single string, handling Tailwind CSS conflicts.
 *
 * @param inputs - Class names, objects, or arrays to be merged.
 * @returns A space-separated string of merged class names.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

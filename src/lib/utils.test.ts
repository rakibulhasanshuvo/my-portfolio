import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
    it('should merge simple class names', () => {
        expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes (objects)', () => {
        expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2');
    });

    it('should handle arrays of classes', () => {
        expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
    });

    it('should handle null, undefined, and boolean values', () => {
        expect(cn('class1', null, undefined, false, true, 'class2')).toBe('class1 class2');
    });

    it('should merge conflicting Tailwind CSS classes correctly', () => {
        // twMerge should handle conflicts like px-2 and px-4
        expect(cn('px-2 py-2', 'px-4')).toBe('py-2 px-4');

        // It should also handle background colors
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });

    it('should handle mixed inputs correctly', () => {
        expect(cn('base-class', ['arr-1', 'arr-2'], { 'obj-1': true, 'obj-2': false }, 'final-class'))
            .toBe('base-class arr-1 arr-2 obj-1 final-class');
    });
});

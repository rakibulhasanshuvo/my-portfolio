import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
    it('should merge basic class names', () => {
        expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('should handle conditional classes (objects)', () => {
        expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2');
    });

    it('should handle arrays of classes', () => {
        expect(cn(['class1', 'class2'])).toBe('class1 class2');
    });

    it('should handle mixed inputs', () => {
        expect(cn('class1', ['class2'], { 'class3': true })).toBe('class1 class2 class3');
    });

    it('should handle falsy values', () => {
        expect(cn('class1', null, undefined, false, '')).toBe('class1');
    });

    it('should resolve tailwind conflicts (padding)', () => {
        expect(cn('px-2', 'px-4')).toBe('px-4');
    });

    it('should resolve tailwind conflicts (text color)', () => {
        expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('should keep non-conflicting tailwind classes', () => {
        const result = cn('px-2', 'py-2', 'px-4');
        expect(result).toContain('px-4');
        expect(result).toContain('py-2');
        expect(result).not.toContain('px-2');
    });

    it('should handle complex nesting', () => {
        expect(cn('base', ['arr1', ['arr2', { 'obj': true }]], { 'outer': true })).toBe('base arr1 arr2 obj outer');
    });
});

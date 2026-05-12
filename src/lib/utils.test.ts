import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('flex', 'items-center')).toBe('flex items-center');
  });

  it('handles conditional classes', () => {
    expect(cn('flex', true && 'items-center', false && 'justify-center')).toBe('flex items-center');
  });

  it('handles objects of classes', () => {
    expect(cn({ 'bg-red-500': true, 'text-white': false })).toBe('bg-red-500');
  });

  it('handles arrays of classes', () => {
    expect(cn(['bg-red-500', 'text-white'])).toBe('bg-red-500 text-white');
  });

  it('resolves tailwind conflicts correctly', () => {
    expect(cn('px-2 py-2', 'px-4')).toBe('py-2 px-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('handles falsy values and ignores them', () => {
    expect(cn('base', null, undefined, false, '')).toBe('base');
  });

  it('handles nested arrays and objects', () => {
    expect(cn(['a', ['b', { c: true, d: false }]])).toBe('a b c');
  });
});

import type { Direction } from '../i18n/ui';

/**
 * Rough project estimates shown live in the brief wizard.
 * Keyed by direction + index of the project-type option (same order in every locale).
 *
 * weeks       — typical duration range in weeks
 * budgetTier  — index into contact.q3.options (budget buckets) that usually fits
 *
 * EDIT THESE to match real studio pricing/timelines.
 */
export interface Estimate {
  weeks: readonly [number, number];
  budgetTier: number;
}

export const estimates: Record<Direction, readonly Estimate[]> = {
  web: [
    { weeks: [2, 3], budgetTier: 0 }, // landing
    { weeks: [4, 6], budgetTier: 1 }, // corporate site
    { weeks: [6, 10], budgetTier: 2 }, // e-commerce
    { weeks: [3, 5], budgetTier: 1 }, // redesign
  ],
  mobile: [
    { weeks: [8, 12], budgetTier: 3 }, // iOS
    { weeks: [8, 12], budgetTier: 3 }, // Android
    { weeks: [8, 14], budgetTier: 3 }, // cross-platform
    { weeks: [4, 6], budgetTier: 2 }, // MVP
  ],
  uxui: [
    { weeks: [3, 5], budgetTier: 1 }, // app UI
    { weeks: [2, 4], budgetTier: 1 }, // site UI
    { weeks: [3, 5], budgetTier: 1 }, // redesign
    { weeks: [4, 8], budgetTier: 2 }, // design system
  ],
  identity: [
    { weeks: [2, 3], budgetTier: 0 }, // logo & style
    { weeks: [3, 5], budgetTier: 1 }, // brand book
    { weeks: [2, 3], budgetTier: 0 }, // digital identity
    { weeks: [1, 3], budgetTier: 0 }, // patterns / graphics
  ],
};

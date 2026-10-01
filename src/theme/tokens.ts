/**
 * Veirdo Design System Tokens
 * Extracted and normalized from Veirdo brand specification
 */

export interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  role: 'Text Primary' | 'Text Secondary' | 'Text Light' | 'Primary Brand' | 'Secondary Brand' | 'Accent' | 'Surface' | 'Background' | 'Border';
  description: string;
}

export const COLOR_TOKENS: ColorToken[] = [
  // Primary Greens
  { name: 'primary-900', variable: '--color-primary-900', hex: '#00653D', role: 'Primary Brand', description: 'Deep evergreen brand anchor' },
  { name: 'primary-800', variable: '--color-primary-800', hex: '#008450', role: 'Primary Brand', description: 'Primary interactive button fill & focus' },
  { name: 'primary-700', variable: '--color-primary-700', hex: '#00AA68', role: 'Primary Brand', description: 'Vibrant brand badge & hover state' },
  { name: 'primary-600', variable: '--color-primary-600', hex: '#00DA85', role: 'Primary Brand', description: 'Accent highlights' },
  { name: 'primary-500', variable: '--color-primary-500', hex: '#00F092', role: 'Primary Brand', description: 'Energetic neon green indicator' },
  { name: 'primary-400', variable: '--color-primary-400', hex: '#33F3A8', role: 'Primary Brand', description: 'Light brand accent' },
  { name: 'primary-300', variable: '--color-primary-300', hex: '#54F5B6', role: 'Primary Brand', description: 'Selection tint' },
  { name: 'primary-100', variable: '--color-primary-100', hex: '#B0FADD', role: 'Surface', description: 'Soft brand surface background' },

  // Secondary Fuchsia / Purples
  { name: 'secondary-900', variable: '--color-secondary-900', hex: '#632668', role: 'Secondary Brand', description: 'Deep royal plum for high contrast' },
  { name: 'secondary-800', variable: '--color-secondary-800', hex: '#813288', role: 'Secondary Brand', description: 'Secondary button fill' },
  { name: 'secondary-700', variable: '--color-secondary-700', hex: '#A740AF', role: 'Secondary Brand', description: 'Medium fuchsia brand accent' },
  { name: 'secondary-600', variable: '--color-secondary-600', hex: '#D652E1', role: 'Secondary Brand', description: 'Streetwear graphic accent' },
  { name: 'secondary-400', variable: '--color-secondary-400', hex: '#EF7BF9', role: 'Secondary Brand', description: 'Light plum accent' },
  { name: 'secondary-100', variable: '--color-secondary-100', hex: '#F9CCFD', role: 'Surface', description: 'Subtle purple tint' },
  { name: 'secondary-50', variable: '--color-secondary-50', hex: '#FDEFFE', role: 'Surface', description: 'Pale fuchsia backdrop' },

  // Text & Neutrals
  { name: 'text-primary', variable: '--color-text-primary', hex: '#131814', role: 'Text Primary', description: 'Deepest charcoal headline & body text' },
  { name: 'zinc-700', variable: '--color-zinc-700', hex: '#3F3F46', role: 'Text Primary', description: 'Standard high-contrast body text' },
  { name: 'gray-700', variable: '--color-gray-700', hex: '#374151', role: 'Text Primary', description: 'Secondary body paragraphs' },
  { name: 'slate-700', variable: '--color-slate-700', hex: '#334155', role: 'Text Primary', description: 'Subdued navigation & card labels' },
  { name: 'neutral-500', variable: '--color-neutral-500', hex: '#51575C', role: 'Text Secondary', description: 'Subtext, captions & metadata' },
  { name: 'neutral-400', variable: '--color-neutral-400', hex: '#74797D', role: 'Text Secondary', description: 'Inactive icons & separators' },
  { name: 'neutral-100', variable: '--color-neutral-100', hex: '#C9CBCC', role: 'Border', description: 'Hairline dividers and input borders' },
  { name: 'neutral-50', variable: '--color-neutral-50', hex: '#EEEEEF', role: 'Border', description: 'Subtle container outlines' },

  // Accents & Signals
  { name: 'orange-600', variable: '--color-orange-600', hex: '#EA580C', role: 'Accent', description: 'Urgency & discount callouts' },
  { name: 'orange-700', variable: '--color-orange-700', hex: '#C2410C', role: 'Accent', description: 'Deep fire orange accent' },
  { name: 'blue-600', variable: '--color-blue-600', hex: '#2563EB', role: 'Accent', description: 'Interactive link & info callout' },
  { name: 'blue-900', variable: '--color-blue-900', hex: '#1E3A8A', role: 'Accent', description: 'Navy contrast elements' },
  { name: 'error-800', variable: '--color-error-800', hex: '#8C1F20', role: 'Accent', description: 'Destructive actions & stock alert' },
  { name: 'error-600', variable: '--color-error-600', hex: '#E83336', role: 'Accent', description: 'Validation error text' },
  { name: 'success-800', variable: '--color-success-800', hex: '#017F29', role: 'Accent', description: 'Free shipping reached & verified' },
  { name: 'success-700', variable: '--color-success-700', hex: '#01A435', role: 'Accent', description: 'Order confirmed & in-stock' },

  // Backgrounds
  { name: 'bg-canvas', variable: '--color-bg-canvas', hex: '#FFFFFF', role: 'Background', description: 'Clean primary background' },
  { name: 'bg-ice', variable: '--color-bg-ice', hex: '#F1F8FF', role: 'Background', description: 'Cool accent backdrop' },
  { name: 'bg-cream', variable: '--color-bg-cream', hex: '#F5F5DC', role: 'Background', description: 'Warm lifestyle editorial canvas' },
];

export const SPACING_TOKENS = [
  { name: 'space-1', value: '2px', rem: '0.125rem' },
  { name: 'space-2', value: '3px', rem: '0.1875rem' },
  { name: 'space-3', value: '4px', rem: '0.25rem' },
  { name: 'space-4', value: '6px', rem: '0.375rem' },
  { name: 'space-5', value: '7px', rem: '0.4375rem' },
  { name: 'space-6', value: '8px', rem: '0.5rem' },
  { name: 'space-7', value: '12px', rem: '0.75rem' },
  { name: 'space-8', value: '16px', rem: '1rem' },
  { name: 'space-9', value: '20px', rem: '1.25rem' },
  { name: 'space-10', value: '24px', rem: '1.5rem' },
  { name: 'space-11', value: '32px', rem: '2rem' },
  { name: 'space-12', value: '40px', rem: '2.5rem' },
  { name: 'space-13', value: '80px', rem: '5rem' },
];

export const RADIUS_TOKENS = [
  { name: 'radius-sm', value: '4px', usage: 'Badges, small tags' },
  { name: 'radius-md', value: '5px', usage: 'Input controls' },
  { name: 'radius-lg', value: '6px', usage: 'Action buttons' },
  { name: 'radius-xl', value: '8px', usage: 'Cards, drawers' },
  { name: 'radius-full-12', value: '12px', usage: 'Featured containers' },
  { name: 'radius-6', value: '16px', usage: 'Modals, overlays' },
  { name: 'radius-circle', value: '50%', usage: 'Avatar icons, circular toggles' },
];

export const ELEVATION_TOKENS = [
  {
    name: 'shadow-sm',
    css: 'rgb(234, 234, 233) 3px 3px 0px 0px',
    description: 'Clean streetwear hard-edge shadow for cards and buttons',
  },
  {
    name: 'shadow-md',
    css: 'rgba(132, 18, 245, 0.4) 2px 2px 0px 0px',
    description: 'Signature Veirdo purple glow-depth shadow for focal elements',
  },
];

export const DESIGN_PRINCIPLES = [
  {
    title: 'Trust signals first',
    description: 'Credibility reduces friction more than clever copy. Prominent delivery times, GSM fabric weight, and return policies.',
  },
  {
    title: 'Clear path to action',
    description: 'One primary CTA per view, never stacked. High intentionality on Add to Bag and Checkout.',
  },
  {
    title: 'Speed over polish',
    description: 'Perceived performance is part of the design system. Fast transitions (<200ms) and immediate feedback.',
  },
];

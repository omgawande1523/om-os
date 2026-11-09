// Window events used to talk between components without importing lazy chunks.

/** Opens the ⌘K command palette. */
export const OPEN_PALETTE_EVENT = 'om:open-palette';
/** Pre-fills the contact form message (detail: string). Sent by `sudo hire om`. */
export const PREFILL_CONTACT_EVENT = 'om:prefill-contact';

const loadPalette = () => import('../components/CommandPalette');
/** Lazy loader for the palette chunk; call on hover/focus to warm it. */
export { loadPalette };
export const preloadPalette = () => void loadPalette();

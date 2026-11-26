/**
 * Core types and palette definitions for the Communication Design Portfolio.
 * Strict Two-Tone Palette:
 * - Warm Off-White:   #F7F6F2 / #EFECE6 / #E5E3DC
 * - Dark Graphite:    #141416 / #1C1C1E / #26262A / #323236
 */

export type PageId = 'home' | 'branding' | 'logofolio' | 'social' | 'profile';

export type TileColor =
  | 'surface'   // Crisp Off-White #F7F6F2 (light) / Graphite #1E1E21 (dark)
  | 'lavender'  // Primary Dark Graphite #1C1C1E
  | 'mint'      // Stone Off-White #E5E3DC
  | 'yellow'    // Slate Graphite #28282C
  | 'coral'     // Charcoal Graphite #202024
  | 'charcoal'  // Deep Carbon Graphite #141416
  | 'pink';     // Alabaster Off-White #EFECE6

export type TileSize =
  | '2x3' // Home Branding tile: 2 cols × 3 rows on desktop, full-width tall on mobile
  | '2x2' // Featured tile: 2 cols × 2 rows on desktop, full-width on mobile
  | '3x1' // Extra-wide tile: 3 cols × 1 row on desktop, full-width on mobile
  | '2x1' // Wide tile: 2 cols × 1 row on desktop, full-width on mobile
  | '1x2' // Tall / Portrait tile: 1 col × 2 rows
  | '1x1'; // Standard square tile: 1 col × 1 row

export type GeometricMotif =
  | 'concentric'
  | 'bauhaus-arch'
  | 'swiss-grid'
  | 'monogram-a'
  | 'orbital'
  | 'prism'
  | 'wave-bars'
  | 'starburst'
  | 'capsule-link'
  | 'split-circle'
  | 'totem'
  | 'checker-dot';

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  caption?: string;
  span?: 'wide' | 'portrait' | 'square';
  noCrop?: boolean;
  cropSides?: boolean;
  objectPosition?: string;
}

export interface ProjectTileData {
  id: string;
  title: string;
  description: string;
  category?: string;
  year?: string;
  client?: string;
  deliverables?: string[];
  challenge?: string;
  outcome?: string;
  color: TileColor;
  size: TileSize;
  motif: GeometricMotif;
  aspectLabel?: string;
  coverImage?: string;
  gallery?: ProjectGalleryImage[];
}

export interface PaletteConfig {
  bgClass: string;
  textClass: string;
  mutedTextClass: string;
  buttonBgClass: string;
  buttonTextClass: string;
  hexLabel: string;
  accentHex: string;
}

export const TILE_PALETTE: Record<TileColor, PaletteConfig> = {
  // 1. Crisp Off-White (#F7F6F2)
  surface: {
    bgClass:
      'bg-[#f7f6f2] dark:bg-[#1e1e21] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10',
    textClass: 'text-[#1c1c1e] dark:text-[#f7f6f2]',
    mutedTextClass: 'text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65',
    buttonBgClass: 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e]',
    buttonTextClass: 'text-[#f7f6f2] dark:text-[#1c1c1e]',
    hexLabel: '#F7F6F2 · OFF-WHITE',
    accentHex: '#1c1c1e',
  },
  // 2. Primary Dark Graphite (#1C1C1E)
  lavender: {
    bgClass: 'bg-[#1c1c1e] dark:bg-[#222226] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10',
    textClass: 'text-[#f7f6f2]',
    mutedTextClass: 'text-[#f7f6f2]/70',
    buttonBgClass: 'bg-[#f7f6f2] text-[#1c1c1e]',
    buttonTextClass: 'text-[#1c1c1e]',
    hexLabel: '#1C1C1E · DARK GRAPHITE',
    accentHex: '#f7f6f2',
  },
  // 3. Stone Off-White (#E5E3DC)
  mint: {
    bgClass:
      'bg-[#e5e3dc] dark:bg-[#26262a] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10',
    textClass: 'text-[#1c1c1e] dark:text-[#f7f6f2]',
    mutedTextClass: 'text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70',
    buttonBgClass: 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e]',
    buttonTextClass: 'text-[#f7f6f2] dark:text-[#1c1c1e]',
    hexLabel: '#E5E3DC · STONE OFF-WHITE',
    accentHex: '#1c1c1e',
  },
  // 4. Slate Graphite (#28282C)
  yellow: {
    bgClass: 'bg-[#28282c] dark:bg-[#2c2c31] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10',
    textClass: 'text-[#f7f6f2]',
    mutedTextClass: 'text-[#f7f6f2]/70',
    buttonBgClass: 'bg-[#f7f6f2] text-[#1c1c1e]',
    buttonTextClass: 'text-[#1c1c1e]',
    hexLabel: '#28282C · SLATE GRAPHITE',
    accentHex: '#f7f6f2',
  },
  // 5. Charcoal Graphite (#202024)
  coral: {
    bgClass: 'bg-[#202024] dark:bg-[#242429] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10',
    textClass: 'text-[#f7f6f2]',
    mutedTextClass: 'text-[#f7f6f2]/70',
    buttonBgClass: 'bg-[#f7f6f2] text-[#1c1c1e]',
    buttonTextClass: 'text-[#1c1c1e]',
    hexLabel: '#202024 · CHARCOAL GRAPHITE',
    accentHex: '#f7f6f2',
  },
  // 6. Deep Carbon Graphite (#141416)
  charcoal: {
    bgClass:
      'bg-[#141416] dark:bg-[#18181b] border border-transparent dark:border-[#f7f6f2]/12',
    textClass: 'text-[#f7f6f2]',
    mutedTextClass: 'text-[#f7f6f2]/70',
    buttonBgClass: 'bg-[#f7f6f2] text-[#141416]',
    buttonTextClass: 'text-[#141416]',
    hexLabel: '#141416 · CARBON GRAPHITE',
    accentHex: '#f7f6f2',
  },
  // 7. Alabaster Off-White (#EFECE6)
  pink: {
    bgClass:
      'bg-[#efece6] dark:bg-[#222226] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10',
    textClass: 'text-[#1c1c1e] dark:text-[#f7f6f2]',
    mutedTextClass: 'text-[#1c1c1e]/65 dark:text-[#f7f6f2]/70',
    buttonBgClass: 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e]',
    buttonTextClass: 'text-[#f7f6f2] dark:text-[#1c1c1e]',
    hexLabel: '#EFECE6 · ALABASTER',
    accentHex: '#1c1c1e',
  },
};

export const PASTEL_CYCLE_ORDER: TileColor[] = [
  'lavender',
  'mint',
  'yellow',
  'coral',
  'pink',
  'charcoal',
  'surface',
];

export function getShiftedColor(color: TileColor, offset: number): TileColor {
  if (offset === 0) return color;
  const idx = PASTEL_CYCLE_ORDER.indexOf(color);
  if (idx === -1) return color;
  return PASTEL_CYCLE_ORDER[(idx + offset) % PASTEL_CYCLE_ORDER.length];
}

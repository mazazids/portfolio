/**
 * GeometricPlaceholder Component
 * Renders clean, vector-based geometric placeholder artwork inside bento tiles
 * using currentColor with subtle opacity layers so it adapts automatically to
 * both Off-White and Dark Graphite tiles.
 */

import React from 'react';
import { GeometricMotif } from '../types/portfolio';

interface GeometricPlaceholderProps {
  motif: GeometricMotif;
  className?: string;
  variant?: 'card' | 'logo' | 'modal';
}

export const GeometricPlaceholder: React.FC<GeometricPlaceholderProps> = ({
  motif,
  className = '',
  variant = 'card',
}) => {
  const isLogo = variant === 'logo';

  return (
    <div
      className={`relative overflow-hidden select-none flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {motif === 'concentric' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[180px] max-h-[180px]">
          <circle cx="100" cy="100" r="82" fill="currentColor" opacity="0.16" />
          <circle cx="100" cy="100" r="58" fill="currentColor" opacity="0.9" />
          <circle cx="100" cy="100" r="34" fill="currentColor" opacity="0.35" />
          <circle cx="100" cy="100" r="12" fill="currentColor" />
        </svg>
      )}

      {motif === 'bauhaus-arch' && (
        <svg viewBox="0 0 240 180" className="w-full h-full max-w-[220px] max-h-[160px]">
          <rect x="20" y="20" width="90" height="140" rx="45" fill="currentColor" opacity="0.9" />
          <circle cx="165" cy="65" r="45" fill="currentColor" opacity="0.4" />
          <rect x="120" y="120" width="90" height="40" rx="8" fill="currentColor" opacity="0.2" />
        </svg>
      )}

      {motif === 'swiss-grid' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[180px] max-h-[180px]">
          <rect x="20" y="20" width="74" height="74" rx="12" fill="currentColor" opacity="0.9" />
          <rect x="106" y="20" width="74" height="74" rx="37" fill="currentColor" opacity="0.35" />
          <rect x="20" y="106" width="74" height="74" rx="37" fill="currentColor" opacity="0.2" />
          <rect x="106" y="106" width="74" height="74" rx="12" fill="currentColor" opacity="0.65" />
        </svg>
      )}

      {motif === 'monogram-a' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[160px] max-h-[160px]">
          <path
            d="M100 26L166 168H126L100 108L74 168H34L100 26Z"
            fill="currentColor"
            opacity="0.9"
          />
          <circle cx="100" cy="144" r="18" fill="currentColor" opacity="0.35" />
        </svg>
      )}

      {motif === 'orbital' && (
        <svg viewBox="0 0 220 180" className="w-full h-full max-w-[200px] max-h-[160px]">
          <ellipse
            cx="110"
            cy="90"
            rx="88"
            ry="42"
            transform="rotate(-24 110 90)"
            fill="none"
            stroke="currentColor"
            strokeWidth="14"
            opacity="0.85"
          />
          <circle cx="110" cy="90" r="36" fill="currentColor" opacity="0.35" />
          <circle cx="158" cy="58" r="14" fill="currentColor" />
        </svg>
      )}

      {motif === 'prism' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[170px] max-h-[170px]">
          <polygon points="100,24 176,164 24,164" fill="currentColor" opacity="0.85" />
          <polygon points="100,68 146,164 54,164" fill="currentColor" opacity="0.25" />
          <circle cx="100" cy="136" r="18" fill="currentColor" />
        </svg>
      )}

      {motif === 'wave-bars' && (
        <svg viewBox="0 0 220 160" className="w-full h-full max-w-[200px] max-h-[150px]">
          <rect x="24" y="24" width="28" height="112" rx="14" fill="currentColor" opacity="0.9" />
          <rect x="66" y="44" width="28" height="92" rx="14" fill="currentColor" opacity="0.5" />
          <rect x="108" y="16" width="28" height="120" rx="14" fill="currentColor" opacity="0.25" />
          <rect x="150" y="56" width="28" height="80" rx="14" fill="currentColor" opacity="0.85" />
        </svg>
      )}

      {motif === 'starburst' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[165px] max-h-[165px]">
          <g fill="currentColor" opacity="0.8">
            <rect x="90" y="20" width="20" height="160" rx="10" />
            <rect x="20" y="90" width="160" height="20" rx="10" />
            <rect
              x="90"
              y="20"
              width="20"
              height="160"
              rx="10"
              transform="rotate(45 100 100)"
            />
            <rect
              x="90"
              y="20"
              width="20"
              height="160"
              rx="10"
              transform="rotate(-45 100 100)"
            />
          </g>
          <circle cx="100" cy="100" r="28" fill="currentColor" opacity="0.25" />
        </svg>
      )}

      {motif === 'capsule-link' && (
        <svg viewBox="0 0 220 160" className="w-full h-full max-w-[190px] max-h-[145px]">
          <rect
            x="24"
            y="42"
            width="112"
            height="76"
            rx="38"
            fill="none"
            stroke="currentColor"
            strokeWidth="16"
            opacity="0.85"
          />
          <rect
            x="84"
            y="42"
            width="112"
            height="76"
            rx="38"
            fill="currentColor"
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="16"
            opacity="0.65"
          />
        </svg>
      )}

      {motif === 'split-circle' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[170px] max-h-[170px]">
          <path d="M100 20 A80 80 0 0 0 100 180 Z" fill="currentColor" opacity="0.9" />
          <path d="M108 20 A80 80 0 0 1 108 180 Z" fill="currentColor" opacity="0.3" />
          <circle cx="76" cy="100" r="20" fill="currentColor" opacity="0.2" />
        </svg>
      )}

      {motif === 'totem' && (
        <svg viewBox="0 0 180 220" className="w-full h-full max-w-[155px] max-h-[195px]">
          <circle cx="90" cy="50" r="32" fill="currentColor" opacity="0.3" />
          <polygon points="90,86 142,146 38,146" fill="currentColor" opacity="0.9" />
          <rect x="42" y="154" width="96" height="42" rx="21" fill="currentColor" opacity="0.45" />
        </svg>
      )}

      {motif === 'checker-dot' && (
        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[165px] max-h-[165px]">
          <circle cx="55" cy="55" r="26" fill="currentColor" opacity="0.9" />
          <circle cx="145" cy="55" r="26" fill="currentColor" opacity="0.35" />
          <circle cx="100" cy="100" r="26" fill="currentColor" opacity="0.2" />
          <circle cx="55" cy="145" r="26" fill="currentColor" opacity="0.55" />
          <circle cx="145" cy="145" r="26" fill="currentColor" opacity="0.9" />
        </svg>
      )}

      {/* Subtle corner crop marks when used in logo mode */}
      {isLogo && (
        <div className="pointer-events-none absolute inset-3 border border-dashed border-current opacity-20 rounded-lg" />
      )}
    </div>
  );
};

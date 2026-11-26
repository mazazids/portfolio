/**
 * Tile Component
 * Reusable bento tile supporting two-tone Off-White and Dark Graphite surfaces,
 * responsive grid spans, full-bleed cover thumbnails, circular arrow button,
 * and optional Grid Specs X-Ray.
 */

import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  GeometricMotif,
  TILE_PALETTE,
  TileColor,
  TileSize,
  getShiftedColor,
} from '../types/portfolio';
import { GeometricPlaceholder } from './GeometricPlaceholder';

interface TileProps {
  title: string;
  description?: string;
  kicker?: string;
  color: TileColor;
  size: TileSize;
  motif?: GeometricMotif;
  coverImage?: string;
  cyclingImages?: { src: string; label?: string }[];
  cyclingLogos?: { darkSrc: string; lightSrc: string; label?: string }[];
  galleryCount?: number;
  onClick?: () => void;
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  showArrow?: boolean;
  titlePosition?: 'bottom' | 'top';
  variant?: 'default' | 'logo' | 'social' | 'static';
  aspectLabel?: string;
  /** Optional object-position class for coverImage (defaults to 'object-center' so centered client logos are showcased) */
  coverObjectPosition?: string;
  /** Enables a semi-dark overlay at rest with a cursor-tracked flashlight cutout & rim glow on hover */
  enableSpotlightOverlay?: boolean;
  /** Passed from the Signature Gimmick state */
  showGridSpecs?: boolean;
  paletteOffset?: number;
}

/**
 * Maps TileSize to mobile (2-col) and desktop (4-col) Tailwind grid classes.
 * Mobile adapts to a vertical 2-column grid where featured/wide tiles span full width (col-span-2).
 */
export function getTileSpanClasses(size: TileSize): string {
  switch (size) {
    case '2x3':
      return 'col-span-2 min-h-[340px] md:col-span-2 md:row-span-3 md:min-h-[480px]';
    case '2x2':
      return 'col-span-2 min-h-[260px] md:col-span-2 md:row-span-2 md:min-h-[320px]';
    case '3x1':
      return 'col-span-2 min-h-[190px] md:col-span-3 md:row-span-1 md:min-h-[200px]';
    case '2x1':
      return 'col-span-2 min-h-[190px] md:col-span-2 md:row-span-1 md:min-h-[200px]';
    case '1x2':
      return 'col-span-1 min-h-[280px] md:col-span-1 md:row-span-2 md:min-h-[340px]';
    case '1x1':
    default:
      return 'col-span-1 min-h-[175px] md:col-span-1 md:row-span-1 md:min-h-[185px]';
  }
}

export const Tile: React.FC<TileProps> = ({
  title,
  description,
  kicker,
  color,
  size,
  motif,
  coverImage,
  cyclingImages,
  cyclingLogos,
  onClick,
  ariaLabel,
  children,
  className = '',
  showArrow = true,
  titlePosition = 'bottom',
  variant = 'default',
  aspectLabel,
  coverObjectPosition = 'object-center',
  enableSpotlightOverlay = false,
  showGridSpecs = false,
  paletteOffset = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSpotlightHovered, setIsSpotlightHovered] = useState(false);
  const tileRef = useRef<HTMLElement | null>(null);

  const totalCyclingCount =
    cyclingImages && cyclingImages.length > 0
      ? cyclingImages.length
      : cyclingLogos && cyclingLogos.length > 0
      ? cyclingLogos.length
      : 0;

  useEffect(() => {
    if (totalCyclingCount <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCyclingCount);
    }, 2600);
    return () => clearInterval(interval);
  }, [totalCyclingCount]);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!enableSpotlightOverlay || !tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    tileRef.current.style.setProperty('--spot-x', `${x}px`);
    tileRef.current.style.setProperty('--spot-y', `${y}px`);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
    if (!enableSpotlightOverlay) return;
    setIsSpotlightHovered(true);
    handlePointerMove(e);
  };

  const handlePointerLeave = () => {
    if (!enableSpotlightOverlay) return;
    setIsSpotlightHovered(false);
  };

  const effectiveColor = getShiftedColor(color, paletteOffset);
  const palette = TILE_PALETTE[effectiveColor];
  const spanClasses = getTileSpanClasses(size);
  const isInteractive = Boolean(onClick);

  const hasCycling = Boolean(cyclingImages && cyclingImages.length > 0 && !children);
  const hasLogoCycling = Boolean(cyclingLogos && cyclingLogos.length > 0 && !children);
  const hasCover = Boolean((coverImage || hasCycling) && !children);
  const hasDarkVeil = Boolean(hasCover || enableSpotlightOverlay);

  // Full-bleed thumbnail tiles omit dark outer borders and dark base fills so no black stroke frames the thumbnail
  const surfaceClasses = hasCover
    ? 'bg-transparent border-0'
    : palette.bgClass;

  const baseClasses = `
    group relative rounded-xl p-5 md:p-6 flex flex-col justify-between overflow-hidden
    transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
    ${surfaceClasses} ${palette.textClass} ${spanClasses}
    ${
      isInteractive
        ? 'cursor-pointer text-left hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.22)] dark:hover:shadow-[0_16px_34px_-12px_rgba(0,0,0,0.65)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]'
        : ''
    }
    ${className}
  `;

  const spotlightRadius =
    size === '2x3' ? '260px' : size === '2x2' ? '230px' : '180px';

  const renderSpotlightOverlay = () => {
    if (!enableSpotlightOverlay) {
      return (
        <div
          className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_50%,rgba(20,20,22,0.58)_76%,rgba(20,20,22,0.92)_100%)]"
          aria-hidden="true"
        />
      );
    }

    return (
      <>
        {/* Semi-dark overlay at rest -> Flashlight cutout window around cursor on hover */}
        <div
          aria-hidden="true"
          style={{
            background: isSpotlightHovered
              ? `radial-gradient(${spotlightRadius} circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(14, 14, 16, 0.04) 0%, rgba(14, 14, 16, 0.22) 38%, rgba(14, 14, 16, 0.72) 76%, rgba(14, 14, 16, 0.84) 100%)`
              : 'linear-gradient(to bottom, rgba(16, 16, 18, 0.62) 0%, rgba(16, 16, 18, 0.68) 55%, rgba(14, 14, 16, 0.88) 100%)',
          }}
          className="pointer-events-none absolute inset-0 z-[4] transition-opacity duration-300"
        />

        {/* Soft luminous rim glow around the cursor that shines through the dark overlay */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(${spotlightRadius} circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255, 251, 242, 0.24) 0%, rgba(255, 248, 235, 0.10) 42%, transparent 72%)`,
          }}
          className={`pointer-events-none absolute inset-0 z-[5] mix-blend-screen transition-opacity duration-300 ${
            isSpotlightHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle bottom text-protection gradient so titles always remain crisp */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 z-[5] bg-[linear-gradient(to_bottom,transparent_0%,rgba(14,14,16,0.72)_100%)]"
        />
      </>
    );
  };

  const content = (
    <>
      {/* Full-bleed cycling thumbnails with smooth crossfade and center-cropped scale motion */}
      {hasCycling && cyclingImages ? (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl">
          {cyclingImages.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <img
                key={item.src}
                src={item.src}
                alt={item.label || title}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out group-hover:scale-[1.06] ${
                  isActive ? 'opacity-100 scale-[1.02]' : 'opacity-0 scale-[1.05]'
                }`}
              />
            );
          })}
          {renderSpotlightOverlay()}
          {/* Subtle cycling progress indicator & active project name */}
          <div className="absolute top-5 right-10 z-10 flex items-center gap-2">
            {cyclingImages[activeIndex]?.label && (
              <span className="text-[11px] font-semibold tracking-tight text-[#f7f6f2] drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]">
                {cyclingImages[activeIndex].label}
              </span>
            )}
            <div className="flex items-center gap-1" aria-hidden="true">
              {cyclingImages.map((item, idx) => (
                <span
                  key={item.src}
                  className={`h-1 rounded-full transition-all duration-500 shadow-xs ${
                    idx === activeIndex ? 'w-4 bg-[#f7f6f2]' : 'w-1.5 bg-[#f7f6f2]/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : hasLogoCycling && cyclingLogos ? (
        /* Theme-aware centered colored logo cycling: darkLogo in light UI, lightLogo in dark UI */
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl flex items-center justify-center p-8 sm:p-12 pb-16 sm:pb-20">
          <div className="relative z-[1] w-full h-full max-w-[260px] max-h-[150px] flex items-center justify-center">
            {cyclingLogos.map((logo, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={`${logo.darkSrc}-${idx}`}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'opacity-100 scale-100 translate-y-0'
                      : 'opacity-0 scale-90 translate-y-2'
                  }`}
                >
                  {/* Light UI -> dark colored logo */}
                  <img
                    src={logo.darkSrc}
                    alt={logo.label || title}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="block dark:hidden w-[82%] h-[78%] max-w-[220px] max-h-[125px] object-contain select-none transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Dark UI -> light colored logo */}
                  <img
                    src={logo.lightSrc}
                    alt={logo.label || title}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                    className="hidden dark:block w-[82%] h-[78%] max-w-[220px] max-h-[125px] object-contain select-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              );
            })}
          </div>
          {enableSpotlightOverlay && renderSpotlightOverlay()}
          {/* Subtle top-right active client label & counter */}
          <div className="absolute top-5 right-10 z-10 flex items-center gap-2">
            {cyclingLogos[activeIndex]?.label && (
              <span
                className={`text-[11px] font-semibold tracking-tight ${
                  hasDarkVeil
                    ? 'text-[#f7f6f2] drop-shadow-[0_1px_4px_rgba(0,0,0,0.55)]'
                    : palette.mutedTextClass
                }`}
              >
                {cyclingLogos[activeIndex].label}
              </span>
            )}
            <span
              className={`text-[10px] font-mono font-bold tabular-nums ${
                hasDarkVeil ? 'text-[#f7f6f2]/80' : `opacity-55 ${palette.textClass}`
              }`}
            >
              {String(activeIndex + 1).padStart(2, '0')}/{String(cyclingLogos.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      ) : hasCover && coverImage ? (
        /* Full-bleed cropped thumbnail covering the whole card */
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl">
          <img
            src={coverImage}
            alt={title}
            loading="lazy"
            className={`w-full h-full object-cover ${coverObjectPosition} scale-[1.02] transition-transform duration-500 ease-out group-hover:scale-[1.06]`}
          />
          {renderSpotlightOverlay()}
        </div>
      ) : null}

      {/* Optional Signature Gimmick: Grid Specs & Hex Code Overlay */}
      {showGridSpecs && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-xl border-2 border-dashed border-current/35 p-2.5 flex items-start justify-end"
          aria-hidden="true"
        >
          <span className="font-mono text-[11px] font-semibold tracking-tight px-2 py-0.5 rounded bg-[#141416]/90 text-[#f7f6f2] backdrop-blur-xs">
            {size.toUpperCase()} · {palette.hexLabel}
          </span>
        </div>
      )}

      {/* Subtle corner bracket accent inspired by the bento reference */}
      {!showGridSpecs && (
        <span
          className={`pointer-events-none absolute top-4 right-4 z-10 w-2.5 h-2.5 border-t-[1.75px] border-r-[1.75px] opacity-45 group-hover:opacity-80 transition-opacity ${
            hasDarkVeil
              ? 'border-[#f7f6f2] drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]'
              : 'border-current'
          }`}
          aria-hidden="true"
        />
      )}

      {/* Top metadata / kicker row (and title when titlePosition === 'top') */}
      {(Boolean(kicker) || Boolean(aspectLabel) || (titlePosition === 'top' && Boolean(title))) && (
        <div className="relative z-10 flex flex-col gap-1">
          {(kicker || aspectLabel) && (
            <div className="flex items-center justify-between gap-2">
              {kicker ? (
                <span
                  className={`text-xs font-semibold tracking-tight ${
                    hasDarkVeil
                      ? 'text-[#f7f6f2] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]'
                      : palette.mutedTextClass
                  }`}
                >
                  {kicker}
                </span>
              ) : aspectLabel ? (
                <span
                  className={`text-xs font-medium tabular-nums ${
                    hasDarkVeil
                      ? 'text-[#f7f6f2] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]'
                      : palette.mutedTextClass
                  }`}
                >
                  {aspectLabel}
                </span>
              ) : null}
            </div>
          )}

          {titlePosition === 'top' && Boolean(title) && (
            <h2
              className={`font-bold tracking-[-0.03em] leading-[1.15] text-balance ${
                hasDarkVeil ? 'text-[#f7f6f2] drop-shadow-xs' : ''
              } ${
                size === '2x3'
                  ? 'text-2xl md:text-4xl'
                  : size === '2x2'
                  ? 'text-xl md:text-2xl'
                  : size === '3x1' || size === '2x1'
                  ? 'text-lg md:text-xl'
                  : 'text-base md:text-lg'
              }`}
            >
              {title}
            </h2>
          )}
        </div>
      )}

      {/* Custom children OR Geometric Placeholder visual (when no coverImage or logo cycling) */}
      {children ? (
        <div
          className={`relative z-10 ${
            titlePosition === 'top'
              ? 'mt-3 flex-1'
              : !title
              ? 'flex-1 w-full h-full flex flex-col'
              : 'my-auto py-2'
          }`}
        >
          {children}
        </div>
      ) : !hasCover && !hasLogoCycling && motif ? (
        <div className="relative z-10 my-auto py-3 flex items-center justify-center">
          <GeometricPlaceholder
            motif={motif}
            variant={variant === 'logo' ? 'logo' : 'card'}
            className={
              size === '2x3'
                ? 'w-44 h-44 md:w-56 md:h-56'
                : size === '2x2'
                ? 'w-32 h-32 md:w-44 md:h-44'
                : size === '1x2'
                ? 'w-28 h-36 md:w-36 md:h-44'
                : 'w-20 h-20 md:w-24 md:h-24'
            }
          />
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Bottom row: Title (when bottom-positioned), description, and circular arrow button */}
      {((titlePosition !== 'top' && Boolean(title)) ||
        Boolean(description) ||
        (showArrow && isInteractive)) && (
        <div className="relative z-10 flex items-end justify-between gap-3 mt-auto pt-2">
          <div className="min-w-0 flex-1">
            {titlePosition !== 'top' && Boolean(title) && (
              <h2
                className={`font-bold tracking-[-0.03em] leading-[1.15] text-balance ${
                  hasDarkVeil ? 'text-[#f7f6f2] drop-shadow-xs' : ''
                } ${
                  size === '2x3'
                    ? 'text-2xl md:text-4xl'
                    : size === '2x2'
                    ? 'text-xl md:text-2xl'
                    : size === '3x1' || size === '2x1'
                    ? 'text-lg md:text-xl'
                    : 'text-base md:text-lg'
                }`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`mt-1 text-xs md:text-sm leading-snug tracking-[-0.02em] text-balance line-clamp-2 ${
                  hasDarkVeil ? 'text-[#f7f6f2]/90 drop-shadow-xs' : palette.mutedTextClass
                }`}
              >
                {description}
              </p>
            )}
          </div>

          {showArrow && isInteractive && (
            <span
              className={`shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
                hasDarkVeil ? 'bg-[#f7f6f2] text-[#1c1c1e]' : palette.buttonBgClass
              }`}
              aria-hidden="true"
            >
              <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
        </div>
      )}
    </>
  );

  if (isInteractive) {
    return (
      <button
        ref={(el) => {
          tileRef.current = el;
        }}
        type="button"
        onClick={onClick}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-label={ariaLabel || `${title}${description ? ` — ${description}` : ''}`}
        className={baseClasses}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      ref={(el) => {
        tileRef.current = el;
      }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={baseClasses}
    >
      {content}
    </div>
  );
};


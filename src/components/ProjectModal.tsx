/**
 * ProjectModal Component
 * Full-screen project detail view opened when clicking any project tile on inner pages.
 * Styled in two-tone Off-White (#F7F6F2) and Dark Graphite (#1C1C1E).
 * Features two gallery modes:
 * 1. "Bento Pairs": A tight-padding connected 12-column bento mosaic. Images marked with `noCrop` (NC)
 *    are never cropped and preserve their natural aspect ratio, while non-NC images freely crop
 *    (`object-cover`) to fill their paired bento cell.
 * 2. "Card Details": The 2-column detailed card view where each board is shown with
 *    its individual description bar below.
 */

import React, { useEffect, useState } from 'react';
import { LayoutGrid, LayoutList, X } from 'lucide-react';
import { ProjectGalleryImage, ProjectTileData, TILE_PALETTE } from '../types/portfolio';
import { GeometricPlaceholder } from './GeometricPlaceholder';

interface ProjectModalProps {
  project: ProjectTileData | null;
  onClose: () => void;
}

interface BentoCellLayout {
  colSpanClass: string;
  heightClass: string;
}

/**
 * Computes 12-column bento span classes and height rules across 5, 6, 8, and 9-image case studies.
 * Whenever a row contains a `noCrop` (NC) image, the NC cell uses natural height (`h-auto`) so its
 * exact aspect ratio is preserved without cropping or letterboxing, while its row partner stretches
 * (`h-full`) and crops (`object-cover`) to match the row cleanly.
 */
function getDynamicBentoLayout(
  slides: ProjectGalleryImage[],
  index: number
): BentoCellLayout {
  const total = slides.length;

  // 8-board case study (OXA & Just So):
  // Row 1: [0 (7 cols)] + [1 (5 cols)]
  // Row 2: [2 (5 cols)] + [3 (7 cols)]
  // Row 3: [4 (6 cols)] + [5 (6 cols — full size 6th image)]
  // Row 4: [6 (4 cols — reduced left image)] + [7 (8 cols — full-size three-screen image)]
  if (total === 8) {
    const colSpans = [
      'col-span-12 sm:col-span-7',
      'col-span-12 sm:col-span-5',
      'col-span-12 sm:col-span-5',
      'col-span-12 sm:col-span-7',
      'col-span-12 sm:col-span-6',
      'col-span-12 sm:col-span-6',
      'col-span-12 sm:col-span-4',
      'col-span-12 sm:col-span-8',
    ];
    const rowPartnerIndex = index % 2 === 0 ? index + 1 : index - 1;
    const rowHasNoCrop = Boolean(slides[index]?.noCrop || slides[rowPartnerIndex]?.noCrop);

    return {
      colSpanClass: colSpans[index],
      heightClass: rowHasNoCrop ? 'sm:h-full' : 'h-[230px] sm:h-[330px] md:h-[360px]',
    };
  }

  // 9-board case study (Great Bukittinggi):
  // Row 1: [01 wide (12 cols)]
  // Row 2: [02 NC wide (6 cols)] + [03 NC wide (6 cols)]
  // Row 3: [04 (5 cols)] + [05 (7 cols)]
  // Row 4: [06 wide (8 cols — full size 6th image)] + [07 (4 cols)]
  // Row 5: [08 (5 cols)] + [09 (7 cols)]
  if (total === 9) {
    if (index === 0) {
      return {
        colSpanClass: 'col-span-12',
        heightClass: slides[0]?.noCrop ? 'h-auto' : 'h-[230px] sm:h-[360px] md:h-[400px]',
      };
    }
    const colSpans: Record<number, string> = {
      1: 'col-span-12 sm:col-span-6',
      2: 'col-span-12 sm:col-span-6',
      3: 'col-span-12 sm:col-span-5',
      4: 'col-span-12 sm:col-span-7',
      5: 'col-span-12 sm:col-span-8',
      6: 'col-span-12 sm:col-span-4',
      7: 'col-span-12 sm:col-span-5',
      8: 'col-span-12 sm:col-span-7',
    };
    const rowPartnerIndex = index % 2 === 1 ? index + 1 : index - 1;
    const rowHasNoCrop = Boolean(slides[index]?.noCrop || slides[rowPartnerIndex]?.noCrop);

    return {
      colSpanClass: colSpans[index] || 'col-span-12 sm:col-span-6',
      heightClass: rowHasNoCrop ? 'sm:h-full' : 'h-[230px] sm:h-[320px] md:h-[350px]',
    };
  }

  // 6-board case study (Steppo & Stacy):
  // Row 1: [01 wide (7 cols)] + [02 portrait (5 cols)]
  // Row 2: [03 portrait (5 cols)] + [04 portrait (7 cols)]
  // Row 3: [05 portrait (4 cols)] + [06 wide (8 cols — full size 6th image)]
  if (total === 6) {
    const colSpans = [
      'col-span-12 sm:col-span-7',
      'col-span-12 sm:col-span-5',
      'col-span-12 sm:col-span-5',
      'col-span-12 sm:col-span-7',
      'col-span-12 sm:col-span-4',
      'col-span-12 sm:col-span-8',
    ];
    const rowPartnerIndex = index % 2 === 0 ? index + 1 : index - 1;
    const rowHasCropSides = Boolean(
      slides[index]?.cropSides || slides[rowPartnerIndex]?.cropSides
    );
    const rowHasNoCrop = Boolean(slides[index]?.noCrop || slides[rowPartnerIndex]?.noCrop);

    return {
      colSpanClass: colSpans[index],
      heightClass: rowHasCropSides
        ? 'aspect-[3/4] sm:aspect-auto sm:h-[470px] md:h-[520px]'
        : rowHasNoCrop
        ? 'sm:h-full'
        : 'h-[230px] sm:h-[330px] md:h-[360px]',
    };
  }

  // 5-board case study (BrainSprout Academy, Trivate, Xeno & Lovia):
  // Row 1: [01 wide (7 cols)] + [02 portrait/NC (5 cols)]
  // Row 2: [03 portrait (4 cols) + 04 wide NC (8 cols)] OR [03 portrait (6 cols) + 04 portrait/NC (6 cols)]
  // Row 3: [05 wide/portrait (12 cols)]
  if (total === 5) {
    if (index === 0 || index === 1) {
      const rowHasNoCrop = Boolean(slides[0]?.noCrop || slides[1]?.noCrop);
      return {
        colSpanClass: index === 0 ? 'col-span-12 sm:col-span-7' : 'col-span-12 sm:col-span-5',
        heightClass: rowHasNoCrop ? 'sm:h-full' : 'h-[230px] sm:h-[360px] md:h-[400px]',
      };
    }
    if (index === 2 || index === 3) {
      const rowHasNoCrop = Boolean(slides[2]?.noCrop || slides[3]?.noCrop);
      const fourthIsWide = slides[3]?.span === 'wide';
      return {
        colSpanClass: fourthIsWide
          ? index === 2
            ? 'col-span-12 sm:col-span-4'
            : 'col-span-12 sm:col-span-8'
          : 'col-span-12 sm:col-span-6',
        heightClass: rowHasNoCrop ? 'sm:h-full' : 'h-[240px] sm:h-[350px]',
      };
    }
    return {
      colSpanClass: 'col-span-12',
      heightClass:
        slides[4]?.noCrop || slides[4]?.span === 'wide'
          ? 'h-auto'
          : 'h-[360px] sm:h-[520px] md:h-[600px]',
    };
  }

  // Default fallback
  const slide = slides[index];
  return {
    colSpanClass: slide?.span === 'wide' ? 'col-span-12 sm:col-span-8' : 'col-span-12 sm:col-span-4',
    heightClass: slide?.noCrop ? 'h-auto' : 'h-[220px] sm:h-[320px]',
  };
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [layoutMode, setLayoutMode] = useState<'bento' | 'cards'>('bento');

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const palette = TILE_PALETTE[project.color];
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
  const slides = project.gallery || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111113]/80 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#eceae4] dark:bg-[#161618] text-[#1c1c1e] dark:text-[#f7f6f2] p-4 sm:p-7 shadow-2xl border border-[#1c1c1e]/15 dark:border-[#f7f6f2]/15"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar with metadata and 44px Close Button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70">
              <span>{project.category || 'Selected Work'}</span>
              <span aria-hidden="true">·</span>
              <span>{project.year || '2026'}</span>
              {project.client && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Client: {project.client}</span>
                </>
              )}
              {hasGallery && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Case Study Gallery</span>
                </>
              )}
            </div>
            <h2
              id="modal-project-title"
              className="mt-1.5 text-2xl sm:text-4xl font-extrabold tracking-[-0.03em] text-balance"
            >
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project detail view"
            className="min-w-[44px] min-h-[44px] rounded-full bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e] flex items-center justify-center shrink-0 hover:scale-105 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Placeholder Hero Visual ONLY when project has no real gallery */}
        {!hasGallery && (
          <div
            className={`mt-5 rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center min-h-[260px] sm:min-h-[320px] ${palette.bgClass} ${palette.textClass}`}
          >
            <GeometricPlaceholder motif={project.motif} className="w-48 h-48 sm:w-64 sm:h-64" />
            <p className={`mt-4 text-xs font-medium ${palette.mutedTextClass}`}>
              Placeholder Hero Image · Replace with high-resolution case study key visual
            </p>
          </div>
        )}

        {/* Project Overview (Headline & Details) */}
        <div className="mt-4 rounded-xl p-5 sm:p-6 bg-[#f7f6f2] dark:bg-[#1e1e21] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10">
          <h3 className="text-xs font-bold text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70">
            Project Overview
          </h3>
          <p className="mt-1.5 text-base sm:text-lg font-bold tracking-[-0.02em] leading-snug text-[#1c1c1e] dark:text-[#f7f6f2]">
            {project.description}
          </p>
          {project.challenge && (
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-[#1c1c1e]/80 dark:text-[#f7f6f2]/80">
              {project.challenge}
            </p>
          )}
        </div>

        {/* Real Case Study Gallery OR Secondary Placeholder Grid */}
        {hasGallery ? (
          <div className="mt-5">
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <span className="text-xs font-bold tracking-tight text-[#1c1c1e]/75 dark:text-[#f7f6f2]/75">
                Visual Presentation
              </span>

              {/* Toggle between Dynamic Connected Bento Pairs and Card Details (with descriptions) */}
              <div className="inline-flex items-center rounded-lg p-1 bg-[#f7f6f2] dark:bg-[#1e1e21] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12">
                <button
                  type="button"
                  onClick={() => setLayoutMode('bento')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    layoutMode === 'bento'
                      ? 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e]'
                      : 'text-[#1c1c1e]/75 dark:text-[#f7f6f2]/75'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Bento Pairs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('cards')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    layoutMode === 'cards'
                      ? 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e]'
                      : 'text-[#1c1c1e]/75 dark:text-[#f7f6f2]/75'
                  }`}
                >
                  <LayoutList className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Card Details</span>
                </button>
              </div>
            </div>

            {layoutMode === 'bento' ? (
              /* Dynamic Connected 12-Column Bento Layout: NC images preserve aspect ratio without cropping; others crop to fit */
              <div className="grid grid-cols-12 gap-1.5 sm:gap-2 items-stretch">
                {slides.map((slide, idx) => {
                  const { colSpanClass, heightClass } = getDynamicBentoLayout(slides, idx);
                  const isNoCrop = Boolean(slide.noCrop);
                  const positionClass = slide.objectPosition
                    ? slide.objectPosition.startsWith('object-')
                      ? slide.objectPosition
                      : `object-${slide.objectPosition}`
                    : idx === 6
                    ? 'object-top'
                    : 'object-center';

                  return (
                    <figure
                      key={slide.src}
                      className={`group relative rounded-lg overflow-hidden ${colSpanClass} ${
                        isNoCrop ? 'h-auto flex items-center justify-center' : heightClass
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        loading="lazy"
                        className={
                          isNoCrop
                            ? 'w-full h-auto block object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]'
                            : `w-full h-full object-cover ${positionClass} transition-transform duration-500 ease-out group-hover:scale-[1.03]`
                        }
                      />
                      {slide.caption && (
                        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-[#141416]/90 via-[#141416]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="text-[11px] font-medium text-[#f7f6f2] drop-shadow-xs">
                            {slide.caption}
                          </span>
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            ) : (
              /* Card Details Layout: 2-column grid showing each individual card with its description */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {slides.map((slide) => {
                  const isWide = slide.span === 'wide';

                  return (
                    <figure
                      key={slide.src}
                      className={`rounded-xl overflow-hidden bg-[#f7f6f2] dark:bg-[#1e1e21] border border-[#1c1c1e]/15 dark:border-[#f7f6f2]/15 flex flex-col justify-between shadow-md ${
                        isWide ? 'sm:col-span-2' : 'sm:col-span-1'
                      }`}
                    >
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        loading="lazy"
                        className="w-full h-auto block object-contain"
                      />
                      {slide.caption && (
                        <figcaption className="px-4 py-2.5 text-xs font-medium text-[#f7f6f2]/85 bg-[#1c1c1e]">
                          <span>{slide.caption}</span>
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="rounded-xl p-6 min-h-[200px] bg-[#f7f6f2] dark:bg-[#1e1e21] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10 flex flex-col justify-between">
              <span className="text-xs font-semibold text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70">
                Construction & Grid Spec Placeholder
              </span>
              <div className="my-4 flex items-center justify-center">
                <GeometricPlaceholder motif="swiss-grid" className="w-28 h-28" />
              </div>
              <span className="text-xs text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65">
                Swap with typography scale or logo grid diagram
              </span>
            </div>

            <div className="rounded-xl p-6 min-h-[200px] bg-[#1c1c1e] dark:bg-[#242428] text-[#f7f6f2] flex flex-col justify-between">
              <span className="text-xs font-semibold opacity-80">
                Real-World Application Placeholder
              </span>
              <div className="my-4 flex items-center justify-center">
                <GeometricPlaceholder motif="bauhaus-arch" className="w-32 h-28" />
              </div>
              <span className="text-xs opacity-75">
                Swap with packaging, signage, or social feed mockup
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

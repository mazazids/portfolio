/**
 * BentoGrid Component
 * Responsive bento grid wrapper:
 * - Mobile: 2-column vertical layout with 12px (gap-3) spacing
 * - Desktop: 4-column bento grid with 12px (gap-3) spacing
 */

import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-2.5 auto-rows-auto ${className}`}
    >
      {children}
    </div>
  );
};

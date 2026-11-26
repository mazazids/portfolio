/**
 * Header Component
 * Desktop: Clean single-row bar with small name/logo on the left and unified pill container (menu + dark mode button) on the right.
 * Mobile: Name + pill toggle on top, horizontally scrollable pill bar below with >= 44px touch targets.
 * Styled in two-tone Off-White (#F7F6F2) and Dark Graphite (#1C1C1E).
 */

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { PageId } from '../types/portfolio';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Overview' },
  { id: 'branding', label: 'Branding' },
  { id: 'logofolio', label: 'Logofolio' },
  { id: 'social', label: 'Ad Creatives' },
  { id: 'profile', label: 'Profile' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="w-full pt-4 pb-2 md:py-5">
      <div className="flex items-center justify-between gap-6">
        {/* Zone 1: Maza Sunardi logo + wordmark on the left */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="group inline-flex items-center gap-3 min-h-[44px] px-1 text-base font-extrabold tracking-[-0.03em] text-[#1c1c1e] dark:text-[#f7f6f2] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2] rounded-lg"
          aria-label="Maza Sunardi — Return to Home"
        >
          {/* Light Mode UI -> Black Maza Sunardi Logo */}
          <img
            src="/assets/aistudio/Maza_Sunardi_Logo_-_Black_5a49e2b6.png"
            alt="Maza Sunardi Logo"
            className="block dark:hidden h-5 w-auto object-contain select-none transition-transform duration-200 group-hover:scale-105"
            draggable={false}
          />
          {/* Dark Mode UI -> White Maza Sunardi Logo */}
          <img
            src="/assets/aistudio/Maza_Sunardi_Logo_-_White_27b679b0.png"
            alt="Maza Sunardi Logo"
            className="hidden dark:block h-5 w-auto object-contain select-none transition-transform duration-200 group-hover:scale-105"
            draggable={false}
          />
          <span>Maza Sunardi</span>
        </button>

        {/* Zone 2: Unified Pill Container with Navigation Menu & Dark Mode Button */}
        <div className="flex items-center gap-1 p-1.5 rounded-full bg-[#f7f6f2] dark:bg-[#1e1e21] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12 shrink-0">
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-1"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`min-h-[38px] px-4 rounded-full text-sm font-semibold tracking-tight whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2] ${
                    isActive
                      ? 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e]'
                      : 'text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70 hover:text-[#1c1c1e] dark:hover:text-[#f7f6f2] hover:bg-[#1c1c1e]/8 dark:hover:bg-[#f7f6f2]/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <span
            className="hidden md:block w-px h-5 bg-[#1c1c1e]/15 dark:bg-[#f7f6f2]/15 mx-1"
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="min-h-[38px] min-w-[38px] px-3.5 rounded-full text-[#1c1c1e] dark:text-[#f7f6f2] inline-flex items-center justify-center gap-2 text-xs font-semibold hover:bg-[#1c1c1e]/8 dark:hover:bg-[#f7f6f2]/10 transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-[#f7f6f2]" aria-hidden="true" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#1c1c1e]" aria-hidden="true" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation: Horizontally scrollable pill bar with >= 44px touch targets */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden mt-3 -mx-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`min-h-[44px] px-4 rounded-full text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2] ${
                isActive
                  ? 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e]'
                  : 'bg-[#f7f6f2] dark:bg-[#1e1e21] text-[#1c1c1e] dark:text-[#f7f6f2] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

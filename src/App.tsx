/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { PageId, ProjectTileData } from './types/portfolio';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { HomePage } from './pages/HomePage';
import { BrandingPage } from './pages/BrandingPage';
import { LogofolioPage } from './pages/LogofolioPage';
import { SocialAdsPage } from './pages/SocialAdsPage';
import { ProfilePage } from './pages/ProfilePage';

const VALID_PAGES: PageId[] = ['home', 'branding', 'logofolio', 'social', 'profile'];

function getPageFromHash(): PageId {
  const raw = window.location.hash.replace('#', '').toLowerCase() as PageId;
  return VALID_PAGES.includes(raw) ? raw : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() => getPageFromHash());
  const [isDark, setIsDark] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectTileData | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Sync dark mode class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Listen to browser back/forward navigation via hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const next = getPageFromHash();
      setCurrentPage(next);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (nextPage: PageId) => {
    if (nextPage === currentPage) return;
    setIsTransitioning(true);
    window.location.hash = nextPage === 'home' ? '' : nextPage;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      setCurrentPage(nextPage);
      setIsTransitioning(false);
    }, 110);
  };

  return (
    <div className="min-h-screen bg-[#eceae4] dark:bg-[#111113] text-[#1c1c1e] dark:text-[#f7f6f2] transition-colors duration-200">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen justify-between">
        {/* Top Navigation Header */}
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
        />

        {/* Main Page View with Smooth Opacity/Transform Transition */}
        <main
          className={`flex-1 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isTransitioning ? 'opacity-0 translate-y-1.5' : 'opacity-100'
          }`}
        >
          {currentPage === 'home' && (
            <HomePage onNavigate={handleNavigate} />
          )}

          {currentPage === 'branding' && (
            <BrandingPage
              onNavigate={handleNavigate}
              onSelectProject={setSelectedProject}
            />
          )}

          {currentPage === 'logofolio' && (
            <LogofolioPage
              onNavigate={handleNavigate}
              onSelectProject={setSelectedProject}
            />
          )}

          {currentPage === 'social' && (
            <SocialAdsPage
              onNavigate={handleNavigate}
              onSelectProject={setSelectedProject}
            />
          )}

          {currentPage === 'profile' && (
            <ProfilePage onNavigate={handleNavigate} />
          )}
        </main>

        {/* Persistent Contact Bento Footer on every page */}
        <Footer />
      </div>

      {/* Full-Screen Project Detail Lightbox Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

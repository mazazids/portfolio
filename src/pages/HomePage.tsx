/**
 * HomePage Component
 * Navigation menu bento grid with strict size hierarchy in two-tone Off-White & Dark Graphite:
 * 1. Branding (2x3, largest, on the left — cycles smoothly through all 6 project thumbnails)
 * 2. Logofolio (2x2, medium, top-right — Stone Off-White #E5E3DC)
 * 3. Social ads (1x1, smallest, bottom-right — Slate Graphite #28282C)
 * 4. Profile (1x1, next to Social ads — Crisp Off-White #F7F6F2)
 */

import React from 'react';
import { PageId, TileColor, TileSize } from '../types/portfolio';
import { BentoGrid } from '../components/BentoGrid';
import { Tile } from '../components/Tile';
import { BRANDING_PROJECTS } from './BrandingPage';
import { LOGOFOLIO_ITEMS } from './LogofolioPage';
import { SOCIAL_CLIENT_GROUPS } from './SocialAdsPage';
import { PROFILE_DATA } from './ProfilePage';

interface HomeTileItem {
  id: PageId;
  kicker: string;
  title: string;
  description: string;
  color: TileColor;
  size: TileSize;
}

export const HOME_TILES: HomeTileItem[] = [
  {
    id: 'branding',
    kicker: 'Primary Focus',
    title: 'Branding & Identity',
    description: 'Complete visual systems, strategy, guidelines, and packaging built for clarity.',
    color: 'lavender', // Dark Graphite #1C1C1E
    size: '2x3',
  },
  {
    id: 'logofolio',
    kicker: 'Selected Marks',
    title: 'Logofolio',
    description: 'Distilled marks, monograms, and bespoke wordmarks.',
    color: 'mint', // Stone Off-White #E5E3DC
    size: '2x2',
  },
  {
    id: 'social',
    kicker: 'Campaigns',
    title: 'Ad Creatives',
    description: 'High-impact motion & feed visuals.',
    color: 'yellow', // Slate Graphite #28282C
    size: '1x1',
  },
  {
    id: 'profile',
    kicker: 'About',
    title: 'Profile',
    description: 'Background, skills, and toolset.',
    color: 'surface', // Crisp Off-White #F7F6F2
    size: '1x1',
  },
];

const BRANDING_CYCLING_THUMBNAILS = BRANDING_PROJECTS.filter(
  (project) => Boolean(project.coverImage)
).map((project) => ({
  src: project.coverImage as string,
  label: project.title,
}));

const LOGOFOLIO_CYCLING_LOGOS = LOGOFOLIO_ITEMS.map((item) => ({
  darkSrc: item.darkLogo,
  lightSrc: item.lightLogo,
  label: item.client,
}));

const SOCIAL_ADS_CYCLING_THUMBNAILS = SOCIAL_CLIENT_GROUPS.filter(
  (group) => Boolean(group.coverImage)
).map((group) => ({
  src: group.coverImage,
  label: group.client,
}));

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  showGridSpecs?: boolean;
  paletteOffset?: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  showGridSpecs = false,
  paletteOffset = 0,
}) => {
  const [brandingTile, logofolioTile, socialTile, profileTile] = HOME_TILES;

  return (
    <section aria-labelledby="home-hero-headline" className="pt-2 pb-4">
      {/* Large Bold Headline Above the Grid */}
      <div className="mb-5 md:mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="relative inline-block max-w-3xl">
          <p className="text-xs sm:text-sm font-bold tracking-tight text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70 mb-1.5">
            Maza Sunardi · Communication Designer
          </p>
          <h1
            id="home-hero-headline"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.04em] leading-[1.02] text-[#1c1c1e] dark:text-[#f7f6f2] text-balance lowercase"
          >
            maza&apos;s bunch of design works
            <span className="inline-block opacity-45">.</span>
            {/* Architectural corner bracket in Dark Graphite / Off-White */}
            <span
              className="hidden sm:inline-block align-top ml-2 w-3.5 h-3.5 border-t-[3.5px] border-r-[3.5px] border-[#1c1c1e] dark:border-[#f7f6f2]"
              aria-hidden="true"
            />
          </h1>
        </div>
      </div>

      {/* 4-Column Navigation Bento Grid */}
      <BentoGrid>
        {/* 1. BRANDING TILE (2 cols × 3 rows on desktop, full-width tall on mobile — smooth cycling project thumbnails) */}
        <Tile
          kicker={brandingTile.kicker}
          title={brandingTile.title}
          color={brandingTile.color}
          size={brandingTile.size}
          cyclingImages={BRANDING_CYCLING_THUMBNAILS}
          enableSpotlightOverlay
          onClick={() => onNavigate('branding')}
          showGridSpecs={showGridSpecs}
          paletteOffset={paletteOffset}
        />

        {/* 2. LOGOFOLIO TILE (2 cols × 2 rows on desktop, full-width on mobile — cycles theme-aware colored logos) */}
        <Tile
          kicker={logofolioTile.kicker}
          title={logofolioTile.title}
          color={logofolioTile.color}
          size={logofolioTile.size}
          cyclingLogos={LOGOFOLIO_CYCLING_LOGOS}
          enableSpotlightOverlay
          onClick={() => onNavigate('logofolio')}
          showGridSpecs={showGridSpecs}
          paletteOffset={paletteOffset}
        />

        {/* 3. AD CREATIVES TILE (1 col × 1 row, smallest work category — cycles each client cover thumbnail) */}
        <Tile
          kicker={socialTile.kicker}
          title={socialTile.title}
          color={socialTile.color}
          size={socialTile.size}
          cyclingImages={SOCIAL_ADS_CYCLING_THUMBNAILS}
          enableSpotlightOverlay
          onClick={() => onNavigate('social')}
          showGridSpecs={showGridSpecs}
          paletteOffset={paletteOffset}
        />

        {/* 4. PROFILE TILE (1 col × 1 row, next to Ad Creatives — portrait thumbnail with dark overlay & cursor spotlight) */}
        <Tile
          kicker={profileTile.kicker}
          title={profileTile.title}
          color={profileTile.color}
          size={profileTile.size}
          coverImage={PROFILE_DATA.portrait}
          coverObjectPosition="object-center"
          enableSpotlightOverlay
          onClick={() => onNavigate('profile')}
          showGridSpecs={showGridSpecs}
          paletteOffset={paletteOffset}
        />
      </BentoGrid>
    </section>
  );
};


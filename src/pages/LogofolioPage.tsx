/**
 * LogofolioPage Component
 * Inner page for Category 2: Logofolio.
 * Displays all client logos in a 5-column grid of 1x1 aspect-ratio tiles.
 *
 * Theme & Hover Behavior:
 * - Light Mode Default: Black logo variant
 * - Dark Mode Default: White logo variant
 * - Light Mode Hover: Dark colored logo variant
 * - Dark Mode Hover: Light colored logo variant
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageId, ProjectTileData } from '../types/portfolio';

export interface LogoFolioItem {
  id: string;
  client: string;
  blackLogo: string;
  whiteLogo: string;
  darkLogo: string;
  lightLogo: string;
}

/**
 * Complete 24-brand Logofolio dataset with 4 variants each:
 * - blackLogo: shown by default in Light Mode
 * - whiteLogo: shown by default in Dark Mode
 * - darkLogo: shown on hover in Light Mode (colored lockup for light surfaces)
 * - lightLogo: shown on hover in Dark Mode (colored lockup for dark surfaces)
 */
export const LOGOFOLIO_ITEMS: LogoFolioItem[] = [
  {
    id: 'oxa',
    client: 'Oxa',
    blackLogo: '/assets/aistudio/Oxa_-_Black_725d321c.svg',
    whiteLogo: '/assets/aistudio/Oxa_-_White_b521345b.svg',
    darkLogo: '/assets/aistudio/Oxa_-_Dark_14e280b0.svg',
    lightLogo: '/assets/aistudio/Oxa_-_Light_057cb5b1.svg',
  },
  {
    id: 'just-so',
    client: 'Just So',
    blackLogo: '/assets/aistudio/Just_So_-_Black_340cd8b4.svg',
    whiteLogo: '/assets/aistudio/Just_So_-_White_ba40975f.svg',
    darkLogo: '/assets/aistudio/Just_So_-_Dark_6f779893.svg',
    lightLogo: '/assets/aistudio/Just_So_-_Light_40b1f728.svg',
  },
  {
    id: 'steppo',
    client: 'Steppo',
    blackLogo: '/assets/aistudio/Steppo_-_Black_b18b1e5a.svg',
    whiteLogo: '/assets/aistudio/Steppo_-_White_b0327888.svg',
    darkLogo: '/assets/aistudio/Steppo_-_Dark_6ef11100.svg',
    lightLogo: '/assets/aistudio/Steppo_-_Light_f23e7020.svg',
  },
  {
    id: 'trivate',
    client: 'Trivate',
    blackLogo: '/assets/aistudio/Trivate_-_Black_149145d2.svg',
    whiteLogo: '/assets/aistudio/Trivate_-_White_4b1e06fc.svg',
    darkLogo: '/assets/aistudio/Trivate_-_Dark_48039296.svg',
    lightLogo: '/assets/aistudio/Trivate_-_Light_03041109.svg',
  },
  {
    id: 'brainsprout',
    client: 'Brainsprout',
    blackLogo: '/assets/aistudio/Brainsprout_-_Black_2c44fde1.svg',
    whiteLogo: '/assets/aistudio/Brainsprout_-_White_c58b5a0b.svg',
    darkLogo: '/assets/aistudio/Brainsprout_-_Dark_5cb5af9d.svg',
    lightLogo: '/assets/aistudio/Brainsprout_-_Light_1d3edaec.svg',
  },
  {
    id: 'influencer-journalism',
    client: 'Influencer Journalism',
    blackLogo: '/assets/aistudio/Influencer_Journalism_-_Black_24cada9f.svg',
    whiteLogo: '/assets/aistudio/Influencer_Journalism_-_White_62239505.svg',
    darkLogo: '/assets/aistudio/Influencer_Journalism_-_Dark_94895087.svg',
    lightLogo: '/assets/aistudio/Influencer_Journalism_-_Light_c0237e53.svg',
  },
  {
    id: 'xeno',
    client: 'Xeno',
    blackLogo: '/assets/aistudio/Xeno_-_Black_8400ac96.svg',
    whiteLogo: '/assets/aistudio/Xeno_-_White_9067a628.svg',
    darkLogo: '/assets/aistudio/Xeno_-_Dark_b3cb14c6.svg',
    lightLogo: '/assets/aistudio/Xeno_-_Light_1dc9725f.svg',
  },
  {
    id: 'green-bubble',
    client: 'Green Bubble',
    blackLogo: '/assets/aistudio/Green_Bubble_-_Black_713642ba.svg',
    whiteLogo: '/assets/aistudio/Green_Bubble_-_White_3ed42111.svg',
    darkLogo: '/assets/aistudio/Green_Bubble_-_Dark_868a6971.svg',
    lightLogo: '/assets/aistudio/Green_Bubble_-_Light_e8f919e5.svg',
  },
  {
    id: 'sow-easy',
    client: 'Sow Easy',
    blackLogo: '/assets/aistudio/Sow_Easy_-_Black_c9e781c3.svg',
    whiteLogo: '/assets/aistudio/Sow_Easy_-_White_cf2c9cde.svg',
    darkLogo: '/assets/aistudio/Sow_Easy_-_Dark_52fbb98b.svg',
    lightLogo: '/assets/aistudio/Sow_Easy_-_Light_9df7ca95.svg',
  },
  {
    id: 'madeline',
    client: 'Madeline',
    blackLogo: '/assets/aistudio/Madeline_-_Black_da8baccd.svg',
    whiteLogo: '/assets/aistudio/Madeline_-_White_af648ed0.svg',
    darkLogo: '/assets/aistudio/Madeline_-_Dark_7f60f0d6.svg',
    lightLogo: '/assets/aistudio/Madeline_-_Light_3274c090.svg',
  },
  {
    id: 'onggi',
    client: 'Onggi',
    blackLogo: '/assets/aistudio/Onggi_-_Black_240f0b0d.svg',
    whiteLogo: '/assets/aistudio/Onggi_-_White_e08db3ed.svg',
    darkLogo: '/assets/aistudio/Onggi_-_Dark_3ef6ef18.svg',
    lightLogo: '/assets/aistudio/Onggi_-_Light_c1fa409c.svg',
  },
  {
    id: 'studio-som',
    client: 'Studio Som',
    blackLogo: '/assets/aistudio/Studio_Som_-_Black_0db8604d.svg',
    whiteLogo: '/assets/aistudio/Studio_Som_-_White_4516b98a.svg',
    darkLogo: '/assets/aistudio/Studio_Som_-_Dark_a43332f0.svg',
    lightLogo: '/assets/aistudio/Studio_Som_-_Light_a8acd93b.svg',
  },
  {
    id: 'mseed',
    client: 'Mseed',
    blackLogo: '/assets/aistudio/Mseed_-_Black_f202cea8.svg',
    whiteLogo: '/assets/aistudio/Mseed_-_White_d5f5d99c.svg',
    darkLogo: '/assets/aistudio/Mseed_-_Dark_29394d81.svg',
    lightLogo: '/assets/aistudio/Mseed_-_Light_486bed4f.svg',
  },
  {
    id: 'logisector',
    client: 'LogiSector',
    blackLogo: '/assets/aistudio/LogiSector_-_Black_c249283e.svg',
    whiteLogo: '/assets/aistudio/LogiSector_-_White_a1e294ca.svg',
    darkLogo: '/assets/aistudio/LogiSector_-_Dark_58403316.svg',
    lightLogo: '/assets/aistudio/LogiSector_-_Light_53b8a036.svg',
  },
  {
    id: 'kara',
    client: 'Kara',
    blackLogo: '/assets/aistudio/Kara_-_Black_bb099953.svg',
    whiteLogo: '/assets/aistudio/Kara_-_White_e9626f60.svg',
    darkLogo: '/assets/aistudio/Kara_-_Dark_9e92fef6.svg',
    lightLogo: '/assets/aistudio/Kara_-_Light_f32a4bd8.svg',
  },
  {
    id: 'ship-shop',
    client: 'Ship Shop',
    blackLogo: '/assets/aistudio/Ship_Shop_-_Black_62a453a9.svg',
    whiteLogo: '/assets/aistudio/Ship_Shop_-_White_e192e8a5.svg',
    darkLogo: '/assets/aistudio/Ship_Shop_-_Dark_d2601203.svg',
    lightLogo: '/assets/aistudio/Ship_Shop_-_Light_c050380a.svg',
  },
  {
    id: 'ysolde',
    client: 'Ysolde',
    blackLogo: '/assets/aistudio/Ysolde_-_Black_9690effc.svg',
    whiteLogo: '/assets/aistudio/Ysolde_-_White_e55c97f1.svg',
    darkLogo: '/assets/aistudio/Ysolde_-_Dark_b5b5fc21.svg',
    lightLogo: '/assets/aistudio/Ysolde_-_Light_ae73fe65.svg',
  },
  {
    id: 'octane',
    client: 'Octane',
    blackLogo: '/assets/aistudio/Octane_-_Black_06ae6ff6.svg',
    whiteLogo: '/assets/aistudio/Octane_-_White_deb6cdf6.svg',
    darkLogo: '/assets/aistudio/Octane_-_Dark_900897ce.svg',
    lightLogo: '/assets/aistudio/Octane_-_Light_765da1ba.svg',
  },
  {
    id: 'parcel-plus',
    client: 'Parcel Plus',
    blackLogo: '/assets/aistudio/Parcel_Plus_-_Black_6b50e4bd.svg',
    whiteLogo: '/assets/aistudio/Parcel_Plus_-_White_25f66d6c.svg',
    darkLogo: '/assets/aistudio/Parcel_Plus_-_Dark_0d3b5c61.svg',
    lightLogo: '/assets/aistudio/Parcel_Plus_-_Light_a14b89fe.svg',
  },
  {
    id: 'feedbase',
    client: 'FeedBase',
    blackLogo: '/assets/aistudio/FeedBase_-_Black_172ca921.svg',
    whiteLogo: '/assets/aistudio/FeedBase_-_White_7a7fa2cb.svg',
    darkLogo: '/assets/aistudio/FeedBase_-_Dark_06dd65a2.svg',
    lightLogo: '/assets/aistudio/FeedBase_-_Light_aecf20f0.svg',
  },
  {
    id: 'bytescout',
    client: 'ByteScout',
    blackLogo: '/assets/aistudio/ByteScout_-_Black_256fb8c7.svg',
    whiteLogo: '/assets/aistudio/ByteScout_-_White_8a36a460.svg',
    darkLogo: '/assets/aistudio/ByteScout_-_Dark_c5f24a17.svg',
    lightLogo: '/assets/aistudio/ByteScout_-_Light_d8572981.svg',
  },
  {
    id: 'instapeople',
    client: 'Instapeople',
    blackLogo: '/assets/aistudio/Instapeople_-_Black_4525269f.svg',
    whiteLogo: '/assets/aistudio/Instapeople_-_White_3925ad1b.svg',
    darkLogo: '/assets/aistudio/Instapeople_-_Dark_339db617.svg',
    lightLogo: '/assets/aistudio/Instapeople_-_White_1_f329c30e.svg',
  },
  {
    id: 'crib-corner',
    client: 'Crib Corner',
    blackLogo: '/assets/aistudio/Crib_Corner_-_Black_14417266.svg',
    whiteLogo: '/assets/aistudio/Crib_Corner_-_White_1fde9744.svg',
    darkLogo: '/assets/aistudio/Crib_Corner_-_Dark_e62b3112.svg',
    lightLogo: '/assets/aistudio/Crib_Corner_-_Light_121485ef.svg',
  },
  {
    id: 'stacy',
    client: 'Stacy',
    blackLogo: '/assets/aistudio/Stacy_-_Black_72bb1f01.svg',
    whiteLogo: '/assets/aistudio/Stacy_-_White_71af0ad6.svg',
    darkLogo: '/assets/aistudio/sStacy_-_Dark_c74a448c.png',
    lightLogo: '/assets/aistudio/sStacy_-_Light_bbcbc5ad.png',
  },
];

interface LogofolioPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject?: (project: ProjectTileData) => void;
}

export const LogofolioPage: React.FC<LogofolioPageProps> = ({
  onNavigate,
}) => {
  return (
    <section aria-labelledby="logofolio-page-title" className="pt-2 pb-4">
      {/* Top Back Navigation & Page Intro */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 min-h-[44px] px-3.5 rounded-full bg-[#f7f6f2] dark:bg-[#1e1e21] text-xs font-bold text-[#1c1c1e] dark:text-[#f7f6f2] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12 hover:bg-[#1c1c1e]/8 dark:hover:bg-[#f7f6f2]/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>

        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h1
              id="logofolio-page-title"
              className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] leading-none text-[#1c1c1e] dark:text-[#f7f6f2] text-balance"
            >
              Logofolio
            </h1>
          </div>
          <span className="text-xs font-semibold tabular-nums text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65">
            {LOGOFOLIO_ITEMS.length} selected marks &amp; symbols
          </span>
        </div>
      </div>

      {/* 5-Column 1x1 Aspect Ratio Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5"
        role="list"
        aria-label="Logofolio 5-column showcase"
      >
        {LOGOFOLIO_ITEMS.map((item) => (
          <div
            key={item.id}
            role="listitem"
            tabIndex={0}
            aria-label={`${item.client} logo`}
            className="group relative aspect-square rounded-xl bg-[#f7f6f2] dark:bg-[#1b1b1e] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10 hover:border-[#1c1c1e]/30 dark:hover:border-[#f7f6f2]/30 flex items-center justify-center p-4 sm:p-6 overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-20 hover:scale-[1.12] focus-visible:z-20 focus-visible:scale-[1.12] hover:shadow-[0_22px_48px_-12px_rgba(28,28,30,0.22)] dark:hover:shadow-[0_22px_48px_-12px_rgba(0,0,0,0.65)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]"
          >
            {/* DEFAULT STATE: Black logo in Light Mode, White logo in Dark Mode */}
            <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-75 group-focus-visible:opacity-0 group-focus-visible:scale-75 pointer-events-none">
              {/* Light mode default -> Black logo */}
              <img
                src={item.blackLogo}
                alt={`${item.client} monochrome black mark`}
                className="block dark:hidden w-[58%] h-[58%] max-w-[118px] max-h-[118px] object-contain select-none"
                loading="lazy"
                draggable={false}
              />
              {/* Dark mode default -> White logo */}
              <img
                src={item.whiteLogo}
                alt={`${item.client} monochrome white mark`}
                className="hidden dark:block w-[58%] h-[58%] max-w-[118px] max-h-[118px] object-contain select-none"
                loading="lazy"
                draggable={false}
              />
            </div>

            {/* HOVER STATE: Snappy reveal of Dark colored logo in Light Mode, Light colored logo in Dark Mode */}
            <div className="absolute inset-0 flex items-center justify-center p-3.5 sm:p-4 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 scale-75 translate-y-1.5 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:scale-100 group-focus-visible:translate-y-0 pointer-events-none">
              {/* Light mode hover -> Dark colored logo */}
              <img
                src={item.darkLogo}
                alt={`${item.client} dark color logo`}
                className="block dark:hidden w-[86%] h-[78%] max-w-[196px] max-h-[148px] object-contain select-none"
                loading="lazy"
                draggable={false}
              />
              {/* Dark mode hover -> Light colored logo */}
              <img
                src={item.lightLogo}
                alt={`${item.client} light color logo`}
                className="hidden dark:block w-[86%] h-[78%] max-w-[196px] max-h-[148px] object-contain select-none"
                loading="lazy"
                draggable={false}
              />
            </div>

            {/* Subtle Client Name Caption at Bottom */}
            <span className="absolute bottom-2 left-2.5 right-2.5 text-center text-[11px] font-semibold tracking-[-0.02em] text-[#1c1c1e]/40 dark:text-[#f7f6f2]/40 group-hover:text-[#1c1c1e]/90 dark:group-hover:text-[#f7f6f2]/90 transition-all duration-150 truncate pointer-events-none">
              {item.client}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

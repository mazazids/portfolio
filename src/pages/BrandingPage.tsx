/**
 * BrandingPage Component
 * Inner page for Category 1: Branding & Identity Design (Main Focus).
 * Features 7 real projects with mixed tile sizes:
 * - Project 1 (OXA): Large featured tile (2x2)
 * - Project 2 (Great Bukittinggi): Tall tile (1x2)
 * - Project 3 (Just So): Square tile (1x1)
 * - Project 4 (Steppo): Square tile (1x1)
 * - Project 5 (BrainSprout Academy): Wide tile (2x1)
 * - Project 6 (Trivate): Square tile (1x1)
 * - Project 7 (Stacy): Square tile (1x1)
 * Total: 12 grid cells (3 complete rows on 4-column desktop grid).
 */

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PageId, ProjectTileData } from '../types/portfolio';
import { BentoGrid } from '../components/BentoGrid';
import { Tile } from '../components/Tile';

export const BRANDING_PROJECTS: ProjectTileData[] = [
  {
    id: 'oxa',
    title: 'OXA',
    description:
      'How do you carry your daily essentials without bulky tactical gear or sacrificing style?',
    category: 'Featured Identity',
    year: '2026',
    client: 'OXA Hardware & Goods',
    color: 'lavender',
    size: '2x2',
    motif: 'bauhaus-arch',
    coverImage: '/assets/aistudio/OXA_-_01_2897eac2.png',
    challenge:
      'OXA unifies gear and wardrobe into one modular system, pairing precision carabiners and MagSafe tech with sleek utility apparel for rugged, urban readiness.',
    gallery: [
      {
        src: '/assets/aistudio/OXA_-_01_2897eac2.png',
        alt: 'OXA — Primary geometric brand mark on industrial red and black gradient',
        caption: 'Core Geometric Brand Mark',
        span: 'wide',
      },
      {
        src: '/assets/aistudio/OXA_-_02_NC_9f0076b3.png',
        alt: 'OXA — Carry It Like You Meant It mobile silhouette poster',
        caption: 'Campaign Key Visual — "Carry It Like You Meant It."',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/OXA_-_03_d92a4e28.png',
        alt: 'OXA — Terracotta leather magnetic wallet with debossed icon trio',
        caption: 'Tactile Materiality & Debossed Leather Goods',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/OXA_-_04_780e866c.png',
        alt: 'OXA — Anodized carabiner hardware loops in grey, red, and chalk white',
        caption: 'Industrial Hardware & Anodized Carabiner System',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/OXA_-_05_d4f6b910.png',
        alt: 'OXA — Hand holding white phone case with signature red grip module',
        caption: 'Ergonomic Grip Module & Product Design',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/OXA_-_06_06f6e761.png',
        alt: 'OXA — Engineered Like Hardware, Designed Like Keepsake manifesto poster',
        caption: 'Brand Manifesto & Typographic Hierarchy',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/OXA_-_07_b73eacbd.png',
        alt: 'OXA — Streetwear cap and lifestyle editorial photography',
        caption: 'Apparel & Lifestyle Editorial Direction',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/OXA_-_08_5b4fa237.png',
        alt: 'OXA — Own the little things triptych overview',
        caption: 'Identity System Overview — "Own the little things"',
        span: 'wide',
        noCrop: true,
      },
    ],
  },
  {
    id: 'great-bukittinggi',
    title: 'Great Bukittinggi',
    description:
      'How do you capture the living soul of a historic highland city in a single, timeless identity?',
    category: 'Place & Civic Branding',
    year: '2026',
    client: 'City of Bukittinggi Tourism',
    color: 'mint',
    size: '1x2',
    motif: 'totem',
    coverImage: '/assets/aistudio/Great_Bukittinggi_-_01_9f6906c1.png',
    challenge:
      'Great Bukittinggi turns the Jam Gadang into a modular visual system woven with Minangkabau patterns, landmarks, and culinary heritage, promising a great time, a great place, and a story rich in meaning.',
    gallery: [
      {
        src: '/assets/aistudio/Great_Bukittinggi_-_01_9f6906c1.png',
        alt: 'Great Bukittinggi — Primary Jam Gadang landmark logomark on royal blue',
        caption: 'Civic Landmark Logomark & Wordmark',
        span: 'wide',
      },
      {
        src: '/assets/aistudio/Great_Bukittinggi_-_02_NC_6697bf7f.png',
        alt: 'Great Bukittinggi — Geometric pattern construction from traditional Minangkabau carvings',
        caption: 'Modular Heritage Pattern Construction System',
        span: 'wide',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Great_Bukittinggi_-_03_NC_03ae1f53.png',
        alt: 'Great Bukittinggi — Custom public wayfinding and civic pictogram suite',
        caption: 'Civic Wayfinding & Public Pictogram Suite',
        span: 'wide',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Great_Bukittinggi_-_04_6513b8d1.png',
        alt: 'Great Bukittinggi — Brand application and visual identity showcase 04',
        caption: 'Civic Identity Application & Environmental System',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Great_Bukittinggi_-_05_4e31ef3a.png',
        alt: 'Great Bukittinggi — Brand application and visual identity showcase 05',
        caption: 'Cultural Signage & Pattern Rollout',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Great_Bukittinggi_-_06_403b3034.png',
        alt: 'Great Bukittinggi — Wide panoramic brand presentation 06',
        caption: 'Tourism Campaign & Spatial Identity',
        span: 'wide',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Great_Bukittinggi_-_07_4cf27518.png',
        alt: 'Great Bukittinggi — Brand application and collateral 07',
        caption: 'Print Collateral & Editorial Guides',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Great_Bukittinggi_-_08_2b91e0d6.png',
        alt: 'Great Bukittinggi — Brand application and merchandise 08',
        caption: 'Souvenir & Merchandise System',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Great_Bukittinggi_-_09_2fae00d2.png',
        alt: 'Great Bukittinggi — Identity system summary 09',
        caption: 'Complete Civic Brand Guidelines',
        span: 'wide',
      },
    ],
  },
  {
    id: 'just-so',
    title: 'Just So',
    description:
      'Why does ordering what your body actually needs at a café still feel like an inconvenience?',
    category: 'F&B & Hospitality',
    year: '2026',
    client: 'Just So Roastery & Bakery',
    color: 'yellow',
    size: '1x1',
    motif: 'concentric',
    coverImage: '/assets/aistudio/Just_So_-_01_d1fa463e.png',
    challenge:
      'Just So makes customization the whole point. Every coffee, matcha, ube, chocolate, and pastry is calibrated to your exact milk, sweetener, and micros, with real ingredients and zero judgment.',
    gallery: [
      {
        src: '/assets/aistudio/Just_So_-_01_d1fa463e.png',
        alt: 'Just So — Primary logo lockup over morning espresso and croissant',
        caption: 'Primary Wordmark & Morning Ritual Art Direction',
        span: 'wide',
      },
      {
        src: '/assets/aistudio/Just_So_-_02_NC_235b5284.png',
        alt: 'Just So — Nothing extra, just so mobile illustration poster',
        caption: 'Digital Story Poster — "nothing extra. just so."',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Just_So_-_03_c680ffc1.png',
        alt: 'Just So — Packaging and brand identity application 03',
        caption: 'Packaging & Takeaway Experience',
        span: 'portrait',
        objectPosition: 'object-bottom',
      },
      {
        src: '/assets/aistudio/Just_So_-_04_24fd3289.png',
        alt: 'Just So — Brand collateral and cup design 04',
        caption: 'Tactile Cup & Bakery Collateral',
        span: 'portrait',
        objectPosition: 'object-[50%_62%]',
      },
      {
        src: '/assets/aistudio/Just_So_-_05_34ebd8a7.png',
        alt: 'Just So — Lifestyle and hospitality touchpoints 05',
        caption: 'In-Store Hospitality Touchpoints',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Just_So_-_06_NC_1d00ec66.png',
        alt: 'Just So — Tell us what you are in the mood for note card',
        caption: 'Interactive Order Card — "Tell us what you’re in the mood for"',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Just_So_-_07_NC_4ca08722.png',
        alt: 'Just So — Illustrated penguin duo sharing coffee',
        caption: 'Signature Character Illustration — Coffee Companion Duo',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Just_So_-_08_b80984fc.png',
        alt: 'Just So — Complete brand identity overview 08',
        caption: 'Identity System & Visual Language Overview',
        span: 'wide',
        noCrop: true,
      },
    ],
  },
  {
    id: 'steppo',
    title: 'Steppo',
    description:
      'How do we turn everyday screen time into a window into who our children are becoming?',
    category: 'Consumer Product',
    year: '2025',
    client: 'Steppo Kids Living',
    color: 'coral',
    size: '1x1',
    motif: 'split-circle',
    coverImage: '/assets/aistudio/Steppo_-_01_e04f0f17.png',
    challenge:
      'Steppo turns screen time into purposeful exploration across six creative worlds, then translates each small moment into clear observations and real-world activities for parents.',
    gallery: [
      {
        src: '/assets/aistudio/Steppo_-_01_e04f0f17.png',
        alt: 'Steppo — Primary slide-ladder logomark over playful kids backdrop',
        caption: 'Primary Logomark & Brand Introduction',
        span: 'wide',
      },
      {
        src: '/assets/aistudio/Steppo_-_02_47edadc1.png',
        alt: 'Steppo — Product and visual identity application 02',
        caption: 'Product Identity & Modular Form Language',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Steppo_-_03_62e92f71.png',
        alt: 'Steppo — Brand application and childhood curiosity showcase 03',
        caption: 'Everyday Independence & Lifestyle Direction',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Steppo_-_04_9611f3cf.png',
        alt: 'Steppo — Packaging and graphic details 04',
        caption: 'Tactile Labelling & Brand Details',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Steppo_-_05_NC_3b4356ad.png',
        alt: 'Steppo — Closer to what makes them curious ladder pattern poster',
        caption: 'Brand Manifesto & Ladder Pattern — "Closer to what makes them curious."',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Steppo_-_06_e94197cc.png',
        alt: 'Steppo — Full visual system overview 06',
        caption: 'Complete Brand System Rollout',
        span: 'wide',
        noCrop: true,
      },
    ],
  },
  {
    id: 'brainsprout-academy',
    title: 'BrainSprout Academy',
    description:
      "What if your child isn't struggling to learn, they just haven't been asked the right question yet?",
    category: 'Education & Youth',
    year: '2025',
    client: 'BrainSprout Academy',
    color: 'pink',
    size: '2x1',
    motif: 'wave-bars',
    coverImage: '/assets/aistudio/Brainsprout_Academy_-_01_658da0ff.png',
    challenge:
      'Brainsprout replaces one-size-fits-all schooling with personalized coaching rooted in creativity, mapping how each child thinks, plays, and imagines to spark their breakthrough early.',
    gallery: [
      {
        src: '/assets/aistudio/Brainsprout_Academy_-_01_658da0ff.png',
        alt: 'BrainSprout Academy — Sprout head symbol surrounded by circle of students',
        caption: 'Core Sprout-Mind Symbol & Community Photography',
        span: 'wide',
      },
      {
        src: '/assets/aistudio/Brainsprout_Academy_-_02_NC_c5533265.png',
        alt: 'BrainSprout Academy — Every child is one question away from a breakthrough capsule poster',
        caption: 'Modular Capsule Story — "Every child is one question away from a breakthrough"',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Brainsprout_Academy_-_03_6ec3c0bd.png',
        alt: 'BrainSprout Academy — Brand merchandise and collateral 03',
        caption: 'Learning Kits & Student Collateral',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Brainsprout_Academy_-_04_NC_e1e40116.png',
        alt: 'BrainSprout Academy — Imagine playful collage poster',
        caption: 'Editorial Collage Poster — "A World Where Learning Feels Like Playing"',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Brainsprout_Academy_-_05_5e8b3a5d.png',
        alt: 'BrainSprout Academy — Identity application 05',
        caption: 'Environmental & Digital Touchpoints',
        span: 'portrait',
      },
    ],
  },
  {
    id: 'trivate',
    title: 'Trivate',
    description:
      "What happens when the open sea belongs to no one's clock but yours?",
    category: 'Luxury Travel & Maritime',
    year: '2025',
    client: 'Trivate Private Charters',
    color: 'charcoal',
    size: '1x1',
    motif: 'swiss-grid',
    coverImage: '/assets/aistudio/Trivate_-_01_ccaccc16.png',
    challenge:
      "Trivate turns Eastern Indonesia's archipelago into your private sanctuary aboard hand-crafted Phinisi vessels, blending ancestral maritime heritage with effortless, unscripted luxury.",
    gallery: [
      {
        src: '/assets/aistudio/Trivate_-_01_ccaccc16.png',
        alt: 'Trivate — Custom serif wordmark over tranquil open ocean horizon',
        caption: 'Bespoke Sail-Serif Wordmark & Horizon Direction',
        span: 'wide',
      },
      {
        src: '/assets/aistudio/Trivate_-_02_NC_f54c6bd7.png',
        alt: 'Trivate — Timber, salt, and solitude mobile voyage frame over sunlit water',
        caption: 'Editorial Voyage Frame — "Timber, salt, and solitude"',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Trivate_-_03_6562649d.png',
        alt: 'Trivate — Maritime identity and vessel application 03',
        caption: 'Onboard Experience & Nautical Details',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Trivate_-_04_25f4bb0f.png',
        alt: 'Trivate — Editorial layout and charter collateral 04',
        caption: 'Charter Dossier & Print Typography',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Trivate_-_05_585bb4df.png',
        alt: 'Trivate — Brand identity touchpoints 05',
        caption: 'Guest Keepsakes & Maritime System',
        span: 'portrait',
        objectPosition: 'object-[50%_65%]',
      },
    ],
  },
  {
    id: 'stacy',
    title: 'Stacy',
    description:
      'Why does every inbox feel so loud?',
    category: 'AI & Digital Product',
    year: '2026',
    client: 'Stacy AI',
    color: 'surface',
    size: '1x1',
    motif: 'orbital',
    coverImage: '/assets/aistudio/Stacy_-_01_d7e00937.png',
    challenge:
      'Stacy filters the noise, answers the repeats and surfaces only what matters, so your conversations feel quieter and clearer.',
    gallery: [
      {
        src: '/assets/aistudio/Stacy_-_01_d7e00937.png',
        alt: 'Stacy — Primary logomark and wordmark centered over vibrant cyan, blue, and emerald gradient sphere',
        caption: 'Core Brand Mark & Luminous Sphere Gradient',
        span: 'wide',
      },
      {
        src: '/assets/aistudio/Stacy_-_02_NC_6f5be9cd.png',
        alt: 'Stacy — Say Less, Done More mobile interface poster with floating gradient spheres',
        caption: 'Mobile Product Key Visual — "Say Less. Done More."',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Stacy_-_03_NC_297191cf.png',
        alt: 'Stacy — Where every reply feels effortless radial glow poster',
        caption: 'Brand Messaging & Radial Light Study — "Where every reply feels effortless."',
        span: 'portrait',
        cropSides: true,
      },
      {
        src: '/assets/aistudio/Stacy_-_04_cc6020e5.png',
        alt: 'Stacy — Minimalist business card stationery mockup on deep indigo backdrop',
        caption: 'Corporate Stationery & Tactile Print System',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Stacy_-_05_7ab3d680.png',
        alt: 'Stacy — Smart, Friendly, Always On subway transit poster mockup',
        caption: 'Transit Campaign Poster — "Smart. Friendly. Always On."',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Stacy_-_08_NC_2bc85ebb.png',
        alt: 'Stacy — One Assistant, All Platforms outdoor street billboard mockup',
        caption: 'OOH Billboard Campaign — "One Assistant. All Platforms."',
        span: 'wide',
        noCrop: true,
      },
    ],
  },
  {
    id: 'xeno',
    title: 'Xeno',
    description:
      'Why settle for volume when you can have value?',
    category: 'Retail & Lifestyle Curation',
    year: '2026',
    client: 'Xeno Logistics Inc.',
    color: 'yellow',
    size: '2x1',
    motif: 'swiss-grid',
    coverImage: '/assets/aistudio/Xeno_-_01_38de1646.png',
    challenge:
      'Xeno is the discipline of discernment made tangible. Fewer things, better chosen, so every acquisition is an act of intention rather than impulse.',
    gallery: [
      {
        src: '/assets/aistudio/Xeno_-_01_38de1646.png',
        alt: 'Xeno — Primary geometric split-X emblem and spaced wordmark over dark bronze architectural curve',
        caption: 'Primary Geometric Split-X Monogram & Architectural Direction',
        span: 'wide',
      },
      {
        src: '/assets/aistudio/Xeno_-_02_999cca51.png',
        alt: 'Xeno — Curated Against The Noise typographic manifesto over embossed warm cream X pattern',
        caption: 'Brand Manifesto — "Curated Against The Noise"',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Xeno_-_03_2b50bbe1.png',
        alt: 'Xeno — Hands holding warm cream Xeno parcel box with metallic bronze sealing tape',
        caption: 'Tactile Parcel Packaging & Unboxing System',
        span: 'portrait',
      },
      {
        src: '/assets/aistudio/Xeno_-_04_NC_fc441f13.png',
        alt: 'Xeno — Three vertical sub-brand campaign posters for Xeno Living, Xeno Style, and Xeno Family',
        caption: 'Sub-Brand Vertical System — Living, Style & Family',
        span: 'wide',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Xeno_-_05_9bc3768c.png',
        alt: 'Xeno — Buy Once, Live Better urban delivery truck livery mockup',
        caption: 'Fleet Livery & Campaign — "Buy Once. Live Better."',
        span: 'wide',
      },
    ],
  },
  {
    id: 'lovia',
    title: 'Lovia',
    description:
      'How do you turn a big brand idea into something people actually experience?',
    category: 'PR & Media Platform',
    year: '2026',
    client: 'Lovia PR',
    color: 'coral',
    size: '2x1',
    motif: 'concentric',
    coverImage: '/assets/aistudio/Lovia_-_01_0510902e.png',
    challenge:
      "Lovia carries the brand's core messages out into the real world with efficiency and effectiveness, so what is promised on paper is what customers meet in practice.",
    gallery: [
      {
        src: '/assets/aistudio/Lovia_-_01_0510902e.png',
        alt: 'Lovia — Primary white lowercase wordmark with heart-loop ligature over warm tangerine wave gradient',
        caption: 'Core Heart-Loop Wordmark & Tangerine Wave Gradient',
        span: 'wide',
      },
      {
        src: '/assets/aistudio/Lovia_-_02_NC_df28b2e2.png',
        alt: 'Lovia — Achieve Greatness, Loud And Clear mobile poster over orange spiral staircase',
        caption: 'Mobile Campaign Visual — "Achieve Greatness. Loud And Clear."',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Lovia_-_03_NC_c2b1f167.png',
        alt: 'Lovia — Canvas tote bag with warm orange gradient print and orange straps',
        caption: 'Signature Gradient Canvas Tote & Event Merch',
        span: 'portrait',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Lovia_-_04_NC_574fe5ba.png',
        alt: 'Lovia — Editorial press kit stationery, black crewneck apparel, and framed Amplify Your Story poster',
        caption: 'Press Kit Stationery, Apparel & "Amplify Your Story" Poster System',
        span: 'wide',
        noCrop: true,
      },
      {
        src: '/assets/aistudio/Lovia_-_05_NC_b47035ae.png',
        alt: 'Lovia — Four-square visual language grid featuring sleeve packaging, travel photography, parcel sticker, and neon light',
        caption: 'Brand World & Tactile Packaging System',
        span: 'wide',
        noCrop: true,
      },
    ],
  },
];

interface BrandingPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject: (project: ProjectTileData) => void;
  showGridSpecs?: boolean;
  paletteOffset?: number;
}

export const BrandingPage: React.FC<BrandingPageProps> = ({
  onNavigate,
  onSelectProject,
  showGridSpecs = false,
  paletteOffset = 0,
}) => {
  return (
    <section aria-labelledby="branding-page-title" className="pt-2 pb-4">
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
              id="branding-page-title"
              className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] leading-none text-[#1c1c1e] dark:text-[#f7f6f2] text-balance"
            >
              Branding & Identity
            </h1>
          </div>
          <span className="text-xs font-semibold tabular-nums text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65">
            Highlighted projects · Click any tile to inspect
          </span>
        </div>
      </div>

      {/* 6-Project Mixed-Size Bento Grid */}
      <BentoGrid>
        {BRANDING_PROJECTS.map((project) => (
          <Tile
            key={project.id}
            kicker={project.category}
            title={project.title}
            description={project.description}
            color={project.color}
            size={project.size}
            motif={project.motif}
            coverImage={project.coverImage}
            galleryCount={project.gallery?.length}
            onClick={() => onSelectProject(project)}
            showGridSpecs={showGridSpecs}
            paletteOffset={paletteOffset}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

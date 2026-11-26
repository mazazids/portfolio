/**
 * ProfilePage Component
 * Bento layout populated with Maza Sunardi's portrait, CV details
 * (Work Experiences, Organizational Experiences, Education, Traits, Contacts & Base),
 * and a single-row horizontally scrolling Client Logo Bar with smooth fades at both ends.
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  Briefcase,
  Check,
  Copy,
  Download,
  Flame,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Snowflake,
} from 'lucide-react';
import { PageId } from '../types/portfolio';
import { BentoGrid } from '../components/BentoGrid';
import { Tile } from '../components/Tile';

export interface SkillTemperatureZone {
  id: 'hot' | 'heatin' | 'cool' | 'freezin';
  label: string;
  statusTag: string;
  actionLabel: string;
  range: [number, number];
  center: number;
  accentHex: string;
  skills: string[];
}

export const SKILLSET_TEMPERATURE_ZONES: SkillTemperatureZone[] = [
  {
    id: 'hot',
    label: 'Burning',
    statusTag: 'MASTERED',
    actionLabel: 'Ignite Core Stack',
    range: [0, 25],
    center: 12.5,
    accentHex: '#ef5a5a',
    skills: [
      'Identity / Branding',
      'Visual Concept',
      'Logo',
      'Vector',
      'Editorial, Layout, and prints',
      'Digital Imaging',
      'Iconography',
      'Copywriting',
      'High Performing Ads',
    ],
  },
  {
    id: 'heatin',
    label: 'Heating',
    statusTag: 'FLUENT',
    actionLabel: 'Boost Warm Stack',
    range: [25, 50],
    center: 37.5,
    accentHex: '#c86496',
    skills: [
      'Prompt Writing',
      'Vibe Coding',
      'Ai Animation',
      'Web Design',
      'UI/UX',
      'Photography',
    ],
  },
  {
    id: 'cool',
    label: 'Chilled',
    statusTag: 'CAPABLE',
    actionLabel: 'Chill Secondary Stack',
    range: [50, 75],
    center: 62.5,
    accentHex: '#7e74d2',
    skills: [
      'Illustration',
      'Typeface',
      'App Design',
      'Video Editing',
      'Motion Graphic',
    ],
  },
  {
    id: 'freezin',
    label: 'Freezing',
    statusTag: 'EXPLORING',
    actionLabel: 'Cryo-Freeze Stack',
    range: [75, 100],
    center: 87.5,
    accentHex: '#3b82f6',
    skills: ['VFX', '3D Design'],
  },
];

export const SKILLSET_FOOTNOTE =
  "Day to day, I'm most at home in Figma, Canva, and Adobe's Photoshop, Illustrator, and InDesign. Lately, I've also been relying on Figma Weavy as my main tool for generating AI assets.";

export interface ClientLogoItem {
  name: string;
  src: string;
  sizeClass: string;
}

/**
 * Clients Maza Sunardi has worked with, optically balanced by aspect ratio
 * for a single-row horizontal marquee bar.
 */
export const CLIENT_LOGOS: ClientLogoItem[] = [
  {
    name: 'High Performance Academy',
    src: '/assets/aistudio/Client_Clip_path_group_437b3b6a.png',
    sizeClass: 'h-7 sm:h-8',
  },
  {
    name: 'Anchor',
    src: '/assets/aistudio/Client_Group_50_8e5692eb.png',
    sizeClass: 'h-6 sm:h-7',
  },
  {
    name: 'Urban Media',
    src: '/assets/aistudio/Client_Group_51_1d6439fb.png',
    sizeClass: 'h-7 sm:h-8',
  },
  {
    name: 'MarketCube.io',
    src: '/assets/aistudio/Client_Group_52_048e7c3c.png',
    sizeClass: 'h-5 sm:h-6',
  },
  {
    name: 'Mero',
    src: '/assets/aistudio/Client_Group_53_df75a706.png',
    sizeClass: 'h-6 sm:h-7',
  },
  {
    name: 'Osmos',
    src: '/assets/aistudio/Client_Group_54_3131311e.png',
    sizeClass: 'h-5 sm:h-6',
  },
  {
    name: 'Phrasing',
    src: '/assets/aistudio/Client_Group_b63cd884.png',
    sizeClass: 'h-5 sm:h-6',
  },
  {
    name: 'Advertical',
    src: '/assets/aistudio/Client_image_13_29ca368c.png',
    sizeClass: 'h-5 sm:h-5',
  },
  {
    name: 'Bellini',
    src: '/assets/aistudio/Client_image_14_b446ab5a.png',
    sizeClass: 'h-6 sm:h-7',
  },
  {
    name: 'Digital Ash Agency',
    src: '/assets/aistudio/Client_image_15_3291cf33.png',
    sizeClass: 'h-5 sm:h-6',
  },
  {
    name: 'Inovexus',
    src: '/assets/aistudio/Client_image_16_29b51143.png',
    sizeClass: 'h-4 sm:h-5',
  },
  {
    name: 'Digital Neighbor',
    src: '/assets/aistudio/Client_image_17_8ed97839.png',
    sizeClass: 'h-7 sm:h-8',
  },
  {
    name: 'SKB Digital',
    src: '/assets/aistudio/Client_image_18_ff131978.png',
    sizeClass: 'h-9 sm:h-10',
  },
  {
    name: 'VAJ Design',
    src: '/assets/aistudio/Client_image_21_667db69a.png',
    sizeClass: 'h-10 sm:h-11',
  },
  {
    name: 'MyScript',
    src: '/assets/aistudio/Client_image-removebg-preview__1__1_f2f74f11.png',
    sizeClass: 'h-7 sm:h-8',
  },
  {
    name: 'Alliance Loire',
    src: '/assets/aistudio/Client_image-removebg-preview__2__1_5813df9e.png',
    sizeClass: 'h-7 sm:h-8',
  },
  {
    name: 'Meilleurtaux.com',
    src: '/assets/aistudio/Client_image-removebg-preview__3__1_aa23826c.png',
    sizeClass: 'h-5 sm:h-6',
  },
  {
    name: 'Ferdinand Berthoud',
    src: '/assets/aistudio/Client_image-removebg-preview_1_dd54dfa8.png',
    sizeClass: 'h-8 sm:h-9',
  },
  {
    name: 'CR Software',
    src: '/assets/aistudio/Client_logo_1_aa0857a6.png',
    sizeClass: 'h-6 sm:h-7',
  },
  {
    name: 'Louis Moinet',
    src: '/assets/aistudio/Client_Rectangle_18_7be9656e.png',
    sizeClass: 'h-10 sm:h-11',
  },
  {
    name: 'Kano',
    src: '/assets/aistudio/Client_Rectangle_33_f169fcba.png',
    sizeClass: 'h-14 sm:h-16',
  },
  {
    name: 'Ludovic Ballouard',
    src: '/assets/aistudio/Client_Rectangle_42_c19b58e1.png',
    sizeClass: 'h-9 sm:h-10',
  },
  {
    name: 'SVR Laboratoire Dermatologique',
    src: '/assets/aistudio/Client_Rectangle_39_d5833683.png',
    sizeClass: 'h-9 sm:h-10',
  },
  {
    name: 'BeKin',
    src: '/assets/aistudio/Client_Vector_54a7b706.png',
    sizeClass: 'h-7 sm:h-8',
  },
  {
    name: 'Proper',
    src: '/assets/aistudio/Client_Group_55_7ebee2c7.png',
    sizeClass: 'h-5 sm:h-6',
  },
];

export const PROFILE_DATA = {
  name: 'Maza Sunardi',
  greeting: 'Greetings!',
  friendlyBio:
    'Hello, I’m Maza. As a visual designer, I treat every branding project like a brief apprenticeship in a brand-new field. I enjoy being the person who brings clarity to a client’s vision, especially when the territory is unfamiliar. These days, you’ll also find me quietly weaving AI into my process to push my visual thinking further.',
  portrait: '/assets/aistudio/Frame_164_05ae49c7.png',
  cvUrl: '/assets/aistudio/CV_3c5a576e.pdf',
  workExperiences: [
    {
      company: 'GROWMODO',
      roleCountLabel: '4 roles',
      roles: [
        { year: '2026', title: 'Design Team Lead' },
        { year: '2025', title: 'Senior Graphic Designer' },
        { year: '2024', title: 'QA Manager' },
        { year: '2023', title: 'Graphic Designer' },
      ],
    },
    {
      company: 'FEAZER',
      roleCountLabel: '1 role',
      roles: [{ year: '2022', title: 'Graphic Designer' }],
    },
    {
      company: 'Rakattan Workshop',
      roleCountLabel: '2 roles',
      roles: [
        { year: '2022', title: 'Junior Graphic Designer' },
        { year: '2021', title: 'Intern Graphic Designer' },
      ],
    },
    {
      company: 'Fraser Residence Sudirman',
      roleCountLabel: '1 role',
      roles: [{ year: '2021', title: 'Intern Sales & Marketing' }],
    },
  ],
  education: [
    {
      year: '2022',
      location: 'Bandung',
      school: 'Telkom University',
      detail: 'Graduated majoring in DKV (Management)',
    },
    {
      year: '2017',
      location: 'Bali',
      school: 'SMK TI Bali Global, Bali',
      detail: 'Graduated from Multimedia Vocational High School of Information Technology',
    },
  ],
  traits: [
    "I'm fluent in English",
    "I'll use design thinking every time I can",
    "I'm open-minded to any topics",
    "I'm an easygoing person",
  ],
  contacts: {
    phone: '+62 8515 620 2580',
    phoneHref: 'tel:+6285156202580',
    email: 'mazasunardi@gmail.com',
    base: 'Kelapa Gading, Jakarta',
    timezone: 'UTC+7 (WIB)',
  },
};

interface ProfilePageProps {
  onNavigate: (page: PageId) => void;
  showGridSpecs?: boolean;
  paletteOffset?: number;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigate,
  showGridSpecs = false,
  paletteOffset = 0,
}) => {
  // Skillset Temperature Slider State (0 = Burning/Left, 100 = Freezing/Right)
  const [sliderPos, setSliderPos] = useState<number>(12.5);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [isThermalActive, setIsThermalActive] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [thermalBurst, setThermalBurst] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<'phone' | 'email' | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleCopyContact = (field: 'phone' | 'email', value: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopiedField(field);
    window.setTimeout(() => {
      setCopiedField((prev) => (prev === field ? null : prev));
    }, 1800);
  };

  // Determine active zone based on continuous slider position (0..100)
  const activeZoneIndex =
    sliderPos < 25 ? 0 : sliderPos < 50 ? 1 : sliderPos < 75 ? 2 : 3;
  const activeZone = SKILLSET_TEMPERATURE_ZONES[activeZoneIndex];
  const isFreezingSide = sliderPos >= 50;

  // Interpolate live temperature readout from 100°C (at 0%) down to -18°C (at 100%)
  const tempCelsius = Math.round(100 - (sliderPos / 100) * 118);
  const tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32);
  const displayTemp =
    tempUnit === 'C' ? `${tempCelsius}°C` : `${tempFahrenheit}°F`;

  const updateSliderFromClientX = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const rawPct = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(0, Math.min(100, rawPct));
    setSliderPos(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    setIsThermalActive(true);
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  // Secondary action on the slider handle/badge: adapts to burning vs freezing
  const handleSecondaryHandleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempUnit((prev) => (prev === 'C' ? 'F' : 'C'));
    setThermalBurst(true);
    setIsThermalActive(true);
    window.setTimeout(() => {
      setThermalBurst(false);
    }, 650);
  };

  // Unified card styling matching the Skillset Temperature card background and border
  const unifiedCardClass =
    '!bg-[#f7f6f2] dark:!bg-[#1c1c1e] !text-[#1c1c1e] dark:!text-[#f7f6f2] border-2 border-[#e5e3dc] dark:border-[#2a2a2e]';

  return (
    <section aria-label="Profile & CV" className="pt-2 pb-4">
      {/* Top Back Navigation */}
      <div className="mb-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 min-h-[44px] px-3.5 rounded-full bg-[#f7f6f2] dark:bg-[#1e1e21] text-xs font-bold text-[#1c1c1e] dark:text-[#f7f6f2] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12 hover:bg-[#1c1c1e]/8 dark:hover:bg-[#f7f6f2]/10 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Profile & CV Bento Grid (Balanced 4-Card Layout) */}
      <BentoGrid>
        {/* 1. FULL-BLEED PORTRAIT & BLURRED BOTTOM BIO TILE (2x2 — Reference Editorial Look) */}
        <Tile
          title=""
          color="surface"
          size="2x2"
          showArrow={false}
          className="!p-0 !border-0 !bg-[#b89f94] min-h-[420px] sm:min-h-[450px]"
          showGridSpecs={showGridSpecs}
          paletteOffset={paletteOffset}
        >
          {/* Full-Bleed Portrait extending across the entire card frame without any bottom bar */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl">
            <img
              src={PROFILE_DATA.portrait}
              alt="Portrait of Maza Sunardi"
              className="w-full h-full object-cover object-top scale-[1.08] origin-top select-none block"
              draggable={false}
            />
            {/* Subtle bottom dark gradient using multiply blend mode at low opacity for comfortable text legibility */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-[55%] mix-blend-multiply bg-[linear-gradient(to_top,rgba(20,20,22,0.48)_0%,rgba(20,20,22,0.24)_52%,transparent_100%)]"
            />
          </div>

          {/* Bottom-Aligned Heading & Friendly Bio Copy Positioned Lower Near the Bottom Edge */}
          <div className="relative z-10 flex-1 w-full h-full flex flex-col justify-end px-6 pt-6 pb-4 sm:px-7 sm:pb-5">
            <div className="mt-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] leading-tight text-[#ffffff] drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
                {PROFILE_DATA.greeting}
              </h2>
              <p className="mt-1.5 text-sm sm:text-[15px] font-medium leading-relaxed text-[#f7f6f2]/95 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
                {PROFILE_DATA.friendlyBio}
              </p>
            </div>
          </div>
        </Tile>

        {/* 2. WORK EXPERIENCES TILE (2x2 — Static Layout with Strong Emphasis on Role Name & Year) */}
        <Tile
          title="Work Experiences"
          titlePosition="top"
          color="surface"
          size="2x2"
          showArrow={false}
          className={unifiedCardClass}
          showGridSpecs={showGridSpecs}
          paletteOffset={0}
        >
          <div className="flex flex-col gap-3 pt-1 h-full">
            {/* Header Summary Strip — All Past Positions */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1c1c1e]/60 dark:text-[#f7f6f2]/60">
                <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Past Positions · Career Timeline</span>
              </span>
              <span className="font-mono text-[11px] font-extrabold tracking-tight px-2 py-0.5 rounded-md bg-[#eceae4] dark:bg-[#242428] text-[#1c1c1e]/80 dark:text-[#f7f6f2]/80">
                2021 — 2026
              </span>
            </div>

            {/* Static 2-Column Layout: GROWMODO (4 roles) on Left, FEAZER / Rakattan Workshop / Fraser Residence on Right */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
              {/* Left Column: GROWMODO (4 Roles) */}
              {PROFILE_DATA.workExperiences.slice(0, 1).map((entry) => (
                <div
                  key={entry.company}
                  className="rounded-2xl bg-[#ffffff] dark:bg-[#242428] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12 p-3.5 flex flex-col justify-between shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10">
                    <span className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#1c1c1e]/55 dark:text-[#f7f6f2]/55">
                      {entry.company}
                    </span>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#eceae4] dark:bg-[#161618] text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70">
                      {entry.roleCountLabel}
                    </span>
                  </div>

                  <ul className="space-y-2 flex-1 flex flex-col justify-around">
                    {entry.roles.map((r) => (
                      <li
                        key={`${entry.company}-${r.year}-${r.title}`}
                        className="flex items-center justify-between gap-2.5 py-1.5 px-2.5 rounded-xl bg-[#f7f6f2] dark:bg-[#1c1c1e] border border-[#1c1c1e]/8 dark:border-[#f7f6f2]/8"
                      >
                        <span className="text-[13px] sm:text-sm font-extrabold tracking-[-0.02em] text-[#1c1c1e] dark:text-[#f7f6f2] leading-tight">
                          {r.title}
                        </span>
                        <span className="font-mono text-xs font-extrabold tabular-nums px-2 py-0.5 rounded-md bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e] shrink-0">
                          {r.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Right Column: FEAZER, Rakattan Workshop, Fraser Residence Sudirman */}
              <div className="flex flex-col justify-between gap-2.5">
                {PROFILE_DATA.workExperiences.slice(1).map((entry) => (
                  <div
                    key={entry.company}
                    className="rounded-2xl bg-[#ffffff] dark:bg-[#242428] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12 p-3 flex flex-col gap-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-[#1c1c1e]/55 dark:text-[#f7f6f2]/55 truncate">
                        {entry.company}
                      </span>
                      <span className="font-mono text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#eceae4] dark:bg-[#161618] text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65 shrink-0">
                        {entry.roleCountLabel}
                      </span>
                    </div>

                    <ul className="space-y-1.5">
                      {entry.roles.map((r) => (
                        <li
                          key={`${entry.company}-${r.year}-${r.title}`}
                          className="flex items-center justify-between gap-2 py-1 px-2.5 rounded-xl bg-[#f7f6f2] dark:bg-[#1c1c1e] border border-[#1c1c1e]/8 dark:border-[#f7f6f2]/8"
                        >
                          <span className="text-[13px] sm:text-sm font-extrabold tracking-[-0.02em] text-[#1c1c1e] dark:text-[#f7f6f2] leading-tight">
                            {r.title}
                          </span>
                          <span className="font-mono text-xs font-extrabold tabular-nums px-2 py-0.5 rounded-md bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e] shrink-0">
                            {r.year}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Tile>

        {/* 3. EDUCATION TILE (2x1 — Unified Skillset Temperature Surface) */}
        <Tile
          title="Education"
          titlePosition="top"
          color="surface"
          size="2x1"
          showArrow={false}
          className={unifiedCardClass}
          showGridSpecs={showGridSpecs}
          paletteOffset={0}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 h-full">
            {PROFILE_DATA.education.map((edu, idx) => (
              <div
                key={edu.school}
                className="group/edu relative rounded-2xl bg-[#ffffff] dark:bg-[#242428] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12 p-4 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1c1c1e]/35 dark:hover:border-[#f7f6f2]/35 shadow-2xs"
              >
                {/* Top Year & City Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e] font-mono text-[11px] font-extrabold tracking-wider uppercase">
                    <span>{edu.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{edu.location}</span>
                  </span>
                  <span className="w-8 h-8 rounded-xl bg-[#eceae4] dark:bg-[#161618] flex items-center justify-center text-[#1c1c1e] dark:text-[#f7f6f2]">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>

                {/* Institution & Major Callout */}
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#1c1c1e]/45 dark:text-[#f7f6f2]/45 mb-0.5">
                    0{idx + 1} · Academic Credential
                  </p>
                  <p className="text-base sm:text-lg font-extrabold tracking-[-0.02em] text-[#1c1c1e] dark:text-[#f7f6f2] leading-tight">
                    {edu.school}
                  </p>
                  <p className="mt-1.5 text-xs sm:text-[13px] font-semibold text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70 leading-snug">
                    {edu.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tile>

        {/* 4. CONTACTS & BASE TILE (2x1 — Unified Skillset Temperature Surface) */}
        <Tile
          title="Contacts & Base"
          titlePosition="top"
          color="surface"
          size="2x1"
          showArrow={false}
          className={unifiedCardClass}
          showGridSpecs={showGridSpecs}
          paletteOffset={0}
        >
          <div className="flex flex-col justify-between gap-2.5 pt-1 h-full">
            {/* Base & Timezone Sub-Card */}
            <div className="rounded-xl bg-[#eceae4]/80 dark:bg-[#161618] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10 px-3.5 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 rounded-lg bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1c1c1e]/55 dark:text-[#f7f6f2]/55">
                    Base Studio
                  </p>
                  <p className="text-xs sm:text-sm font-extrabold text-[#1c1c1e] dark:text-[#f7f6f2] truncate">
                    {PROFILE_DATA.contacts.base}
                  </p>
                </div>
              </div>
              <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#ffffff] dark:bg-[#242428] text-[#1c1c1e]/80 dark:text-[#f7f6f2]/80 border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10 shrink-0">
                {PROFILE_DATA.contacts.timezone}
              </span>
            </div>

            {/* Interactive Copy-to-Clipboard Phone & Email Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Phone Action Tile */}
              <div className="rounded-xl bg-[#ffffff] dark:bg-[#242428] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12 p-3 flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-[#eceae4] dark:bg-[#161618] text-[#1c1c1e] dark:text-[#f7f6f2] flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1c1c1e]/55 dark:text-[#f7f6f2]/55">
                      Phone / WhatsApp
                    </p>
                    <a
                      href={PROFILE_DATA.contacts.phoneHref}
                      className="text-xs sm:text-[13px] font-extrabold text-[#1c1c1e] dark:text-[#f7f6f2] hover:underline truncate block"
                    >
                      {PROFILE_DATA.contacts.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyContact('phone', PROFILE_DATA.contacts.phone)}
                  title="Copy phone number"
                  className="shrink-0 inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#eceae4] dark:bg-[#161618] hover:bg-[#1c1c1e] hover:text-[#f7f6f2] dark:hover:bg-[#f7f6f2] dark:hover:text-[#1c1c1e] text-[11px] font-mono font-bold transition-colors cursor-pointer"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3 h-3" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Email Action Tile */}
              <div className="rounded-xl bg-[#ffffff] dark:bg-[#242428] border border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12 p-3 flex items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-[#eceae4] dark:bg-[#161618] text-[#1c1c1e] dark:text-[#f7f6f2] flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1c1c1e]/55 dark:text-[#f7f6f2]/55">
                      Direct Mail
                    </p>
                    <a
                      href={`mailto:${PROFILE_DATA.contacts.email}`}
                      className="text-xs sm:text-[13px] font-extrabold text-[#1c1c1e] dark:text-[#f7f6f2] hover:underline truncate block"
                    >
                      {PROFILE_DATA.contacts.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyContact('email', PROFILE_DATA.contacts.email)}
                  title="Copy email address"
                  className="shrink-0 inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[#eceae4] dark:bg-[#161618] hover:bg-[#1c1c1e] hover:text-[#f7f6f2] dark:hover:bg-[#f7f6f2] dark:hover:text-[#1c1c1e] text-[11px] font-mono font-bold transition-colors cursor-pointer"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3 h-3" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Full-Width High-Contrast Download CV Bar */}
            <a
              href={PROFILE_DATA.cvUrl}
              download="Maza_Sunardi_CV.pdf"
              className="w-full inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2.5 rounded-xl bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e] text-xs font-extrabold tracking-tight hover:opacity-90 transition-opacity shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Download Full Curriculum Vitae (PDF)</span>
            </a>
          </div>
        </Tile>
      </BentoGrid>

      {/* Single-Row Horizontally Scrolling Client Logo Bar with Smooth Fade at Both Ends */}
      <div
        aria-label="Clients I have worked with"
        className="mt-2.5 rounded-xl bg-[#f7f6f2] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/15 px-5 py-4 sm:px-6 sm:py-5 shadow-xs overflow-hidden"
      >
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <span className="text-xs font-bold tracking-tight text-[#1c1c1e]/75">
            Clients I&apos;ve Worked With
          </span>
        </div>

        {/* Marquee Viewport with Edge Fade on Both Ends */}
        <div className="client-marquee-wrapper client-marquee-mask relative w-full overflow-hidden">
          <div className="animate-client-marquee items-center">
            {[0, 1].map((trackIdx) => (
              <div
                key={trackIdx}
                aria-hidden={trackIdx === 1}
                className="flex items-center shrink-0 flex-nowrap gap-10 sm:gap-14 pr-10 sm:pr-14"
              >
                {CLIENT_LOGOS.map((client) => (
                  <div
                    key={`${trackIdx}-${client.name}`}
                    className="shrink-0 flex items-center justify-center h-14 px-1 opacity-85 hover:opacity-100 transition-opacity duration-200"
                    title={client.name}
                  >
                    <img
                      src={client.src}
                      alt={trackIdx === 0 ? client.name : ''}
                      loading="lazy"
                      draggable={false}
                      className={`${client.sizeClass} w-auto max-w-[160px] object-contain mix-blend-multiply select-none`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Skillset Temperature Card (Below Clients I've Worked With) */}
      <div
        aria-label="Skillset Temperature"
        onMouseEnter={() => setIsThermalActive(true)}
        onMouseLeave={() => {
          if (!isDragging) setIsThermalActive(false);
        }}
        className="mt-2.5 rounded-[28px] bg-[#f7f6f2] dark:bg-[#1c1c1e] border-2 border-[#e5e3dc] dark:border-[#2a2a2e] p-5 sm:p-7 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {/* Top Row: Title & Active Zone Readout */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-12 sm:mb-14">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[-0.03em] text-[#1c1c1e] dark:text-[#f7f6f2]">
              skillset temperature
            </h2>
            <p className="mt-1 text-xs font-medium text-[#1c1c1e]/60 dark:text-[#f7f6f2]/60">
              Slide across the spectrum to inspect proficiency zones — click the floating handle badge to toggle °C / °F thermal mode.
            </p>
          </div>

          {/* Quick Zone Jump Segmented Indicator */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {SKILLSET_TEMPERATURE_ZONES.map((zone, idx) => {
              const isZoneActive = idx === activeZoneIndex;
              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => {
                    setSliderPos(zone.center);
                    setIsThermalActive(true);
                  }}
                  style={
                    isZoneActive && isThermalActive
                      ? { backgroundColor: zone.accentHex, color: '#f7f6f2' }
                      : undefined
                  }
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                    isZoneActive
                      ? 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e] shadow-xs'
                      : 'bg-[#e5e3dc]/70 dark:bg-[#28282c] text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65 hover:text-[#1c1c1e] dark:hover:text-[#f7f6f2]'
                  }`}
                >
                  {zone.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horizontal Temperature Slider Track & Adaptive Handle */}
        <div className="relative pt-2 pb-4 select-none">
          {/* Accessible Hidden Range Input for Keyboard Navigation */}
          <input
            type="range"
            min={0}
            max={100}
            step={0.5}
            value={sliderPos}
            aria-label="Skillset temperature slider from burning mastery to freezing learning"
            onFocus={() => setIsThermalActive(true)}
            onBlur={() => setIsThermalActive(false)}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="sr-only"
          />

          {/* Interactive Pointer Track with Smooth Monochrome <-> Color Layer Crossfade */}
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative h-12 sm:h-14 w-full rounded-xl cursor-ew-resize touch-none shadow-inner flex items-center justify-between px-4 sm:px-6 overflow-visible"
          >
            {/* Base Monochrome Layer (Always present beneath) */}
            <div
              aria-hidden="true"
              style={{
                background:
                  'linear-gradient(90deg, #1c1c1e 0%, #3a3a3f 50%, #787880 100%)',
              }}
              className="pointer-events-none absolute inset-0 rounded-xl"
            />

            {/* Thermal Color Overlay Layer (Smoothly crossfades in on hover and out on mouse leave) */}
            <div
              aria-hidden="true"
              style={{
                background:
                  'linear-gradient(90deg, #ef5a5a 0%, #c86496 36%, #7e74d2 68%, #3b82f6 100%)',
              }}
              className={`pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isThermalActive ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Left Anchor Label inside Track */}
            <span className="relative z-10 text-xs sm:text-base font-bold tracking-tight text-[#f7f6f2] pointer-events-none drop-shadow-xs">
              i deffinitely can
            </span>

            {/* Subtle Zone Tick Dividers at 25%, 50%, 75% */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[2] flex justify-between px-[25%]"
            >
              <span className="h-full w-px bg-[#f7f6f2]/15" />
              <span className="h-full w-px bg-[#f7f6f2]/15" />
              <span className="h-full w-px bg-[#f7f6f2]/15" />
            </div>

            {/* Right Anchor Label inside Track */}
            <span className="relative z-10 text-xs sm:text-base font-bold tracking-tight text-[#f7f6f2] pointer-events-none text-right drop-shadow-xs">
              i think i could learn but it’ll take time
            </span>

            {/* Draggable Slider Handle + Adaptive Floating Temperature Badge */}
            <div
              style={{
                left: `clamp(24px, ${sliderPos}%, calc(100% - 24px))`,
              }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
            >
              {/* Secondary Action Floating Temperature Badge above Handle */}
              <button
                type="button"
                onClick={handleSecondaryHandleAction}
                onPointerDown={(e) => e.stopPropagation()}
                title="Click to toggle °C / °F and trigger thermal pulse"
                style={
                  isThermalActive
                    ? {
                        borderColor: activeZone.accentHex,
                      }
                    : undefined
                }
                className={`group -mt-16 mb-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e] border-2 border-[#f7f6f2]/30 dark:border-[#1c1c1e]/25 shadow-md whitespace-nowrap cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 active:scale-95 ${
                  thermalBurst ? 'scale-110 ring-4 ring-current/20' : ''
                }`}
              >
                {isFreezingSide ? (
                  <Snowflake
                    className={`w-3.5 h-3.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isThermalActive ? 'text-[#3b82f6] rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  />
                ) : (
                  <Flame
                    className={`w-3.5 h-3.5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isThermalActive ? 'text-[#ef5a5a] scale-110' : ''
                    }`}
                    aria-hidden="true"
                  />
                )}
                <span className="font-mono text-xs font-extrabold tabular-nums">
                  {displayTemp}
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
                  · {activeZone.statusTag}
                </span>
              </button>

              {/* Physical Slider Handle Grip */}
              <div
                style={
                  isThermalActive
                    ? {
                        borderColor: activeZone.accentHex,
                        boxShadow: `0 0 0 4px ${activeZone.accentHex}33`,
                      }
                    : undefined
                }
                className={`w-8 h-14 sm:w-9 sm:h-16 rounded-xl bg-[#f7f6f2] dark:bg-[#1c1c1e] border-[3px] border-[#1c1c1e] dark:border-[#f7f6f2] shadow-lg flex flex-col items-center justify-center gap-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isDragging ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                {isFreezingSide ? (
                  <Snowflake
                    className="w-4 h-4 text-[#1c1c1e] dark:text-[#f7f6f2] transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={
                      isThermalActive ? { color: activeZone.accentHex } : undefined
                    }
                    aria-hidden="true"
                  />
                ) : (
                  <Flame
                    className="w-4 h-4 text-[#1c1c1e] dark:text-[#f7f6f2] transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={
                      isThermalActive ? { color: activeZone.accentHex } : undefined
                    }
                    aria-hidden="true"
                  />
                )}
                <div className="flex gap-0.5" aria-hidden="true">
                  <span className="w-0.5 h-2.5 rounded-full bg-[#1c1c1e]/35 dark:bg-[#f7f6f2]/35" />
                  <span className="w-0.5 h-2.5 rounded-full bg-[#1c1c1e]/35 dark:bg-[#f7f6f2]/35" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Skillset Matrix (Hot, Heatin', Cool, Freezin') */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {SKILLSET_TEMPERATURE_ZONES.map((zone, idx) => {
            const isActive = idx === activeZoneIndex;

            return (
              <div
                key={zone.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSliderPos(zone.center);
                  setIsThermalActive(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSliderPos(zone.center);
                    setIsThermalActive(true);
                  }
                }}
                style={
                  isActive && isThermalActive
                    ? {
                        borderColor: zone.accentHex,
                      }
                    : undefined
                }
                className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer text-left border-2 ${
                  isActive
                    ? 'bg-[#ffffff] dark:bg-[#242428] border-[#1c1c1e] dark:border-[#f7f6f2] shadow-sm -translate-y-0.5'
                    : 'bg-[#eceae4]/60 dark:bg-[#161618]/70 border-transparent opacity-55 hover:opacity-85'
                }`}
              >
                {/* Top Thermal Accent Bar */}
                <div
                  style={
                    isActive && isThermalActive
                      ? { backgroundColor: zone.accentHex }
                      : undefined
                  }
                  className={`h-1 w-10 rounded-full mb-3 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'bg-[#1c1c1e] dark:bg-[#f7f6f2]'
                      : 'bg-[#1c1c1e]/20 dark:bg-[#f7f6f2]/20'
                  }`}
                />

                {/* Column Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3
                    style={
                      isActive && isThermalActive
                        ? { color: zone.accentHex }
                        : undefined
                    }
                    className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] text-[#1c1c1e] dark:text-[#f7f6f2] transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    {zone.label}
                  </h3>
                </div>

                {/* Skill List Items */}
                <ul className="space-y-2">
                  {zone.skills.map((skill) => (
                    <li
                      key={skill}
                      className={`text-sm sm:text-[15px] leading-snug transition-all duration-500 flex items-center gap-2 ${
                        isActive
                          ? 'font-bold text-[#1c1c1e] dark:text-[#f7f6f2]'
                          : 'font-medium text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70'
                      }`}
                    >
                      <span
                        style={
                          isActive && isThermalActive
                            ? { backgroundColor: zone.accentHex }
                            : undefined
                        }
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? 'bg-[#1c1c1e] dark:bg-[#f7f6f2] scale-110'
                            : 'bg-[#1c1c1e]/25 dark:bg-[#f7f6f2]/25'
                        }`}
                      />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Footnote from Reference PDF */}
        <p className="mt-6 pt-4 border-t border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10 text-xs sm:text-sm font-semibold leading-relaxed text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70 max-w-3xl">
          {SKILLSET_FOOTNOTE}
        </p>
      </div>
    </section>
  );
};


/**
 * SocialAdsPage Component
 * Inner page for Category 3: Social Ads & Marketing Design.
 *
 * Layout & Behavior:
 * - Organizes social ad creatives per client folder (one 1:1 thumbnail per client).
 * - Displays client thumbnails in a 3-column grid (3 thumbnails per row on desktop, all 1:1 square aspect ratio).
 * - Clicking a client thumbnail opens a snappy interactive gallery modal:
 *   - Top main stage showcasing one active social ad creative with spring-physics cycling & shuffle motion.
 *   - Interactive thumbnail strip & grid below the showcased image to cycle through all social ads for that client.
 *   - Disregards raw image filenames and labels everything cleanly by client folder name.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Shuffle,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PageId, ProjectTileData } from '../types/portfolio';

export interface SocialClientGroup {
  id: string;
  client: string;
  category: string;
  year: string;
  description: string;
  coverImage: string;
  images: string[];
}

/**
 * Client-grouped Social Ads dataset.
 * Each entry corresponds to one client folder from Google Drive.
 * Raw file names are disregarded; creatives are grouped strictly by client name.
 */
export const SOCIAL_CLIENT_GROUPS: SocialClientGroup[] = [
  {
    id: 'crawler',
    client: 'Crawler',
    category: 'Nightlife & Social Discovery App',
    year: '2026',
    description:
      'High-contrast 1:1 paid social ad creatives and Instagram campaign series engineered for nightlife discovery.',
    coverImage: '/assets/aistudio/Instagram_post_-_1_259122a7.png',
    images: [
      '/assets/aistudio/Instagram_post_-_1_259122a7.png',
      '/assets/aistudio/Instagram_post_-_2_7d351646.png',
      '/assets/aistudio/Instagram_post_-_3_aa32a8b7.png',
      '/assets/aistudio/Instagram_post_-_4_e6197342.png',
      '/assets/aistudio/Instagram_post_-_5_63cc2b0c.png',
      '/assets/aistudio/Instagram_post_-_6_e240404c.png',
      '/assets/aistudio/Instagram_post_-_7_7a5b5c4f.png',
      '/assets/aistudio/Instagram_post_-_8_d73b6580.png',
      '/assets/aistudio/Instagram_post_-_9_b42f25c6.png',
      '/assets/aistudio/Instagram_post_-_10_c8bca9c9.png',
      '/assets/aistudio/Instagram_post_-_11_ad81245a.png',
      '/assets/aistudio/Instagram_post_-_12_988e3155.png',
      '/assets/aistudio/Instagram_post_-_13_2bec6624.png',
      '/assets/aistudio/Instagram_post_-_14_5c242f83.png',
      '/assets/aistudio/Instagram_post_-_15_2f2ec7fb.png',
      '/assets/aistudio/Ad_Creatives_-_Post_1_-_V1_10cf6a3b.png',
      '/assets/aistudio/Ad_Creatives_-_Post_1_-_V2_3a5cc5d2.png',
      '/assets/aistudio/Ad_Creatives_-_Post_1_-_V3_88982ce6.png',
      '/assets/aistudio/Ad_Creatives_-_Post_2_-_V1_4b3a3bf3.png',
      '/assets/aistudio/Ad_Creatives_-_Post_2_-_V2_-_A_cd981cb8.png',
      '/assets/aistudio/Ad_Creatives_-_Post_2_-_V2_-_B_d779582c.png',
      '/assets/aistudio/Ad_Creatives_-_Post_2_-_V2_-_C_a036d6d2.png',
      '/assets/aistudio/Ad_Creatives_-_Post_3_-_V1_c2f45934.png',
      '/assets/aistudio/Ad_Creatives_-_Post_4_-_V1_d9987997.png',
      '/assets/aistudio/Ad_Creatives_-_Post_5_-_V1_9442fadf.png',
      '/assets/aistudio/Ad_Creatives_-_Post_5_-_V2_d721545b.png',
      '/assets/aistudio/Ad_Creatives_-_Post_6_-_V1_871b6e53.png',
      '/assets/aistudio/Ad_Creatives_-_Post_6_-_V2_0c3a42a8.png',
      '/assets/aistudio/Ad_Creatives_-_Post_7_-_V1_c6e79fee.png',
      '/assets/aistudio/Ad_Creatives_-_Post_8_-_V1_68096c5f.png',
      '/assets/aistudio/Ad_Creatives_-_Post_8_-_V2_4a6065b9.png',
      '/assets/aistudio/Ad_Creatives_-_Post_8_-_V3_7ec5527b.png',
    ],
  },
  {
    id: '3rd-may',
    client: '3rd May',
    category: 'Menswear & Swiss Cotton Essentials',
    year: '2026',
    description:
      'Minimalist 4:5 product-aware and solution-aware static social ad creatives showcasing the Swiss Cotton collection.',
    coverImage:
      '/assets/aistudio/3rd_May_MA_26-36_Product_Aware_Static-LOW_Swiss_Cotton_Shirt_Produktu_bersicht_Swiss_Cotton_Reihe_C1_1080x1350_83ffde8e.png',
    images: [
      '/assets/aistudio/3rd_May_MA_26-36_Product_Aware_Static-LOW_Swiss_Cotton_Shirt_Produktu_bersicht_Swiss_Cotton_Reihe_C1_1080x1350_83ffde8e.png',
      '/assets/aistudio/3rd_May_MA_26-36_Product_Aware_Static-LOW_Swiss_Cotton_Shirt_Produktu_bersicht_Swiss_Cotton_Reihe_C2_1080x1350_71ac58bb.png',
      '/assets/aistudio/3rd_May_MA_26-36_Product_Aware_Static-LOW_Swiss_Cotton_Shirt_Produktu_bersicht_Swiss_Cotton_Reihe_C3_1080x1350_027902a1.png',
      '/assets/aistudio/3rd_May_MA_26-36_Solution_Aware_Static-LOW_Swiss_Cotton_Shirt_Essential_der_Saison_01_1080x1350_049bc5ed.png',
      '/assets/aistudio/3rd_May_MA_26-36_Solution_Aware_Static-LOW_Swiss_Cotton_Shirt_Essential_der_Saison_02_1080x1350_0739c253.png',
      '/assets/aistudio/3rd_May_MA_26-36_Solution_Aware_Static-LOW_Swiss_Cotton_Shirt_Essential_der_Saison_03_1080x1350_fe1fd99d.png',
      '/assets/aistudio/3rd_May_MA_26-36_Solution_Aware_Static-LOW_Swiss_Cotton_Shirt_Essential_der_Saison_04_1080x1350_367455e8.png',
      '/assets/aistudio/3rd_May_MA_26-36_Solution_Aware_Static-LOW_Swiss_Cotton_Shirt_Essential_der_Saison_05_1080x1350_ab3deafd.png',
    ],
  },
  {
    id: 'emmi-dent',
    client: 'Emmi-Dent',
    category: 'Ultrasonic Oral Care & Dental Hygiene',
    year: '2026',
    description:
      'High-conversion 4:5, 9:16, and 1:1 performance ad creatives covering travel UV kits, dentist recommendations, and ultrasonic tooth care.',
    coverImage: '/assets/aistudio/Emmi_Dent_Travel_Fokus_C3_1080x1350_add77653.png',
    images: [
      '/assets/aistudio/Emmi_Dent_Travel_Fokus_C3_1080x1350_add77653.png',
      '/assets/aistudio/Emmi_Dent_Travel_Fokus_C1_1080x1350_8a7c5668.png',
      '/assets/aistudio/Emmi_Dent_Travel_Fokus_C1_1080x1350_copy_c41405a7.png',
      '/assets/aistudio/Emmi_Dent_Travel_Fokus_C2_1080x1920_88361185.png',
      '/assets/aistudio/Emmi_Dent_AngleTest_V3_1080x1350_b4834e24.png',
      '/assets/aistudio/Emmi_Dent_ED-36-26_C1_V1a_1080x1350_7e01a891.png',
      '/assets/aistudio/Emmi_Dent_ED-36-26_C1_V2b_1080x1350_fbc848c9.png',
      '/assets/aistudio/Emmi_Dent_ED-36-26_C1_V3c_1080x1350_814c8775.png',
      '/assets/aistudio/Emmi_Dent_ED-36-26_C2_V3_1080x1080_3206a50a.png',
      '/assets/aistudio/Emmi_Dent_ED_26-25_Static_Slim_Ultraschall_News_Format_C1_V1_1080x1350_cb7cd1d9.png',
      '/assets/aistudio/Emmi_Dent_ED_26-25_Static_Slim_Ultraschall_News_Format_C2_V2_1080x1350_bb06ac84.png',
      '/assets/aistudio/Emmi_Dent_ED_26-29_Static_Zahna_rztin_Su_meyye_Zahnfleischbluten_C1_V1_1080x1350_4082d58e.png',
      '/assets/aistudio/Emmi_Dent_ED_26-29_Static_Zahna_rztin_Su_meyye_Zahnfleischbluten_C2_V2_1080x1350_186f67f1.png',
      '/assets/aistudio/Emmi_Dent_ED-23-26_static_doc_c1_v1_1080x1350_d738c242.png',
      '/assets/aistudio/Emmi_Dent_ED-23-26_static_doc_c2_v2_1080x1350_53283072.png',
      '/assets/aistudio/Emmi_Dent_ED-19-26_Static_Slim_WZS_Entzu_ndetes_Zahnfleisch_C1-V1_4_5_v1_f1c558b3.png',
      '/assets/aistudio/Emmi_Dent_ED-19-26_Static_Slim_WZS_Entzu_ndetes_Zahnfleisch_C2-V1A_4_5_v1_efeef2da.png',
    ],
  },
  {
    id: 'emmi-pet',
    client: 'Emmi-Pet',
    category: 'Ultrasonic Pet Dental Care & Orthopedic Dog Beds',
    year: '2026',
    description:
      '4:5 performance social ad creatives covering emmi®PET NEO ultrasonic pet tooth care, veterinarian warnings, and emmi®PET CHAI orthopedic memory-foam dog beds.',
    coverImage:
      '/assets/aistudio/Emmi_Pet_EP_26-36_Solution_Aware_Static-LOW_Chai_Hundebett_Preiskommunikation___orthopa_disches_Hundebett_fu_r_die_Gelenke_V1_1080x1350_7589905b.png',
    images: [
      '/assets/aistudio/Emmi_Pet_Static_Briefing_fu_r_EP_26-38_Problem_Aware_Static-LOW_Chai_Hundebett_Us_vs_Them_V1_1080x1350_631ca587.png',
      '/assets/aistudio/Emmi_Pet_EP_26-36_Solution_Aware_Static-LOW_Chai_Hundebett_Preiskommunikation___orthopa_disches_Hundebett_fu_r_die_Gelenke_V1_1080x1350_7589905b.png',
      '/assets/aistudio/Emmi_Pet_EP_26-36_Solution_Aware_Static-LOW_Chai_Hundebett_Preiskommunikation___orthopa_disches_Hundebett_fu_r_die_Gelenke_V2_1080x1350_d8532590.png',
      '/assets/aistudio/Emmi_Pet_EP_26-36_Solution_Aware_Static-LOW_Chai_Hundebett_Preiskommunikation___orthopa_disches_Hundebett_fu_r_die_Gelenke_V3_1080x1350_32153fc1.png',
      '/assets/aistudio/Emmi_Pet_EP_26-36_Solution_Aware_Static-LOW_Chai_Hundebett_Preiskommunikation___orthopa_disches_Hundebett_fu_r_die_Gelenke_V4_1080x1350_3aa0b7ef.png',
      '/assets/aistudio/Emmi_Pet_EP-32-26_V1_1080x1350_ebbbb16f.png',
      '/assets/aistudio/Emmi_Pet_EP-30-26_General-Information_fu_r_Story-Format_Ads_V1_1080x1350_b428e560.png',
      '/assets/aistudio/Emmi_Pet_EP_26-29_TOF_Static_NEO_Experten-Tipp_C1_V1_1080x1350_28d5dfd7.png',
      '/assets/aistudio/Emmi_Pet_EP_26-29_TOF_Static_NEO_Experten-Tipp_C2_V2_1080x1350_7b910e7e.png',
      '/assets/aistudio/Emmi_Pet_EP-19-Lower_Funnel_Static-1___EP_26-19_Static_Neo_Zahnstein_Iteration_1080x1350_C1-V1_d4d64060.png',
      '/assets/aistudio/Emmi_Pet_EP-19-Lower_Funnel_Static-1___EP_26-19_Static_Neo_Zahnstein_Iteration_1080x1350_C2-V1_d098b0d3.png',
      '/assets/aistudio/Emmi_Pet_EP_26-28_Static_NEO_Iteration_BP_C1_V1_1080x1350_33ce07a3.png',
      '/assets/aistudio/Emmi_Pet_EP_26-28_Static_NEO_Iteration_BP_C2_V2_1080x1350_8eaa36ab.png',
      '/assets/aistudio/Emmi_Pet_EP_26-28_Static_NEO_Iteration_BP_C3_V3_1080x1350_0343404e.png',
      '/assets/aistudio/Emmi_Pet_EP_26-37_Problem_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Problem_Image_V1_1080x1350_f249cfeb.png',
      '/assets/aistudio/Emmi_Pet_EP_26-37_Problem_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Problem_Image_V2_1080x1350_93c5a285.png',
      '/assets/aistudio/Emmi_Pet_EP_26-37_Problem_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Problem_Image_V3_1080x1350_dc40b872.png',
      '/assets/aistudio/Emmi_Pet_EP_26-37_Problem_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Problem_Image_V4_1080x1350_63241824.png',
      '/assets/aistudio/Emmi_Pet_EP_26-37_Problem_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Problem_Image_V5_1080x1350_6050964c.png',
      '/assets/aistudio/Emmi_Pet_Static_Briefing_fu_r_EP_26-39_Solution_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Tierarzt_Warnung__Narkose_Risiko_V1_1080x1350_7c26f566.png',
      '/assets/aistudio/Emmi_Pet_Static_Briefing_fu_r_EP_26-39_Solution_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Tierarzt_Warnung__Narkose_Risiko_V2_1080x1350_d7de2bc7.png',
      '/assets/aistudio/Emmi_Pet_Static_Briefing_fu_r_EP_26-39_Solution_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Tierarzt_Warnung__Narkose_Risiko_V3_1080x1350_a71e4344.png',
      '/assets/aistudio/Emmi_Pet_Static_Briefing_fu_r_EP_26-39_Solution_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Tierarzt_Warnung__Narkose_Risiko_V4_1080x1350_fc078a36.png',
      '/assets/aistudio/Emmi_Pet_Static_Briefing_fu_r_EP_26-39_Solution_Aware_Static-LOW_emmi_PET_NEO_All-In-1-Set_Tierarzt_Warnung__Narkose_Risiko_V5_1080x1350_81e13580.png',
    ],
  },
  {
    id: 'fightr',
    client: 'FIGHTR',
    category: 'Boxing & Combat Sports Equipment',
    year: '2026',
    description:
      'High-impact 4:5 performance social ad creatives for FIGHTR® punching bag bundles, us-vs-them comparisons, and home boxing challenge campaigns.',
    coverImage:
      '/assets/aistudio/Fightr_FR_26-30_TOF_Static-Headline_Boxsack_schlag_die_Kilos_K.O._V1_1080x1350_da53a67d.png',
    images: [
      '/assets/aistudio/Fightr_FR_26-30_TOF_Static-Headline_Boxsack_schlag_die_Kilos_K.O._V1_1080x1350_da53a67d.png',
      '/assets/aistudio/Fightr_FR_26-30_TOF_Static-Headline_Boxsack_5_Benefits_V1_1080x1350_eee723df.png',
      '/assets/aistudio/Fightr_FR_26-30_TOF_Static-Headline_Boxsack_mehrere_Vorteile_V1_1080x1350_71176414.png',
      '/assets/aistudio/Fightr_Static_Briefing_fu_r_FR_26-39_Solution_Aware_Static-LOW_Boxsack_Bundle_4_Wochen_Box_Challenge_V1_1080x1350_601db48f.png',
      '/assets/aistudio/Fightr_Static_Briefing_fu_r_FR_26-39_Solution_Aware_Static-LOW_Boxsack_Bundle_Us._vs_Them__GYM___Boxsack_V1_1080x1350_306a9408.png',
      '/assets/aistudio/Fightr_Static_Briefing_fu_r_FR_26-39_Product_Aware_Static-LOW_Boxsack_Bundle_kauf_NICHT_diesen_Boxsack_V2_1080x1350_66eda35f.png',
    ],
  },
  {
    id: 'miiki',
    client: 'Miiki',
    category: 'LED Light Therapy & K-Beauty Skincare',
    year: '2026',
    description:
      '4:5 performance social ad creatives covering the miiki LED Face Mask, Black Week offers, PDRN Prestige skincare sets, and K-Beauty routine launches.',
    coverImage:
      '/assets/aistudio/Miiki_MK_26-40_Most_Aware_Static-LOW_LED_Facemask_40__BF_Offer_V1_1080x1350_97a56487.png',
    images: [
      '/assets/aistudio/Miiki_MK_26-40_Most_Aware_Static-LOW_LED_Facemask_40__BF_Offer_V1_1080x1350_97a56487.png',
      '/assets/aistudio/Miiki_Static_Briefing_fu_r_MK_26-38_Product_Aware_Static-LOW_LED_Facemask_Us_vs_Them_V1_1080x1350_3a17fd73.png',
      '/assets/aistudio/Miiki_MK_26-40_Most_Aware_Static-LOW_LED_Facemask_40__BF__Portable_Face_Mask_V1_1080x1350_73e05b66.png',
      '/assets/aistudio/Miiki_MK_26-40_Product_Aware_Static-LOW_LED_Facemask_40__BF__Premium_Produkt___USPs_V1_alt_1080x1350_8fdd804b.png',
      '/assets/aistudio/Miiki_MK_26-40_Most_Aware_Static-LOW_LED_Facemask_40__BF__Easy_Use_Skincare_V1_1080x1350_2938bc4f.png',
      '/assets/aistudio/Miiki_MK_26-40_Product_Aware_Static-LOW_LED_Facemask_40__BF__Premium_Produkt___USPs_V1_1080x1350_ee7edc05.png',
      '/assets/aistudio/Miiki_Static_Briefing_fu_r_MK_26-38_Product_Aware_Static-LOW_LED_Facemask_Upgrade_fu_r_deine_Haut_V1_1080x1350_11f98d9c.png',
      '/assets/aistudio/Miiki_Static_Briefing_fu_r_MK_26-38_Solution_Aware_Static-LOW_PDRN_Travel_Size_Creme_statt_Botox_Behandlung_V1_1080x1350_3056f0f6.png',
      '/assets/aistudio/Miiki_Static_Briefing_fu_r_MK_26-38_Solution_Aware_Static-LOW_PDRN_Prestige_Set_V1_1080x1350_c06d85c1.png',
      '/assets/aistudio/Miiki_MK_26-35_TOF_Static_100_MPS_Launch___Offer_C2_V1_1080x1350_6a9a886b.png',
      '/assets/aistudio/Miiki_MK_26-35_TOF_Static_PPS_Launch___Offer_C1_V1_1080x1350_3f94e450.png',
    ],
  },
];

interface SocialAdsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject?: (project: ProjectTileData) => void;
  showGridSpecs?: boolean;
  paletteOffset?: number;
}

export const SocialAdsPage: React.FC<SocialAdsPageProps> = ({ onNavigate }) => {
  const [selectedClient, setSelectedClient] = useState<SocialClientGroup | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [motionDirection, setMotionDirection] = useState<number>(1);
  const [isShuffleMotion, setIsShuffleMotion] = useState<boolean>(false);
  const [displayOrder, setDisplayOrder] = useState<number[]>([]);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Initialize display order whenever a client folder is opened
  const openClientGallery = (clientGroup: SocialClientGroup) => {
    setSelectedClient(clientGroup);
    setActiveIndex(0);
    setMotionDirection(1);
    setIsShuffleMotion(false);
    setDisplayOrder(clientGroup.images.map((_, idx) => idx));
  };

  const closeClientGallery = useCallback(() => {
    setSelectedClient(null);
  }, []);

  const totalImages = selectedClient ? displayOrder.length : 0;

  const handleSelectPosition = useCallback(
    (nextPos: number) => {
      if (!selectedClient || nextPos === activeIndex) return;
      setIsShuffleMotion(false);
      setMotionDirection(nextPos > activeIndex ? 1 : -1);
      setActiveIndex(nextPos);
    },
    [selectedClient, activeIndex]
  );

  const handleNext = useCallback(() => {
    if (!totalImages) return;
    setIsShuffleMotion(false);
    setMotionDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const handlePrev = useCallback(() => {
    if (!totalImages) return;
    setIsShuffleMotion(false);
    setMotionDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const handleShuffle = useCallback(() => {
    if (!selectedClient || selectedClient.images.length <= 1) return;
    setIsShuffleMotion(true);
    setMotionDirection(Math.random() > 0.5 ? 1 : -1);

    // Fisher-Yates shuffle of the thumbnail list order + jump to first shuffled item
    setDisplayOrder((prevOrder) => {
      const copy = [...prevOrder];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      // Ensure the new showcased image is different from the current one
      if (copy[0] === prevOrder[activeIndex] && copy.length > 1) {
        [copy[0], copy[1]] = [copy[1], copy[0]];
      }
      return copy;
    });
    setActiveIndex(0);
  }, [selectedClient, activeIndex]);

  // Keep active thumbnail centered in the lower list strip
  useEffect(() => {
    const activeBtn = thumbnailRefs.current[activeIndex];
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeIndex, displayOrder]);

  // Keyboard navigation inside modal (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (!selectedClient) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeClientGallery();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedClient, closeClientGallery, handleNext, handlePrev]);

  const currentImageIndex = selectedClient ? displayOrder[activeIndex] ?? 0 : 0;
  const currentImageSrc = selectedClient ? selectedClient.images[currentImageIndex] : '';

  return (
    <section aria-labelledby="social-page-title" className="pt-2 pb-4">
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
              id="social-page-title"
              className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] leading-none text-[#1c1c1e] dark:text-[#f7f6f2] text-balance"
            >
              Ad Creatives
            </h1>
          </div>
          <span className="text-xs font-semibold tabular-nums text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65">
            1:1 Client Thumbnails · Click any client to inspect ads
          </span>
        </div>
      </div>

      {/* 3-Column Grid of 1:1 Aspect-Ratio Client Thumbnails (3 per row on desktop) */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5"
        role="list"
        aria-label="Ad Creatives client folders"
      >
        {SOCIAL_CLIENT_GROUPS.map((clientGroup) => (
          <button
            key={clientGroup.id}
            type="button"
            role="listitem"
            onClick={() => openClientGallery(clientGroup)}
            aria-label={`Inspect ${clientGroup.client} ad creatives (${clientGroup.images.length} creatives)`}
            className="group relative aspect-square w-full rounded-xl overflow-hidden bg-transparent text-[#f7f6f2] border-0 p-5 sm:p-6 flex flex-col justify-between text-left cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_18px_36px_-12px_rgba(0,0,0,0.28)] dark:hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]"
          >
            {/* Full-bleed 1:1 Client Cover Thumbnail */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-xl">
              <img
                src={clientGroup.coverImage}
                alt={`${clientGroup.client} ad creative cover`}
                className="w-full h-full object-cover object-center scale-[1.02] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] select-none"
                draggable={false}
              />
              {/* Bottom gradient for crisp client title legibility */}
              <div
                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,20,22,0.35)_0%,transparent_32%,transparent_54%,rgba(20,20,22,0.72)_80%,rgba(20,20,22,0.94)_100%)]"
                aria-hidden="true"
              />
            </div>

            {/* Top Row: Ad Count Badge */}
            <div className="relative z-10 flex items-center justify-between gap-2 w-full">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#141416]/80 backdrop-blur-xs text-[11px] font-bold tracking-tight text-[#f7f6f2] border border-[#f7f6f2]/15">
                <Layers className="w-3 h-3" aria-hidden="true" />
                <span>{clientGroup.images.length} Ad Creatives</span>
              </span>

              <span
                className="w-2.5 h-2.5 border-t-[1.75px] border-r-[1.75px] border-[#f7f6f2] opacity-65 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </div>

            {/* Bottom Row: Client Folder Name & Snappy Action Button */}
            <div className="relative z-10 flex items-end justify-between gap-3 w-full mt-auto pt-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-[-0.03em] leading-tight text-[#f7f6f2]">
                  {clientGroup.client}
                </h2>
              </div>

              <span
                className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f7f6f2] text-[#1c1c1e] flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                aria-hidden="true"
              >
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Social Ads Full-Screen Popup Modal (matches Branding & Identity modal) */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            key="social-client-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="social-modal-client-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#111113]/80 backdrop-blur-xs overflow-y-auto"
            onClick={closeClientGallery}
          >
            <motion.div
              key="social-client-modal-dialog"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 460, damping: 32, mass: 0.8 }}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#eceae4] dark:bg-[#161618] text-[#1c1c1e] dark:text-[#f7f6f2] p-4 sm:p-7 shadow-2xl border border-[#1c1c1e]/15 dark:border-[#f7f6f2]/15 flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar: Client Name, Counter, Shuffle Button & Close Button */}
              <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#1c1c1e]/12 dark:border-[#f7f6f2]/12">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1c1c1e]/70 dark:text-[#f7f6f2]/70">
                    <span>{selectedClient.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      Creative {String(activeIndex + 1).padStart(2, '0')} of{' '}
                      {String(totalImages).padStart(2, '0')}
                    </span>
                  </div>
                  <h2
                    id="social-modal-client-title"
                    className="mt-0.5 text-2xl sm:text-3xl font-extrabold tracking-[-0.03em]"
                  >
                    {selectedClient.client}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* Snappy Shuffle Button */}
                  <button
                    type="button"
                    onClick={handleShuffle}
                    className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 rounded-lg bg-[#f7f6f2] dark:bg-[#222226] text-xs font-bold text-[#1c1c1e] dark:text-[#f7f6f2] border border-[#1c1c1e]/15 dark:border-[#f7f6f2]/15 hover:bg-[#1c1c1e] hover:text-[#f7f6f2] dark:hover:bg-[#f7f6f2] dark:hover:text-[#1c1c1e] active:scale-95 transition-all duration-150 cursor-pointer"
                    aria-label="Shuffle social ads"
                  >
                    <Shuffle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Shuffle</span>
                  </button>

                  {/* Close Modal Button */}
                  <button
                    type="button"
                    onClick={closeClientGallery}
                    aria-label="Close social ads gallery"
                    className="min-w-[42px] min-h-[42px] rounded-full bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e] flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main Showcase Stage: Transparent background, dark navigation buttons, uncropped natural image aspect ratio */}
              <div className="relative shrink-0 py-1 sm:py-2 px-12 sm:px-16 flex items-center justify-center select-none">
                {/* Left / Previous Cycle Button (Dark) */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous social ad"
                  className="absolute left-1 sm:left-2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#28282c] dark:text-[#f7f6f2] border border-[#f7f6f2]/15 shadow-lg flex items-center justify-center hover:scale-105 active:scale-90 transition-transform cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Featured Creative: Preserves exact intrinsic aspect ratio (1:1, 4:5, 3:4, etc.) and shows image 100% uncropped */}
                <div className="relative flex items-center justify-center w-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={`${selectedClient.id}-${currentImageIndex}-${activeIndex}`}
                      src={currentImageSrc}
                      alt={`${selectedClient.client} social ad creative ${activeIndex + 1}`}
                      initial={
                        isShuffleMotion
                          ? {
                              opacity: 0,
                              scale: 0.84,
                              rotate: motionDirection * -6,
                              y: 18,
                            }
                          : {
                              opacity: 0,
                              x: motionDirection * 72,
                              scale: 0.92,
                              rotate: motionDirection * 1.6,
                            }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                      }}
                      exit={
                        isShuffleMotion
                          ? {
                              opacity: 0,
                              scale: 0.86,
                              rotate: motionDirection * 5,
                              y: -14,
                            }
                          : {
                              opacity: 0,
                              x: motionDirection * -72,
                              scale: 0.92,
                              rotate: motionDirection * -1.6,
                            }
                      }
                      transition={{
                        type: 'spring',
                        stiffness: 540,
                        damping: 34,
                        mass: 0.72,
                      }}
                      className="w-auto h-auto max-w-full max-h-[48vh] sm:max-h-[54vh] object-contain rounded-xl shadow-xl block mx-auto select-none"
                      draggable={false}
                    />
                  </AnimatePresence>
                </div>

                {/* Right / Next Cycle Button (Dark) */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next social ad"
                  className="absolute right-1 sm:right-2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#28282c] dark:text-[#f7f6f2] border border-[#f7f6f2]/15 shadow-lg flex items-center justify-center hover:scale-105 active:scale-90 transition-transform cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lower Section: List of All Social Ads for This Client to Cycle Through */}
              <div className="shrink-0 rounded-xl bg-[#f7f6f2] dark:bg-[#1e1e21] border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10 p-3 sm:p-4">
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-bold tracking-tight text-[#1c1c1e]/80 dark:text-[#f7f6f2]/80">
                    {selectedClient.client} Ad Creatives ({totalImages})
                  </span>
                  <span className="text-[11px] font-medium text-[#1c1c1e]/60 dark:text-[#f7f6f2]/60">
                    Click any thumbnail or use ← / → keys to cycle
                  </span>
                </div>

                {/* Scrollable & Animated Thumbnail List of Same Client */}
                <motion.div
                  layout
                  className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-11 gap-2 max-h-[190px] overflow-y-auto p-1"
                  role="listbox"
                  aria-label={`${selectedClient.client} social ad thumbnails`}
                >
                  {displayOrder.map((imgIndex, pos) => {
                    const thumbSrc = selectedClient.images[imgIndex];
                    const isSelected = pos === activeIndex;

                    return (
                      <motion.button
                        layout
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 32,
                        }}
                        key={`${selectedClient.id}-thumb-${imgIndex}`}
                        ref={(el) => {
                          thumbnailRefs.current[pos] = el;
                        }}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        aria-label={`${selectedClient.client} creative ${pos + 1}`}
                        onClick={() => handleSelectPosition(pos)}
                        className={`group relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isSelected
                            ? 'ring-2 ring-[#1c1c1e] dark:ring-[#f7f6f2] scale-[1.05] z-10 shadow-md'
                            : 'opacity-65 hover:opacity-100 hover:scale-[1.04]'
                        }`}
                      >
                        <img
                          src={thumbSrc}
                          alt={`${selectedClient.client} thumbnail ${pos + 1}`}
                          loading="lazy"
                          className="w-full h-full object-cover block select-none"
                          draggable={false}
                        />
                        <span
                          className={`pointer-events-none absolute bottom-1 right-1 px-1 py-0.2 rounded text-[9px] font-bold tabular-nums leading-tight ${
                            isSelected
                              ? 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e]'
                              : 'bg-[#141416]/75 text-[#f7f6f2]/90 opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {String(pos + 1).padStart(2, '0')}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

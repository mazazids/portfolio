/**
 * Footer Component
 * Contact lives in the footer on every page.
 * Features contact bento tiles in two-tone Dark Graphite (#1C1C1E) and Off-White (#F7F6F2 / #E5E3DC).
 */

import React, { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';

const CONTACT_DATA = {
  email: 'mazasunardi@gmail.com',
  socials: [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'in/maza-sunardi',
      url: 'https://www.linkedin.com/in/maza-sunardi-996007223/',
      bgClass: 'bg-[#e5e3dc] dark:bg-[#26262a]',
      textClass: 'text-[#1c1c1e] dark:text-[#f7f6f2]',
      subTextClass: 'text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65',
      buttonClass: 'bg-[#1c1c1e] text-[#f7f6f2] dark:bg-[#f7f6f2] dark:text-[#1c1c1e]',
    },
  ],
};

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(CONTACT_DATA.email).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer className="mt-10 pt-4 pb-8" aria-label="Contact and social links">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-bold tracking-tight text-[#1c1c1e] dark:text-[#f7f6f2]">
          Contact & Elsewhere
        </span>
        <span className="text-xs text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65">
          Available for commissions & brand partnerships
        </span>
      </div>

      {/* Contact Bento Grid: Email extends across 4 of 5 cols on desktop to fill the space, LinkedIn takes 1 col */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
        {/* Extended tile: Email Contact in Dark Graphite */}
        <button
          type="button"
          onClick={handleCopyEmail}
          className="group md:col-span-4 rounded-xl p-5 bg-[#1c1c1e] dark:bg-[#f7f6f2] text-[#f7f6f2] dark:text-[#1c1c1e] flex flex-col justify-between min-h-[124px] text-left cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]"
          aria-label={`Copy email address ${CONTACT_DATA.email}`}
        >
          <div className="flex items-center justify-between gap-2 w-full">
            <span className="text-xs font-medium text-[#f7f6f2]/70 dark:text-[#1c1c1e]/70">
              Direct Email · Click to copy
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#f7f6f2] dark:text-[#1c1c1e]">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                  <span>Copy</span>
                </>
              )}
            </span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-3 w-full">
            <div>
              <p className="text-lg sm:text-2xl font-bold tracking-[-0.02em] break-all">
                {CONTACT_DATA.email}
              </p>
              <p className="text-xs opacity-70 mt-0.5">
                Start a conversation about your brand
              </p>
            </div>
            <span
              className="shrink-0 w-10 h-10 rounded-full bg-[#f7f6f2] text-[#1c1c1e] dark:bg-[#1c1c1e] dark:text-[#f7f6f2] flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </button>

        {/* Social Contact Tile: LinkedIn */}
        {CONTACT_DATA.socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group md:col-span-1 rounded-xl p-5 border border-[#1c1c1e]/10 dark:border-[#f7f6f2]/10 ${social.bgClass} ${social.textClass} flex flex-col justify-between min-h-[124px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1e] dark:focus-visible:outline-[#f7f6f2]`}
          >
            <span className={`text-xs font-medium ${social.subTextClass}`}>
              {social.label}
            </span>

            <div className="mt-4 flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="text-base font-bold tracking-tight truncate">
                  {social.label}
                </p>
                <p className={`text-xs truncate ${social.subTextClass}`}>
                  {social.handle}
                </p>
              </div>
              <span
                className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${social.buttonClass}`}
                aria-hidden="true"
              >
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Copyright line below */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#1c1c1e]/65 dark:text-[#f7f6f2]/65">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/aistudio/Maza_Sunardi_Logo_-_Black_5a49e2b6.png"
            alt="Maza Sunardi Logo"
            className="block dark:hidden h-3.5 w-auto object-contain opacity-80 select-none"
            draggable={false}
          />
          <img
            src="/assets/aistudio/Maza_Sunardi_Logo_-_White_27b679b0.png"
            alt="Maza Sunardi Logo"
            className="hidden dark:block h-3.5 w-auto object-contain opacity-80 select-none"
            draggable={false}
          />
          <p>© {new Date().getFullYear()} Maza Sunardi. All rights reserved.</p>
        </div>
        <p>Communication design portfolio</p>
      </div>
    </footer>
  );
};

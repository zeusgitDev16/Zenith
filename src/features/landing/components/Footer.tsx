// src/features/landing/components/Footer.tsx

import React from "react";
import { footerData } from "@/data/content/footer.data";
import { ArrowRight } from "lucide-react";
import { SupportGraphic } from "@/svg/SupportGraphic";

export const Footer: React.FC = () => {
  return (
    /* mt-24 adds clean structural breathing room between the Pricing section and the Footer */
    <section className="w-full mt-60 relative overflow-visible">
      <footer className="w-full bg-zinc-950 text-zinc-400 pt-32 pb-16 md:pb-20 relative overflow-visible border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative overflow-visible">
        
        {/* Floating Support Banner Card (Data-Driven via SoC) */}
          <div className="-mt-57 mb-20 bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20 overflow-hidden">
           <SupportGraphic />
            <div className="space-y-3 text-center lg:text-left relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                {footerData.cta.title}
              </h2>
              <p className="text-sm md:text-base text-zinc-400">
                {footerData.cta.description}
              </p>
            </div>
          <a
              href={footerData.cta.buttonHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 font-medium text-sm transition-all shadow-sm group whitespace-nowrap"
            >
              {footerData.cta.buttonText}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Block: Brand, Address, Phone, Email */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-white lowercase">
                {footerData.brandName}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--landhighlight-accent)]"></span>
            </div>

            {/* Address */}
            <div className="space-y-1 text-sm text-zinc-400">
              {footerData.addressLines.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-2 gap-6 pt-2">
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Phone number</p>
                <p className="text-sm text-zinc-300 font-medium">{footerData.phoneNumber}</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm text-zinc-300 font-medium">{footerData.email}</p>
              </div>
            </div>
          </div>

          {/* Right Block: Three Columns (Quick Links, Social, Legal) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerData.columns.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col space-y-4">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-zinc-900 text-center">
          <p className="text-xs text-zinc-600">
            {footerData.copyright}
          </p>
        </div>

      </div>
    </footer>
    </section>
  );
};
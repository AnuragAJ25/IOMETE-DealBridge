"use client";

import React from "react";

interface EcosystemBrand {
  name: string;
  category: string;
  svg: React.ReactNode;
}

export function EcosystemLogoCarousel() {
  const brands: EcosystemBrand[] = [
    {
      name: "Apache Iceberg",
      category: "Open Table Format",
      svg: (
        <svg viewBox="0 0 120 32" className="h-6 w-auto fill-current" aria-label="Apache Iceberg">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Apache Iceberg</text>
        </svg>
      ),
    },
    {
      name: "Apache Spark",
      category: "Compute Engine",
      svg: (
        <svg viewBox="0 0 110 32" className="h-6 w-auto fill-current" aria-label="Apache Spark">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Apache Spark</text>
        </svg>
      ),
    },
    {
      name: "Kubernetes",
      category: "Container Orchestration",
      svg: (
        <svg viewBox="0 0 100 32" className="h-6 w-auto fill-current" aria-label="Kubernetes">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Kubernetes</text>
        </svg>
      ),
    },
    {
      name: "Amazon Web Services",
      category: "Cloud & S3 Storage",
      svg: (
        <svg viewBox="0 0 90 32" className="h-6 w-auto fill-current" aria-label="AWS">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="18" fontWeight="black" letterSpacing="1">AWS</text>
        </svg>
      ),
    },
    {
      name: "Microsoft Azure",
      category: "Cloud & ADLS Gen2",
      svg: (
        <svg viewBox="0 0 120 32" className="h-6 w-auto fill-current" aria-label="Microsoft Azure">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Microsoft Azure</text>
        </svg>
      ),
    },
    {
      name: "Google Cloud",
      category: "Cloud & GCS Storage",
      svg: (
        <svg viewBox="0 0 110 32" className="h-6 w-auto fill-current" aria-label="Google Cloud">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Google Cloud</text>
        </svg>
      ),
    },
    {
      name: "Apache Ranger",
      category: "Security & Governance",
      svg: (
        <svg viewBox="0 0 120 32" className="h-6 w-auto fill-current" aria-label="Apache Ranger">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="15" fontWeight="bold">Apache Ranger</text>
        </svg>
      ),
    },
    {
      name: "dbt",
      category: "Transformation (dbt-iomete)",
      svg: (
        <svg viewBox="0 0 70 32" className="h-6 w-auto fill-current" aria-label="dbt">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="18" fontWeight="black">dbt™</text>
        </svg>
      ),
    },
    {
      name: "Tableau",
      category: "BI & Visualization",
      svg: (
        <svg viewBox="0 0 90 32" className="h-6 w-auto fill-current" aria-label="Tableau">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Tableau</text>
        </svg>
      ),
    },
    {
      name: "Power BI",
      category: "BI & Analytics",
      svg: (
        <svg viewBox="0 0 90 32" className="h-6 w-auto fill-current" aria-label="Power BI">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">Power BI</text>
        </svg>
      ),
    },
    {
      name: "MinIO",
      category: "S3 Object Storage",
      svg: (
        <svg viewBox="0 0 80 32" className="h-6 w-auto fill-current" aria-label="MinIO">
          <text x="0" y="22" fontFamily="sans-serif" fontSize="16" fontWeight="bold">MinIO</text>
        </svg>
      ),
    },
  ];

  // Duplicate for seamless infinite loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="w-full bg-white border-y border-slate-200/90 py-8 overflow-hidden relative shadow-xs">
      {/* Subtle fade edges for smooth entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Technologies and platforms across the modern lakehouse ecosystem
        </p>
      </div>

      {/* Marquee Track with Pause on Hover */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex items-center gap-10 sm:gap-14 py-2">
          {duplicatedBrands.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 shrink-0 px-3 py-1.5 rounded-xl text-slate-600 opacity-65 grayscale hover:grayscale-0 hover:opacity-100 hover:text-slate-900 transition-all duration-300 cursor-default"
              title={`${brand.name} · ${brand.category}`}
            >
              <div className="h-5 flex items-center">{brand.svg}</div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded hidden sm:inline">
                {brand.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

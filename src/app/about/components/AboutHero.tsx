'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[55vh] flex items-center overflow-hidden pt-24"
      style={{ background: 'linear-gradient(135deg, #0D2353 0%, #1A4B9E 60%, #0D2353 100%)' }}
      aria-label="About hero">
      
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1b8899a97-1768389747850.png"
          alt="Modern UK professional office environment with diverse team members collaborating, bright open-plan workspace"
          fill
          priority
          className="object-cover"
          sizes="100vw" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>
      <div className="container max-w-7xl mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="max-w-3xl">
          <div className="fade-up section-label text-primary mb-4">Our Story</div>
          <h1 className="fade-up stagger-1 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-primary mb-6">
            People. Service. Opportunity.
          </h1>
          <p className="fade-up stagger-2 text-foreground/90 font-medium text-lg leading-relaxed">
            JK Staffing & Services Management Ltd was established on 16 April 2021 with a clear purpose: to bridge the gap between businesses seeking dependable staff and individuals seeking meaningful work across the UK.
          </p>
        </div>
      </div>
    </section>);

}
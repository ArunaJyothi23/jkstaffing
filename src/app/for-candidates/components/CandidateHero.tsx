'use client';

import React, { useEffect, useRef } from 'react';

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function CandidateHero() {
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
      className="relative min-h-[60vh] flex items-center overflow-hidden pt-24"
      style={{ background: 'linear-gradient(135deg, #1A4B9E 0%, #0D2353 60%, #1A4B9E 100%)' }}
      aria-label="Candidate hero">
      
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_148b9b9ca-1786125102528.png"
          alt="Young professional candidate confidently walking in a bright UK city, career opportunity, professional attire"
          fill
          priority
          className="object-cover object-top"
          sizes="100vw" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>
      <div className="container max-w-7xl mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="max-w-3xl">
          <div className="fade-up section-label text-primary mb-4">For Candidates</div>
          <h1 className="fade-up stagger-1 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-primary mb-6">
            Find Your Next Opportunity
          </h1>
          <p className="fade-up stagger-2 text-foreground/90 font-medium text-lg leading-relaxed mb-8">
            We help individuals identify employment opportunities that match their skills, experience and career goals. Explore roles across multiple sectors throughout the UK.
          </p>
          <div className="fade-up stagger-3 flex flex-wrap gap-3">
            <a href="#job-search" className="btn-primary text-base py-3 px-7">
              Search Jobs
              <Icon name="MagnifyingGlassIcon" size={16} />
            </a>
            <a href="#submit-cv" className="btn-secondary text-base py-3 px-7">
              Submit Your CV
              <Icon name="DocumentArrowUpIcon" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>);

}
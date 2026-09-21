'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function AudienceCTA() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
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
    <section ref={ref} className="py-20 bg-muted" aria-label="Employer and candidate options">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Employers */}
          <div className="fade-up relative bg-primary rounded-3xl overflow-hidden p-8 lg:p-10 flex flex-col justify-between min-h-80 shine-card">
            <div className="absolute inset-0 z-0">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_111288e54-1776866345849.png"
                alt="Business executives in a modern UK office reviewing staffing requirements, professional setting, cool blue tones"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw" />
              
              <div className="absolute inset-0 bg-primary opacity-90" />
            </div>
            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="section-label text-white/70">
                  For Employers
                </div>
                <h2 className="text-display font-black tracking-tight text-white">
                  Need Reliable Staff?
                </h2>
                <p className="text-white/70 text-base leading-relaxed">
                  Whether you need short-term cover, permanent recruitment, specialist security personnel or workforce coordination, we can help you find the right staffing solution.
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {['Temporary & Permanent Roles', 'Security Personnel', 'Workforce Coordination', 'Fast Placement']?.map((item) =>
                  <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
                      <Icon name="CheckCircleIcon" size={16} className="text-accent flex-shrink-0" />
                      {item}
                    </li>
                  )}
                </ul>
              </div>
              <Link href="/for-employers" className="btn-primary self-start mt-2">
                Request Staff
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
            </div>
          </div>

          {/* Candidates */}
          <div className="fade-up stagger-2 relative bg-secondary rounded-3xl overflow-hidden p-8 lg:p-10 flex flex-col justify-between min-h-80 shine-card">
            <div className="absolute inset-0 z-0">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_11c2c4670-1778965269126.png"
                alt="Professional candidate in a job interview, confident expression, bright office environment"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw" />
              
              <div className="absolute inset-0 bg-secondary opacity-90" />
            </div>
            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="section-label text-white/70">
                  For Candidates
                </div>
                <h2 className="text-display font-black tracking-tight text-white">
                  Looking for Your Next Opportunity?
                </h2>
                <p className="text-white/70 text-base leading-relaxed">
                  Explore employment opportunities that match your skills, experience and career goals across multiple sectors throughout the UK.
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {['Temporary & Permanent Roles', 'Multiple Sectors', 'Career Guidance', 'Fast Application']?.map((item) =>
                  <li key={item} className="flex items-center gap-2 text-white/70 text-sm">
                      <Icon name="CheckCircleIcon" size={16} className="text-accent flex-shrink-0" />
                      {item}
                    </li>
                  )}
                </ul>
              </div>
              <Link href="/for-candidates" className="btn-white self-start mt-2">
                Find a Job
                <Icon name="MagnifyingGlassIcon" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
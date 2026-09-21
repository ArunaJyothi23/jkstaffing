'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

export default function AboutStory() {
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
    <section ref={ref} className="section-padding bg-background" aria-label="Company story">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <div className="fade-up section-label">Who We Are</div>
            <h2 className="fade-up stagger-1 text-section-title font-extrabold text-primary">
              A UK Workforce Agency Built on Trust
            </h2>
            <p className="fade-up stagger-2 text-muted-foreground leading-relaxed">
              JK Staffing & Services Management Ltd provides human resources management, staffing solutions, and private security activities across the UK. We bridge the gap between businesses seeking dependable staff and individuals seeking meaningful work.
            </p>
            <p className="fade-up stagger-3 text-muted-foreground leading-relaxed">
              Since our establishment in April 2021, we have built our reputation on responsiveness, compliance, and genuine understanding of our clients&apos; and candidates&apos; needs.
            </p>

            <div className="fade-up stagger-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-5 border border-border shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Icon name="EyeIcon" size={18} className="text-secondary" />
                  </div>
                  <div className="font-bold text-sm text-primary">Our Vision</div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  To be a trusted recruitment and workforce partner known for integrity, high compliance standards, and strong long-term business relationships.
                </p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border shadow-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon name="RocketLaunchIcon" size={18} className="text-accent" />
                  </div>
                  <div className="font-bold text-sm text-primary">Our Mission</div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  To deliver flexible, high-quality recruitment and HR support that helps employers maintain operational success while empowering job seekers to achieve their employment goals.
                </p>
              </div>
            </div>

            <div className="fade-up stagger-5 flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                <Icon name="CalendarDaysIcon" size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-primary text-sm">Established</div>
                <div className="text-muted-foreground text-sm">16 April 2021 — UK-Based Workforce Agency</div>
              </div>
            </div>
          </div>

          <div className="fade-up stagger-2 relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-card-hover">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1d516d798-1768437649458.png"
                alt="Professional UK staffing agency team in a modern bright office, collaborative and welcoming environment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw" />
              
            </div>
            <div className="floating-badge absolute -bottom-4 -left-4 z-10">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="MapPinIcon" size={18} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-primary">UK-Based</div>
                <div className="text-xs text-muted-foreground">Serving businesses nationwide</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
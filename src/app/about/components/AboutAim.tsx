'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function AboutAim() {
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
      { threshold: 0.15 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-muted overflow-hidden" aria-label="Our aim">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 fade-up">
            <div className="section-label mb-4">What We&apos;re Working Towards</div>
            <h2 className="text-section-title font-extrabold text-primary">Our Aim</h2>
          </div>
          <div className="lg:col-span-8 fade-up stagger-2">
            <div className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 lg:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10">
                <Icon name="StarIcon" size={120} className="text-white" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-1 bg-accent rounded-full mb-6" />
                <p className="text-white text-lg lg:text-xl leading-relaxed font-medium mb-6">
                  &quot;Our aim is to become a trusted staffing and workforce services partner for employers while creating meaningful employment opportunities for candidates.&quot;
                </p>
                <p className="text-white/70 leading-relaxed">
                  We seek to understand the needs of organisations, identify appropriate talent and provide responsive workforce solutions that support operational continuity and long-term development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
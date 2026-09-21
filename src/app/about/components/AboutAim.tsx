'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { subscribeDocument } from '@/lib/firebase/db';

export default function AboutAim() {
  const ref = useRef<HTMLElement>(null);
  const [content, setContent] = useState({
    aim: 'To become a trusted staffing and workforce services partner for employers while creating meaningful employment opportunities for candidates. We seek to understand the needs of organisations, identify appropriate talent and provide responsive workforce solutions that support operational continuity and long-term development.'
  });

  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', 'about_page', (doc) => {
      if (doc) {
        setContent(prev => ({
          aim: doc.aim || prev.aim,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

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

  // Split aim into first sentence and the rest
  const firstPeriodIdx = content.aim.indexOf('.');
  const aimQuote = firstPeriodIdx !== -1 ? content.aim.substring(0, firstPeriodIdx + 1) : content.aim;
  const aimRest = firstPeriodIdx !== -1 ? content.aim.substring(firstPeriodIdx + 1).trim() : '';

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
                  &quot;{aimQuote}&quot;
                </p>
                {aimRest && (
                  <p className="text-white/70 leading-relaxed">
                    {aimRest}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
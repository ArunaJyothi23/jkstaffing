'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const values = [
  { icon: 'HandRaisedIcon', title: 'Integrity', desc: 'Upfront, clear and honest communication with clients and candidates throughout every interaction.', bg: 'bg-primary/8', iconColor: 'text-primary' },
  { icon: 'StarIcon', title: 'Quality', desc: 'Matching candidates based on long-term suitability rather than short-term volume or quick placements.', bg: 'bg-accent/8', iconColor: 'text-accent' },
  { icon: 'ShieldCheckIcon', title: 'Responsibility', desc: 'Strictly adhering to compliance, legal checks and workplace standards on every engagement.', bg: 'bg-secondary/8', iconColor: 'text-secondary' },
  { icon: 'HeartIcon', title: 'Respect & Inclusion', desc: 'Promoting fair, accessible and inclusive recruitment practices for all candidates regardless of background.', bg: 'bg-primary/5', iconColor: 'text-primary' },
];

export default function AboutValues() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-muted" aria-label="Core values">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 fade-up">
          <div className="section-label justify-center mb-4">Our Foundation</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">Our Core Values</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Four values that define how we work and what we stand for as a workforce agency.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`fade-up stagger-${i + 1} bg-card rounded-2xl p-6 border border-border card-lift shadow-card group text-center`}
            >
              <div className={`w-14 h-14 rounded-2xl ${v.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={v.icon as Parameters<typeof Icon>[0]['name']} size={26} className={v.iconColor} />
              </div>
              <h3 className="font-bold text-base text-primary mb-3">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
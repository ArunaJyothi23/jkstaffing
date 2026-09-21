'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const values = [
  {
    icon: 'HandRaisedIcon',
    title: 'Integrity',
    desc: 'Upfront, clear and honest communication with clients and candidates throughout every interaction.',
    color: 'bg-primary/8',
    iconColor: 'text-primary',
  },
  {
    icon: 'StarIcon',
    title: 'Quality',
    desc: 'Matching candidates based on long-term suitability rather than short-term volume or quick placements.',
    color: 'bg-accent/8',
    iconColor: 'text-accent',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Responsibility',
    desc: 'Strictly adhering to compliance, legal checks and workplace standards on every engagement.',
    color: 'bg-secondary/8',
    iconColor: 'text-secondary',
  },
  {
    icon: 'HeartIcon',
    title: 'Respect & Inclusion',
    desc: 'Promoting fair, accessible and inclusive recruitment practices for all candidates regardless of background.',
    color: 'bg-primary/5',
    iconColor: 'text-primary',
  },
];

export default function CoreValues() {
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
    <section ref={ref} className="section-padding bg-background" aria-label="Our core values">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="fade-up section-label mb-4">What Drives Us</div>
            <h2 className="fade-up stagger-1 text-section-title font-extrabold text-primary mb-6">Our Core Values</h2>
            <p className="fade-up stagger-2 text-muted-foreground leading-relaxed mb-8">
              These four values form the foundation of everything we do at JK Staffing. They guide our decisions, shape our relationships, and define the standard of service we deliver.
            </p>
            <div className="fade-up stagger-3 bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
              <div className="text-4xl font-extrabold mb-1 text-accent">Our Aim</div>
              <p className="text-white/80 text-sm leading-relaxed">
                To become a trusted staffing and workforce services partner for employers while creating meaningful employment opportunities for candidates. We seek to understand the needs of organisations, identify appropriate talent and provide responsive workforce solutions that support operational continuity and long-term development.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`fade-up stagger-${i + 1} bg-card rounded-2xl p-6 border border-border card-lift shadow-card group`}
              >
                <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={v.icon as Parameters<typeof Icon>[0]['name']} size={22} className={v.iconColor} />
                </div>
                <h3 className="font-bold text-base text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const trustItems = [
  {
    icon: 'ShieldCheckIcon',
    title: 'Professional Standards',
    desc: 'Rigorous candidate screening including identity, right-to-work, reference and sector-specific checks.',
  },
  {
    icon: 'BoltIcon',
    title: 'Responsive Service',
    desc: 'Fast, reliable support for staffing shortages and immediate operational requirements.',
  },
  {
    icon: 'AdjustmentsHorizontalIcon',
    title: 'Tailored Solutions',
    desc: 'Workforce support built around your business needs, schedules and budget.',
  },
  {
    icon: 'HandshakeIcon' as Parameters<typeof Icon>[0]['name'],
    title: 'Compliance-Focused',
    desc: 'All recruitment processes follow appropriate legal and sector-specific compliance requirements.',
  },
];

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);

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
    <section ref={ref} className="py-16 bg-background" aria-label="Trust values">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, i) => (
            <div
              key={item.title}
              className={`fade-up stagger-${i + 1} bg-card rounded-2xl p-6 border border-border card-lift shadow-card`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-accent" />
              </div>
              <h3 className="font-bold text-base text-primary mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
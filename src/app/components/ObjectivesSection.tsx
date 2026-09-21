'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const objectives = [
  { num: '01', title: 'Connect Employers with Candidates', desc: 'To provide effective recruitment and staffing solutions that meet operational requirements.', icon: 'LinkIcon' },
  { num: '02', title: 'Support Candidates', desc: 'To help individuals identify employment opportunities that match their skills and experience.', icon: 'UserIcon' },
  { num: '03', title: 'Maintain Professional Standards', desc: 'To operate transparent and responsible recruitment processes at all times.', icon: 'StarIcon' },
  { num: '04', title: 'Develop Long-Term Relationships', desc: 'To build lasting relationships with employers, candidates and business partners.', icon: 'HandshakeIcon' as Parameters<typeof Icon>[0]['name'] },
  { num: '05', title: 'Support Workforce Flexibility', desc: 'To help organisations respond to changing staffing requirements quickly and efficiently.', icon: 'ArrowPathIcon' },
  { num: '06', title: 'Promote Equal Opportunity', desc: 'To provide fair and inclusive recruitment processes accessible to all candidates.', icon: 'ScaleIcon' },
  { num: '07', title: 'Maintain Appropriate Compliance', desc: 'To undertake relevant checks and processes according to the role, sector and applicable requirements.', icon: 'ClipboardDocumentCheckIcon' },
];

export default function ObjectivesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-muted" aria-label="Our key objectives">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 fade-up">
          <div className="section-label justify-center mb-4">What We Stand For</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">Our Key Objectives</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Seven core commitments that guide how we operate and serve our clients and candidates.
          </p>
        </div>

        {/* BENTO GRID: 7 cards */}
        {/* Row 1: [col-1: Obj1 cs-1] [col-2: Obj2 cs-1] [col-3: Obj3 cs-1] */}
        {/* Row 2: [col-1: Obj4 cs-1] [col-2: Obj5 cs-1] [col-3: Obj6 cs-1] */}
        {/* Row 3: [col-1: Obj7 cs-3 (full)] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {objectives.slice(0, 6).map((obj, i) => (
            <div
              key={obj.num}
              className={`fade-up stagger-${Math.min(i + 1, 6)} bg-card rounded-2xl p-6 border border-border card-lift shadow-card group`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-accent font-extrabold text-sm font-mono">{obj.num}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-primary mb-2">{obj.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{obj.desc}</p>
                </div>
              </div>
            </div>
          ))}
          {/* Last card spans full width */}
          <div className="fade-up stagger-6 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 border border-primary/20 shadow-card lg:col-span-3">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                  <span className="text-white font-extrabold text-sm font-mono">07</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-base text-white mb-2">{objectives[6].title}</h3>
                <p className="text-sm text-white/70 leading-relaxed max-w-2xl">{objectives[6].desc}</p>
              </div>
              <div className="ml-auto hidden lg:block">
                <Icon name="ClipboardDocumentCheckIcon" size={40} className="text-accent/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
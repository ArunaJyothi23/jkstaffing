'use client';

import React, { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

const checks = [
  'Right-to-work verification',
  'Identity verification',
  'References',
  'Qualification verification',
  'Licence verification',
  'DBS checks where applicable',
  'SIA licence verification where applicable',
  'Sector-specific checks',
  'Employment history',
  'Training/certification checks',
];

export default function ComplianceSection() {
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-muted" aria-label="Compliance commitment">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Checklist */}
          <div className="fade-up bg-card rounded-3xl p-8 border border-border shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                <Icon name="ShieldCheckIcon" size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-primary">Compliance Checks</div>
                <div className="text-xs text-muted-foreground">Depending on role and sector</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {checks.map((check, i) => (
                <div key={check} className={`fade-up stagger-${Math.min(i + 1, 6)} flex items-center gap-3 p-3 bg-muted rounded-xl`}>
                  <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckIcon" size={12} className="text-accent" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{check}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <div className="fade-up section-label">Responsible Recruitment</div>
            <h2 className="fade-up stagger-1 text-section-title font-extrabold text-primary">
              Our Commitment to Compliance
            </h2>
            <p className="fade-up stagger-2 text-muted-foreground leading-relaxed">
              We recognise the importance of responsible recruitment and appropriate candidate verification. Depending on the role and sector, relevant checks may include the following.
            </p>
            <div className="fade-up stagger-3 flex flex-col gap-4">
              {[
                { icon: 'ShieldCheckIcon', title: 'Role-Specific Verification', desc: 'Checks are tailored to the requirements of each specific role and sector.' },
                { icon: 'DocumentMagnifyingGlassIcon', title: 'Thorough Screening', desc: 'We take screening seriously to ensure suitable candidate-employer matches.' },
                { icon: 'ScaleIcon', title: 'Legal Compliance', desc: 'All processes are conducted in accordance with applicable UK employment law.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-primary mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
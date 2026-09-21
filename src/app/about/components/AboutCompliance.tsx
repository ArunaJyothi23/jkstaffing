'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { subscribeDocument } from '@/lib/firebase/db';

export default function AboutCompliance() {
  const ref = useRef<HTMLElement>(null);
  const [content, setContent] = useState({
    compTitle: 'Our Commitment to Compliance',
    compText: 'We recognise the importance of responsible recruitment and appropriate candidate verification. Depending on the role and sector, relevant checks may include the following.',
    compFeatures: [
      { icon: 'ShieldCheckIcon', title: 'Role-Specific Verification', desc: 'All checks are tailored to the specific requirements of each role and sector.' },
      { icon: 'DocumentMagnifyingGlassIcon', title: 'Thorough Screening', desc: 'We take screening seriously to ensure suitable candidate-employer matches are made.' },
      { icon: 'ScaleIcon', title: 'Legal Compliance', desc: 'All processes are conducted in accordance with applicable UK employment law and regulations.' },
    ],
    compChecks: [
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
    ]
  });

  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', 'about_page', (doc) => {
      if (doc) {
        setContent(prev => ({
          compTitle: doc.compTitle || prev.compTitle,
          compText: doc.compText || prev.compText,
          compFeatures: doc.compFeatures || prev.compFeatures,
          compChecks: doc.compChecks || prev.compChecks,
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
    <section ref={ref} className="section-padding bg-background" aria-label="Compliance commitment">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-6">
            <div className="fade-up section-label">Responsible Recruitment</div>
            <h2 className="fade-up stagger-1 text-section-title font-extrabold text-primary">
              {content.compTitle}
            </h2>
            <p className="fade-up stagger-2 text-muted-foreground leading-relaxed whitespace-pre-line">
              {content.compText}
            </p>
            <div className="fade-up stagger-3 flex flex-col gap-4">
              {content.compFeatures?.map((item: any) => (
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
            <div className="fade-up stagger-5">
              <Link href="/contact" className="btn-primary self-start">
                Discuss Your Requirements
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
            </div>
          </div>

          <div className="fade-up stagger-2 bg-card rounded-3xl p-8 border border-border shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                <Icon name="ShieldCheckIcon" size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-primary">Candidate Checks</div>
                <div className="text-xs text-muted-foreground">Depending on role and sector, may include:</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {content.compChecks?.map((check: string) => (
                <div key={check} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <Icon name="CheckIcon" size={12} className="text-accent" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{check}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
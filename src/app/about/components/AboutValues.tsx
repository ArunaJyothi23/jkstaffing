'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { subscribeDocument } from '@/lib/firebase/db';

const THEMES = [
  { bg: 'bg-primary/8', iconColor: 'text-primary' },
  { bg: 'bg-accent/8', iconColor: 'text-accent' },
  { bg: 'bg-secondary/8', iconColor: 'text-secondary' },
  { bg: 'bg-primary/5', iconColor: 'text-primary' },
];

export default function AboutValues() {
  const ref = useRef<HTMLElement>(null);
  const [content, setContent] = useState({
    valTitle: 'Our Core Values',
    valText: 'Four values that define how we work and what we stand for as a workforce agency.',
    coreValuesList: [
      { icon: 'HandRaisedIcon', title: 'Integrity', text: 'Upfront, clear and honest communication with clients and candidates throughout every interaction.' },
      { icon: 'StarIcon', title: 'Quality', text: 'Matching candidates based on long-term suitability rather than short-term volume or quick placements.' },
      { icon: 'ShieldCheckIcon', title: 'Responsibility', text: 'Strictly adhering to compliance, legal checks and workplace standards on every engagement.' },
      { icon: 'HeartIcon', title: 'Respect & Inclusion', text: 'Promoting fair, accessible and inclusive recruitment practices for all candidates regardless of background.' },
    ]
  });

  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', 'homepage', (doc) => {
      if (doc) {
        setContent(prev => ({
          valTitle: doc.valTitle || prev.valTitle,
          valText: doc.valText || prev.valText,
          coreValuesList: doc.coreValuesList || prev.coreValuesList,
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
          <h2 className="text-section-title font-extrabold text-primary mb-4">{content.valTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto whitespace-pre-line">
            {content.valText}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.coreValuesList?.map((v: any, i: number) => {
            const theme = THEMES[i % THEMES.length];
            return (
              <div
                key={i}
                className={`fade-up stagger-${i + 1} bg-card rounded-2xl p-6 border border-border card-lift shadow-card group text-center`}
              >
                <div className={`w-14 h-14 rounded-2xl ${theme.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={v.icon as Parameters<typeof Icon>[0]['name']} size={26} className={theme.iconColor} />
                </div>
                <h3 className="font-bold text-base text-primary mb-3">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc || v.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
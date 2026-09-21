'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { subscribeDocument } from '@/lib/firebase/db';

export default function ObjectivesSection() {
  const ref = useRef<HTMLElement>(null);
  const [content, setContent] = useState({
    objTitle: 'Our Key Objectives',
    objText: 'Seven core commitments that guide how we operate and serve our clients and candidates.',
    objectivesList: [
      { num: '01', title: 'Connect Employers with Candidates', text: 'To provide effective recruitment and staffing solutions that meet operational requirements.', icon: 'LinkIcon' },
      { num: '02', title: 'Support Candidates', text: 'To help individuals identify employment opportunities that match their skills and experience.', icon: 'UserIcon' },
      { num: '03', title: 'Maintain Professional Standards', text: 'To operate transparent and responsible recruitment processes at all times.', icon: 'StarIcon' },
      { num: '04', title: 'Develop Long-Term Relationships', text: 'To build lasting relationships with employers, candidates and business partners.', icon: 'HandshakeIcon' },
      { num: '05', title: 'Support Workforce Flexibility', text: 'To help organisations respond to changing staffing requirements quickly and efficiently.', icon: 'ArrowPathIcon' },
      { num: '06', title: 'Promote Equal Opportunity', text: 'To provide fair and inclusive recruitment processes accessible to all candidates.', icon: 'ScaleIcon' },
      { num: '07', title: 'Maintain Appropriate Compliance', text: 'To undertake relevant checks and processes according to the role, sector and applicable requirements.', icon: 'ClipboardDocumentCheckIcon' },
    ]
  });

  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', 'homepage', (doc) => {
      if (doc) {
        setContent(prev => ({
          objTitle: doc.objTitle || prev.objTitle,
          objText: doc.objText || prev.objText,
          objectivesList: doc.objectivesList || prev.objectivesList,
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
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Ensure last item spans full width
  const items = content.objectivesList || [];
  const initialItems = items.slice(0, Math.max(0, items.length - 1));
  const lastItem = items.length > 0 ? items[items.length - 1] : null;

  return (
    <section ref={ref} className="section-padding bg-muted" aria-label="Our key objectives">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 fade-up">
          <div className="section-label justify-center mb-4">What We Stand For</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">{content.objTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto whitespace-pre-line">
            {content.objText}
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {initialItems.map((obj: any, i: number) => (
            <div
              key={i}
              className={`fade-up stagger-${Math.min(i + 1, 6)} bg-card rounded-2xl p-6 border border-border card-lift shadow-card group`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <span className="text-accent font-extrabold text-sm font-mono">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-primary mb-2">{obj.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{obj.text}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Last card spans full width */}
          {lastItem && (
            <div className="fade-up stagger-6 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 border border-primary/20 shadow-card lg:col-span-3">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <span className="text-white font-extrabold text-sm font-mono">
                      {String(items.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-base text-white mb-2">{lastItem.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed max-w-2xl">{lastItem.text}</p>
                </div>
                <div className="ml-auto hidden lg:block">
                  <Icon name={lastItem.icon as Parameters<typeof Icon>[0]['name'] || "ClipboardDocumentCheckIcon"} size={40} className="text-accent/30" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
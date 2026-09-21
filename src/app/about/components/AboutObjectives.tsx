'use client';

import React, { useEffect, useRef, useState } from 'react';
import { subscribeDocument } from '@/lib/firebase/db';

export default function AboutObjectives() {
  const ref = useRef<HTMLElement>(null);
  const [content, setContent] = useState({
    objTitle: 'Our Key Objectives',
    objText: 'Seven core commitments that guide how we operate, serve our clients, and support our candidates.',
    objectivesList: [
      { title: 'Connect Employers with Candidates', text: 'To provide effective recruitment and staffing solutions that meet operational requirements.' },
      { title: 'Support Candidates', text: 'To help individuals identify employment opportunities that match their skills and experience.' },
      { title: 'Maintain Professional Standards', text: 'To operate transparent and responsible recruitment processes at all times.' },
      { title: 'Develop Long-Term Relationships', text: 'To build lasting relationships with employers, candidates and business partners.' },
      { title: 'Support Workforce Flexibility', text: 'To help organisations respond to changing staffing requirements quickly and efficiently.' },
      { title: 'Promote Equal Opportunity', text: 'To provide fair and inclusive recruitment processes accessible to all candidates.' },
      { title: 'Maintain Appropriate Compliance', text: 'To undertake relevant checks and processes according to the role, sector and applicable requirements.' },
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
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-background" aria-label="Key objectives">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 fade-up">
          <div className="section-label justify-center mb-4">Our Commitments</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">{content.objTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto whitespace-pre-line">
            {content.objText}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.objectivesList?.slice(0, 6)?.map((obj: any, i: number) => {
            const num = (i + 1).toString().padStart(2, '0');
            return (
              <div
                key={i}
                className={`fade-up stagger-${Math.min(i + 1, 6)} bg-card rounded-2xl p-6 border border-border card-lift shadow-card`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-extrabold text-sm font-mono">{num}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-primary mb-2">{obj?.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{obj?.desc || obj?.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
          {content.objectivesList?.length > 6 && (
            <div className="fade-up stagger-6 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 shadow-card lg:col-span-3">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-extrabold text-sm font-mono">
                    {content.objectivesList.length.toString().padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-white mb-2">{content.objectivesList[content.objectivesList.length - 1]?.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed max-w-2xl">{content.objectivesList[content.objectivesList.length - 1]?.desc || content.objectivesList[content.objectivesList.length - 1]?.text}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
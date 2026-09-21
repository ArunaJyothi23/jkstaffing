'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { subscribeDocument } from '@/lib/firebase/db';

export default function EmployerProcess() {
  const ref = useRef<HTMLElement>(null);
  const [content, setContent] = useState({
    processTitle: 'Our Staffing Process',
    processText: 'A clear, straightforward approach to finding and placing the right people for your business.',
    processSteps: [
      { num: '01', icon: 'ChatBubbleLeftRightIcon', title: 'Tell Us Your Requirements', desc: 'Share your staffing needs — roles, numbers, skills required, start date and any sector-specific requirements.' },
      { num: '02', icon: 'MagnifyingGlassIcon', title: 'Candidate Sourcing', desc: 'We search our network and actively recruit suitable candidates matching your specific criteria.' },
      { num: '03', icon: 'ClipboardDocumentCheckIcon', title: 'Screening & Verification', desc: 'Candidates undergo appropriate identity, right-to-work, reference and sector-specific compliance checks.' },
      { num: '04', icon: 'UserGroupIcon', title: 'Shortlisting', desc: 'We present you with a shortlist of qualified candidates ready for your review or interview.' },
      { num: '05', icon: 'CheckBadgeIcon', title: 'Placement', desc: 'Successful candidates are placed with your organisation with full coordination and onboarding support.' },
      { num: '06', icon: 'ArrowPathIcon', title: 'Ongoing Support', desc: 'We provide continued workforce support, including temporary cover, scheduling and HR administration.' },
    ]
  });

  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', 'employers_page', (doc) => {
      if (doc) {
        setContent(prev => ({
          processTitle: doc.processTitle || prev.processTitle,
          processText: doc.processText || prev.processText,
          processSteps: doc.processSteps || prev.processSteps,
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-muted" aria-label="Our staffing process">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 fade-up">
          <div className="section-label justify-center mb-4">How It Works</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">{content.processTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto whitespace-pre-line">{content.processText}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.processSteps?.map((step: any, i: number) => (
            <div key={i} className={`fade-up stagger-${Math.min(i + 1, 6)} bg-card rounded-2xl p-6 border border-border shadow-card card-lift`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-extrabold text-sm font-mono">{step.num || (i + 1).toString().padStart(2, '0')}</span>
                </div>
                <Icon name={step.icon as Parameters<typeof Icon>[0]['name']} size={20} className="text-secondary" />
              </div>
              <h3 className="font-bold text-base text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { subscribeDocument } from '@/lib/firebase/db';

const THEMES = [
  { color: 'from-primary/5 to-secondary/5', accent: 'text-secondary' },
  { color: 'from-accent/5 to-accent/10', accent: 'text-accent' },
  { color: 'from-secondary/5 to-primary/5', accent: 'text-secondary' },
  { color: 'from-primary/5 to-primary/10', accent: 'text-primary' },
  { color: 'from-accent/5 to-secondary/5', accent: 'text-accent' },
  { color: 'from-secondary/5 to-accent/5', accent: 'text-secondary' },
];

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const [content, setContent] = useState({
    servTitle: 'Our Workforce Services',
    servText: 'Flexible staffing and workforce solutions designed around your organisation.',
    servicesList: [
      {
        icon: 'UserGroupIcon',
        title: 'Staffing & Recruitment',
        desc: 'We provide full end-to-end recruitment solutions designed to remove the burden of hiring from your internal teams.',
        offerings: 'Candidate sourcing, CV screening, Background checks, Initial interviews, Shortlisting, Placement coordination',
      },
      {
        icon: 'ClockIcon',
        title: 'Temporary Staffing',
        desc: 'When operational demand spikes or unexpected absences occur, our temporary staffing solutions offer quick, reliable workforce support.',
        offerings: 'Peak season cover, Event staffing, Project-based contracts, Emergency cover, Sickness/absence fills',
      },
      {
        icon: 'BriefcaseIcon',
        title: 'Permanent Recruitment',
        desc: 'Finding long-term talent requires a detailed understanding of both technical capability and company culture.',
        offerings: 'Role requirement analysis, Targeted candidate searches, Shortlisting, Interview coordination, Placement support',
      },
      {
        icon: 'ShieldCheckIcon',
        title: 'Security Staffing',
        desc: 'We provide qualified security personnel to protect physical sites, events and assets with strict vetting and SIA licence verification.',
        offerings: 'Security officers, Door supervisors, Event security, Corporate reception, Mobile patrols, Site security',
        note: 'All security staff undergo strict vetting and SIA licence verification prior to deployment.',
      },
      {
        icon: 'ChartBarIcon',
        title: 'Workforce Management',
        desc: 'Beyond filling roles, we assist businesses in managing day-to-day workforce logistics to streamline operational efficiency.',
        offerings: 'Shift scheduling, Attendance tracking, Timesheet administration, Workforce reporting, Candidate onboarding',
      },
      {
        icon: 'DocumentTextIcon',
        title: 'HR Support',
        desc: 'Practical administrative and human resources assistance for organisations needing support with workforce management processes.',
        offerings: 'Recruitment administration, Personnel documentation, Employee onboarding support, HR records administration',
      },
    ]
  });

  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', 'homepage', (doc) => {
      if (doc) {
        setContent(prev => ({
          servTitle: doc.servTitle || prev.servTitle,
          servText: doc.servText || prev.servText,
          servicesList: doc.servicesList || prev.servicesList,
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

  return (
    <section ref={ref} className="section-padding bg-background" id="services" aria-label="Our services">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 fade-up">
          <div className="section-label justify-center mb-4">Our Services</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">{content.servTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto whitespace-pre-line">
            {content.servText}
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.servicesList?.map((service: any, i: number) => {
            const theme = THEMES[i % THEMES.length];
            const offeringsArray = typeof service.offerings === 'string' ? service.offerings.split(',').map((s: string) => s.trim()) : service.offerings;

            return (
              <div
                key={i}
                className={`fade-up stagger-${Math.min(i + 1, 6)} service-card bg-card rounded-2xl border border-border overflow-hidden card-lift shadow-card`}
              >
                <div className={`service-card-inner p-6 bg-gradient-to-br ${theme.color} flex flex-col h-full`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${theme.accent === 'text-accent' ? 'bg-accent/10' : theme.accent === 'text-secondary' ? 'bg-secondary/10' : 'bg-primary/10'}`}>
                    <Icon name={service.icon as Parameters<typeof Icon>[0]['name']} size={22} className={theme.accent} />
                  </div>
                  <h3 className="font-bold text-lg text-primary mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                  
                  {offeringsArray && offeringsArray.length > 0 && (
                    <ul className="flex flex-col gap-1.5 mb-4 flex-1">
                      {offeringsArray.map((o: string, idx: number) => (
                        <li key={idx} className="check-item text-sm text-foreground/80">
                          <div className="check-icon">
                            <Icon name="CheckIcon" size={10} className="text-accent" />
                          </div>
                          {o}
                        </li>
                      ))}
                    </ul>
                  )}

                  {service.note && (
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 mb-4 text-xs text-muted-foreground mt-auto">
                      <Icon name="InformationCircleIcon" size={12} className="text-primary inline mr-1" />
                      {service.note}
                    </div>
                  )}

                  <Link href="/for-employers" className={`text-sm font-semibold ${theme.accent} hover:text-primary flex items-center gap-1 transition-colors ${!service.note ? 'mt-auto' : ''} group`}>
                    Explore {service.title}
                    <Icon name="ArrowRightIcon" size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
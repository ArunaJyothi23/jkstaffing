'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const services = [
  {
    icon: 'UserGroupIcon',
    title: 'Staffing & Recruitment',
    desc: 'We provide full end-to-end recruitment solutions designed to remove the burden of hiring from your internal teams.',
    offerings: ['Candidate sourcing', 'CV screening', 'Background checks', 'Initial interviews', 'Shortlisting', 'Placement coordination'],
    color: 'from-primary/5 to-secondary/5',
    accent: 'text-secondary',
  },
  {
    icon: 'ClockIcon',
    title: 'Temporary Staffing',
    desc: 'When operational demand spikes or unexpected absences occur, our temporary staffing solutions offer quick, reliable workforce support.',
    offerings: ['Peak season cover', 'Event staffing', 'Project-based contracts', 'Emergency cover', 'Sickness/absence fills'],
    color: 'from-accent/5 to-accent/10',
    accent: 'text-accent',
  },
  {
    icon: 'BriefcaseIcon',
    title: 'Permanent Recruitment',
    desc: 'Finding long-term talent requires a detailed understanding of both technical capability and company culture.',
    offerings: ['Role requirement analysis', 'Targeted candidate searches', 'Shortlisting', 'Interview coordination', 'Placement support'],
    color: 'from-secondary/5 to-primary/5',
    accent: 'text-secondary',
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Security Staffing',
    desc: 'We provide qualified security personnel to protect physical sites, events and assets with strict vetting and SIA licence verification.',
    offerings: ['Security officers', 'Door supervisors', 'Event security', 'Corporate reception', 'Mobile patrols', 'Site security'],
    color: 'from-primary/5 to-primary/10',
    accent: 'text-primary',
    note: 'All security staff undergo strict vetting and SIA licence verification prior to deployment.',
  },
  {
    icon: 'ChartBarIcon',
    title: 'Workforce Management',
    desc: 'Beyond filling roles, we assist businesses in managing day-to-day workforce logistics to streamline operational efficiency.',
    offerings: ['Shift scheduling', 'Attendance tracking', 'Timesheet administration', 'Workforce reporting', 'Candidate onboarding'],
    color: 'from-accent/5 to-secondary/5',
    accent: 'text-accent',
  },
  {
    icon: 'DocumentTextIcon',
    title: 'HR Support',
    desc: 'Practical administrative and human resources assistance for organisations needing support with workforce management processes.',
    offerings: ['Recruitment administration', 'Personnel documentation', 'Employee onboarding support', 'HR records administration'],
    color: 'from-secondary/5 to-accent/5',
    accent: 'text-secondary',
  },
];

export default function ServicesSection() {
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
    <section ref={ref} className="section-padding bg-background" id="services" aria-label="Our services">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 fade-up">
          <div className="section-label justify-center mb-4">Our Services</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">Our Workforce Services</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible staffing and workforce solutions designed around your organisation.
          </p>
        </div>

        {/* BENTO GRID: 6 cards, 3-col */}
        {/* Row 1: [col-1: Staffing cs-1] [col-2: Temporary cs-1] [col-3: Permanent cs-1] */}
        {/* Row 2: [col-1: Security cs-1] [col-2: Workforce cs-1] [col-3: HR Support cs-1] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`fade-up stagger-${Math.min(i + 1, 6)} service-card bg-card rounded-2xl border border-border overflow-hidden card-lift shadow-card`}
            >
              <div className={`service-card-inner p-6 bg-gradient-to-br ${service.color} flex flex-col h-full`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.accent === 'text-accent' ? 'bg-accent/10' : service.accent === 'text-secondary' ? 'bg-secondary/10' : 'bg-primary/10'}`}>
                  <Icon name={service.icon as Parameters<typeof Icon>[0]['name']} size={22} className={service.accent} />
                </div>
                <h3 className="font-bold text-lg text-primary mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                <ul className="flex flex-col gap-1.5 mb-4 flex-1">
                  {service.offerings.map((o) => (
                    <li key={o} className="check-item text-sm text-foreground/80">
                      <div className="check-icon">
                        <Icon name="CheckIcon" size={10} className="text-accent" />
                      </div>
                      {o}
                    </li>
                  ))}
                </ul>
                {service.note && (
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-3 mb-4 text-xs text-muted-foreground">
                    <Icon name="InformationCircleIcon" size={12} className="text-primary inline mr-1" />
                    {service.note}
                  </div>
                )}
                <Link href="/for-employers" className="text-sm font-semibold text-secondary hover:text-primary flex items-center gap-1 transition-colors mt-auto group">
                  Explore {service.title}
                  <Icon name="ArrowRightIcon" size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
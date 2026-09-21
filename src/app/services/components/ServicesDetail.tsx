'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const services = [
  {
    id: 'staffing-recruitment',
    icon: 'UserGroupIcon',
    title: 'Staffing & Recruitment',
    tagline: 'End-to-end recruitment solutions',
    desc: 'We provide full end-to-end recruitment solutions designed to remove the burden of hiring from your internal teams. We source, screen and interview candidates before introducing them to your organisation.',
    offerings: [
      'Candidate sourcing from multiple channels',
      'CV screening and assessment',
      'Background and reference checks',
      'Initial interviews and assessments',
      'Shortlisting and candidate presentation',
      'Placement coordination and support',
    ],
    cta: 'Request Staffing',
    href: '/for-employers',
  },
  {
    id: 'temporary-staffing',
    icon: 'ClockIcon',
    title: 'Temporary Staffing',
    tagline: 'Flexible workforce cover when you need it',
    desc: 'When operational demand spikes or unexpected absences occur, our temporary staffing solutions offer quick, reliable workforce support to keep your operations running smoothly.',
    offerings: [
      'Peak season workforce cover',
      'Event and project staffing',
      'Project-based contract placements',
      'Emergency and same-day cover',
      'Sickness and absence fills',
    ],
    cta: 'Request Temporary Staff',
    href: '/for-employers',
  },
  {
    id: 'permanent-recruitment',
    icon: 'BriefcaseIcon',
    title: 'Permanent Recruitment',
    tagline: 'Long-term talent acquisition',
    desc: 'Finding long-term talent requires a detailed understanding of both technical capability and company culture. We identify and present qualified candidates looking for long-term career growth.',
    offerings: [
      'Detailed role requirement analysis',
      'Targeted and proactive candidate searches',
      'Comprehensive shortlisting process',
      'Interview scheduling and coordination',
      'Offer management and placement support',
    ],
    cta: 'Find Permanent Staff',
    href: '/for-employers',
  },
  {
    id: 'security-staffing',
    icon: 'ShieldCheckIcon',
    title: 'Security Staffing',
    tagline: 'Qualified, verified security personnel',
    desc: 'We provide qualified security personnel to protect physical sites, events and assets. All security staff undergo strict vetting and SIA licence verification prior to deployment.',
    offerings: [
      'Security officers for commercial sites',
      'SIA-licensed door supervisors',
      'Event and venue security teams',
      'Corporate reception security',
      'Mobile patrol services',
      'Site and construction security',
    ],
    note: 'All security personnel undergo SIA licence verification and sector-specific compliance checks prior to deployment.',
    cta: 'Request Security Staff',
    href: '/for-employers',
  },
  {
    id: 'workforce-management',
    icon: 'ChartBarIcon',
    title: 'Workforce Management',
    tagline: 'Operational workforce coordination',
    desc: 'Beyond filling roles, we assist businesses in managing day-to-day workforce logistics to streamline operational efficiency and reduce administrative burden.',
    offerings: [
      'Shift scheduling and rota management',
      'Attendance tracking and monitoring',
      'Timesheet administration',
      'Workforce performance reporting',
      'Candidate onboarding support',
    ],
    cta: 'Discuss Workforce Management',
    href: '/for-employers',
  },
  {
    id: 'hr-support',
    icon: 'DocumentTextIcon',
    title: 'HR Support',
    tagline: 'Practical HR administrative assistance',
    desc: 'Practical administrative and human resources assistance for organisations needing support with workforce management processes and personnel administration.',
    offerings: [
      'Recruitment process administration',
      'Personnel documentation management',
      'Employee onboarding support and coordination',
      'HR records administration',
    ],
    cta: 'Discuss HR Support',
    href: '/for-employers',
  },
];

export default function ServicesDetail() {
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
    <section ref={ref} className="section-padding bg-background" aria-label="Services detail">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col gap-16">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className={`fade-up grid grid-cols-1 lg:grid-cols-2 gap-10 items-start pb-16 ${i < services.length - 1 ? 'border-b border-border' : ''}`}
            >
              {/* Left */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Icon name={service.icon as Parameters<typeof Icon>[0]['name']} size={26} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{service.tagline}</div>
                    <h2 className="font-extrabold text-xl text-primary">{service.title}</h2>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                {service.note && (
                  <div className="bg-accent/8 border border-accent/20 rounded-xl p-4 flex items-start gap-3">
                    <Icon name="ShieldCheckIcon" size={18} className="text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground/80">{service.note}</p>
                  </div>
                )}
                <Link href={service.href} className="btn-primary self-start">
                  {service.cta}
                  <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>

              {/* Right: Offerings */}
              <div className="bg-muted rounded-2xl p-6 border border-border">
                <div className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                  <Icon name="ListBulletIcon" size={16} className="text-accent" />
                  Key Offerings
                </div>
                <ul className="flex flex-col gap-3">
                  {service.offerings.map((offering) => (
                    <li key={offering} className="check-item">
                      <div className="check-icon">
                        <Icon name="CheckIcon" size={10} className="text-accent" />
                      </div>
                      <span className="text-sm text-foreground">{offering}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
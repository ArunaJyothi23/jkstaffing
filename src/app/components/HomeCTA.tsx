'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function HomeCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D2353 0%, #1A4B9E 60%, #0D2353 100%)' }}
      aria-label="Call to action"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 right-1/4 w-72 h-72 blob-accent opacity-20 pointer-events-none" />

      <div className="container max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10">
        <div className="fade-up section-label justify-center text-white/60 mb-4">Get Started Today</div>
        <h2 className="fade-up stagger-1 text-display font-extrabold text-white mb-6">
          Ready to Find the Right Staffing Solution?
        </h2>
        <p className="fade-up stagger-2 text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Whether you are an employer looking for reliable staff or a candidate seeking your next opportunity, JK Staffing is here to help.
        </p>
        <div className="fade-up stagger-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/for-employers" className="btn-primary text-base py-3.5 px-8 justify-center">
            Request Staff
            <Icon name="ArrowRightIcon" size={18} />
          </Link>
          <Link href="/for-candidates" className="btn-outline-white text-base py-3.5 px-8 justify-center">
            Find a Job
            <Icon name="MagnifyingGlassIcon" size={18} />
          </Link>
          <Link href="/contact" className="btn-outline-white text-base py-3.5 px-8 justify-center">
            Contact Us
            <Icon name="EnvelopeIcon" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
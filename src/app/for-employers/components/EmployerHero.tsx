'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function EmployerHero() {
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
      { threshold: 0.1 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[60vh] flex items-center overflow-hidden pt-24"
      style={{ background: 'linear-gradient(135deg, #0D2353 0%, #1A4B9E 60%, #0D2353 100%)' }}
      aria-label="Employer hero">
      
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_133b1e7cf-1768750078214.png"
          alt="Business professionals in a corporate meeting room reviewing staffing plans, bright modern UK office, professional environment"
          fill
          priority
          className="object-cover"
          sizes="100vw" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>
      <div className="container max-w-7xl mx-auto px-4 lg:px-8 py-20 relative z-10">
        <div className="max-w-3xl">
          <div className="fade-up section-label text-primary mb-4">For Employers</div>
          <h1 className="fade-up stagger-1 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-primary mb-6">
            Find the Right People for Your Business
          </h1>
          <p className="fade-up stagger-2 text-foreground/90 font-medium text-lg leading-relaxed mb-8">
            Whether you need short-term cover, permanent recruitment, specialist security personnel or complete workforce coordination, JK Staffing provides tailored staffing solutions built around your business requirements.
          </p>
          <div className="fade-up stagger-3 flex flex-wrap gap-3">
            <a href="#request-staff" className="btn-primary text-base py-3 px-7">
              Request Staff Now
              <Icon name="ArrowDownIcon" size={16} />
            </a>
            <Link href="/contact" className="btn-secondary text-base py-3 px-7">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>);

}
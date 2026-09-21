'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const badges = [
{ label: 'Staffing', icon: 'UserGroupIcon' },
{ label: 'Recruitment', icon: 'BriefcaseIcon' },
{ label: 'Workforce', icon: 'BuildingOfficeIcon' },
{ label: 'Security', icon: 'ShieldCheckIcon' },
{ label: 'HR Support', icon: 'DocumentTextIcon' }];


export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

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
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D2353 0%, #1A4B9E 55%, #0D2353 100%)' }}
      aria-label="Hero section">
      
      {/* Background Image with scrim */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png"
          alt="Diverse professionals collaborating in a modern UK office environment, bright natural light, professional attire"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>

      {/* Atmospheric blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 blob-accent opacity-30 pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 blob-primary opacity-20 pointer-events-none z-0" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 80%)'
        }} />
      

      <div className="relative z-10 container max-w-7xl mx-auto px-4 lg:px-8 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="fade-up section-label text-primary">
              <span className="w-6 h-0.5 bg-accent inline-block" />
              UK Staffing & Workforce Management
            </div>

            <h1 className="fade-up stagger-1 text-4xl md:text-5xl lg:text-6xl font-black text-primary leading-tight tracking-tighter">
              Connecting Businesses with{' '}
              <span className="text-accent">Reliable People</span>{' '}
              & Candidates with Great Opportunities
            </h1>

            <p className="fade-up stagger-2 text-foreground/90 text-lg leading-relaxed max-w-2xl font-medium">
              JK Staffing & Services Management Ltd is a UK-based workforce agency established on 16 April 2021. We specialise in connecting organisations across multiple sectors with dependable personnel while assisting job seekers in finding roles that match their skills, experience, and career goals.
            </p>

            <div className="fade-up stagger-3 flex flex-wrap gap-3 mt-2">
              <Link href="/for-employers" className="btn-primary text-base py-3 px-7">
                Hire Staff
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
              <Link href="/for-candidates" className="btn-secondary text-base py-3 px-7">
                Find a Job
                <Icon name="MagnifyingGlassIcon" size={16} />
              </Link>
              <Link href="/contact" className="text-primary hover:text-secondary text-sm font-bold flex items-center gap-2 transition-colors duration-200 self-center ml-2">
                Contact Us
                <Icon name="ArrowRightIcon" size={14} />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="fade-up stagger-4 flex flex-wrap gap-4 mt-4">
              {[
              { text: 'Est. April 2021', icon: 'CalendarIcon' },
              { text: 'UK-Based Agency', icon: 'MapPinIcon' },
              { text: 'Multi-Sector Staffing', icon: 'BuildingOffice2Icon' }].
              map((item) =>
              <div key={item.text} className="flex items-center gap-2 text-foreground/80 font-medium text-sm">
                  <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={14} className="text-accent" />
                  {item.text}
                </div>
              )}
            </div>
          </div>

          {/* Right: Floating cards */}
          <div className="hidden lg:flex lg:col-span-5 relative h-96 items-center justify-center">
            {/* Central card */}
            <div className="glass-card rounded-2xl p-6 w-64 absolute z-20 animate-float">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon name="UserGroupIcon" size={20} className="text-accent" />
                </div>
                <div>
                  <div className="font-bold text-sm text-primary">Workforce Solutions</div>
                  <div className="text-xs text-muted-foreground">Tailored to your needs</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {badges.map((b) =>
                <div key={b.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name={b.icon as Parameters<typeof Icon>[0]['name']} size={12} className="text-secondary" />
                    {b.label}
                  </div>
                )}
              </div>
            </div>

            {/* Top right badge */}
            <div className="floating-badge absolute top-0 right-0 z-30 animate-float-delay">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Icon name="CheckBadgeIcon" size={16} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-xs text-primary">Compliance-Focused</div>
                <div className="text-xs text-muted-foreground">Rigorous verification</div>
              </div>
            </div>

            {/* Bottom left badge */}
            <div className="floating-badge absolute bottom-0 left-0 z-30">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Icon name="BriefcaseIcon" size={16} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-xs text-primary">Fast Placement</div>
                <div className="text-xs text-muted-foreground">Responsive service</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 20C480 40 240 80 0 40L0 80Z" fill="#F8FAFD" />
        </svg>
      </div>
    </section>);

}
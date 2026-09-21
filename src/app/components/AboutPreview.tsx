'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { subscribeDocument } from '@/lib/firebase/db';

const stats = [
{ value: 2021, suffix: '', label: 'Year Established', prefix: '' },
{ value: 6, suffix: '+', label: 'Service Areas', prefix: '' },
{ value: 6, suffix: '+', label: 'Industries Served', prefix: '' },
{ value: 10, suffix: '+', label: 'Compliance Checks', prefix: '' }];


function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ stat, animate }: {stat: typeof stats[0];animate: boolean;}) {
  const count = useCountUp(stat.value, 1200, animate);
  return (
    <div className="text-center p-6 bg-card rounded-2xl border border-border shadow-card">
      <div className="text-3xl font-extrabold text-primary mb-1">
        {stat.prefix}{animate ? count : 0}{stat.suffix}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
    </div>);

}

export default function AboutPreview() {
  const ref = useRef<HTMLElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimate(true);
            entry.target.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const [content, setContent] = useState({
    aboutTitle: 'People. Service. Opportunity.',
    aboutDescription: 'JK Staffing & Services Management Ltd provides human resources management, staffing solutions, and private security activities across the UK. We bridge the gap between businesses seeking dependable staff and individuals seeking meaningful work.',
    aboutVision: 'To be a trusted recruitment and workforce partner known for integrity, high compliance standards, and strong long-term business relationships.',
    aboutMission: 'To deliver flexible, high-quality recruitment and HR support that helps employers maintain operational success while empowering job seekers.',
    aboutImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a1c35946-1769214275939.png',
  });

  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', 'global', (doc) => {
      if (doc) {
        setContent(prev => ({
          aboutTitle: doc.aboutTitle || prev.aboutTitle,
          aboutDescription: doc.aboutDescription || prev.aboutDescription,
          aboutVision: doc.aboutVision || prev.aboutVision,
          aboutMission: doc.aboutMission || prev.aboutMission,
          aboutImage: doc.aboutImage || prev.aboutImage,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section ref={ref} className="section-padding bg-muted overflow-hidden" aria-label="About JK Staffing">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="fade-up relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-card-hover">
              <AppImage
                src={content.aboutImage}
                alt="Professional UK staffing team in a bright modern office, collaborative discussion, diverse group"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw" />
              
            </div>
            {/* Floating badge */}
            <div className="floating-badge absolute -bottom-4 -right-4 z-10">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Icon name="CalendarDaysIcon" size={18} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-primary">Est. April 2021</div>
                <div className="text-xs text-muted-foreground">UK-Based Agency</div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col gap-6">
            <div className="fade-up stagger-1 section-label">About Us</div>
            <h2 className="fade-up stagger-2 text-section-title font-extrabold text-primary">
              {content.aboutTitle}
            </h2>
            <p className="fade-up stagger-3 text-muted-foreground leading-relaxed whitespace-pre-line">
              {content.aboutDescription}
            </p>
            <div className="fade-up stagger-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-xl p-5 border border-border">
                <div className="font-bold text-secondary mb-1 text-sm">Our Vision</div>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{content.aboutVision}</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border">
                <div className="font-bold text-secondary mb-1 text-sm">Our Mission</div>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{content.aboutMission}</p>
              </div>
            </div>
            <div className="fade-up stagger-5">
              <Link href="/about" className="btn-primary self-start">
                Learn More About Us
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {stats.map((stat, i) =>
          <div key={stat.label} className={`fade-up stagger-${i + 1}`}>
              <StatCard stat={stat} animate={animate} />
            </div>
          )}
        </div>
      </div>
    </section>);

}
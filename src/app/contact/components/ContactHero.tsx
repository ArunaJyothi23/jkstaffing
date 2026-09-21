'use client';

import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { subscribeDocument } from '@/lib/firebase/db';

export default function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  const [content, setContent] = useState({
    heroTitle: 'Get in Touch',
    heroText: 'Whether you are an employer looking for reliable staff or a candidate seeking your next opportunity, we are here to help.',
    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',
  });

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

    const unsubscribe = subscribeDocument('site_content', 'contact_page', (doc) => {
      if (doc) setContent(prev => ({ ...prev, ...doc }));
    });

    return () => {
      observer?.disconnect();
      unsubscribe();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[55vh] flex items-center overflow-hidden pt-24"
      style={{ background: 'linear-gradient(135deg, #0D2353 0%, #1A4B9E 60%, #0D2353 100%)' }}
      aria-label="Contact hero">
      
      <div className="absolute inset-0 z-0">
        <AppImage
          src={content.heroImage}
          alt={content.heroTitle}
          fill
          priority
          className="object-cover"
          sizes="100vw" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>
      <div className="container max-w-7xl mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="max-w-3xl">
          <div className="fade-up section-label text-primary mb-4">Get In Touch</div>
          <h1 className="fade-up stagger-1 text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-primary mb-6">
            {content.heroTitle}
          </h1>
          <p className="fade-up stagger-2 text-foreground/90 font-medium text-lg leading-relaxed mb-8">
            {content.heroText}
          </p>
          <div className="fade-up stagger-3 flex flex-wrap gap-6">
            <div className="flex items-center gap-3 text-foreground/80">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Icon name="ClockIcon" size={18} className="text-accent" />
              </div>
              <div>
                <div className="text-xs text-foreground/60 font-medium">Office Hours</div>
                <div className="text-sm font-semibold text-primary">Mon–Fri: 10:00–18:00</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-foreground/80">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Icon name="EnvelopeIcon" size={18} className="text-accent" />
              </div>
              <div>
                <div className="text-xs text-foreground/60 font-medium">Email</div>
                <div className="text-sm font-semibold text-primary">[Insert Company Email]</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-foreground/80">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Icon name="PhoneIcon" size={18} className="text-accent" />
              </div>
              <div>
                <div className="text-xs text-foreground/60 font-medium">Phone</div>
                <div className="text-sm font-semibold text-primary">[Insert Telephone Number]</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
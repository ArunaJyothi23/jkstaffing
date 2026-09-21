'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { subscribeDocument } from '@/lib/firebase/db';

export default function ServicesCTA() {
  const [content, setContent] = useState({
    ctaTitle: 'Ready to Discuss Your Requirements?',
    ctaText: 'Contact our team to discuss which services best fit your business or career needs.',
  });

  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', 'services_page', (doc) => {
      if (doc) {
        setContent(prev => ({
          ctaTitle: doc.ctaTitle || prev.ctaTitle,
          ctaText: doc.ctaText || prev.ctaText,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D2353 0%, #1A4B9E 60%, #0D2353 100%)' }}
      aria-label="Services call to action"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="container max-w-4xl mx-auto px-4 lg:px-8 text-center relative z-10">
        <h2 className="text-display font-extrabold text-white mb-4">{content.ctaTitle}</h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto whitespace-pre-line">
          {content.ctaText}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/for-employers" className="btn-primary py-3.5 px-8 justify-center">
            Request Staff
            <Icon name="ArrowRightIcon" size={16} />
          </Link>
          <Link href="/for-candidates" className="btn-outline-white py-3.5 px-8 justify-center">
            Find a Job
            <Icon name="MagnifyingGlassIcon" size={16} />
          </Link>
          <Link href="/contact" className="btn-outline-white py-3.5 px-8 justify-center">
            Contact Us
            <Icon name="EnvelopeIcon" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
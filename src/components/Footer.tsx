import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="bg-primary text-white/90 pt-16 pb-8 border-t border-white/10">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <AppLogo
                src="/assets/images/WhatsApp_Image_2026-09-18_at_00.22.15-1789930078168.jpeg"
                size={48}
                className="rounded-lg"
              />
              <div>
                <div className="font-bold text-white text-base leading-tight">JK Staffing</div>
                <div className="text-white/60 text-xs">& Services Management Ltd</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-5">
              Connecting businesses with reliable people and candidates with great opportunities across the UK.
            </p>
            <p className="text-white/40 text-xs">Established 16 April 2021</p>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4 tracking-wide uppercase">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Contact Us', href: '/contact' },
              ]?.map((l) => (
                <li key={l?.label}>
                  <Link href={l?.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <Icon name="ChevronRightIcon" size={12} className="text-accent group-hover:translate-x-0.5 transition-transform" />
                    {l?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4 tracking-wide uppercase">For Employers</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Request Staff', href: '/for-employers' },
                { label: 'Our Services', href: '/services' },
                { label: 'Industries', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
              ]?.map((l) => (
                <li key={l?.label}>
                  <Link href={l?.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <Icon name="ChevronRightIcon" size={12} className="text-accent group-hover:translate-x-0.5 transition-transform" />
                    {l?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-sm mb-4 tracking-wide uppercase">For Candidates</h3>
            <ul className="flex flex-col gap-2.5 mb-6">
              {[
                { label: 'Find Jobs', href: '/for-candidates' },
                { label: 'Submit Your CV', href: '/for-candidates' },
                { label: 'Candidate Support', href: '/for-candidates' },
              ]?.map((l) => (
                <li key={l?.label}>
                  <Link href={l?.href} className="text-sm text-white/60 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <Icon name="ChevronRightIcon" size={12} className="text-accent group-hover:translate-x-0.5 transition-transform" />
                    {l?.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Icon name="ClockIcon" size={14} className="text-accent flex-shrink-0" />
                <span>Mon–Fri: 10:00–18:00</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="EnvelopeIcon" size={14} className="text-accent flex-shrink-0" />
                <span>[Insert Company Email]</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-white/40 text-sm text-center sm:text-left">
            © {new Date()?.getFullYear()} JK Staffing & Services Management Ltd. All Rights Reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Cookie Policy', 'Terms & Conditions']?.map((item) => (
              <Link key={item} href="/contact" className="text-xs text-white/40 hover:text-white/70 transition-colors duration-200">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
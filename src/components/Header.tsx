'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Staffing & Recruitment', href: '/services' },
      { label: 'Temporary Staffing', href: '/services' },
      { label: 'Permanent Recruitment', href: '/services' },
      { label: 'Security Staffing', href: '/services' },
      { label: 'Workforce Management', href: '/services' },
      { label: 'HR Support', href: '/services' },
    ],
  },
  { label: 'For Employers', href: '/for-employers' },
  { label: 'For Candidates', href: '/for-candidates' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 ${
          scrolled ? 'pt-3' : 'pt-5'
        }`}
      >
        <div className={`container max-w-7xl mx-auto transition-all duration-300 bg-white rounded-2xl ${
          scrolled ? 'shadow-nav py-1.5 px-4 lg:px-6' : 'shadow-lg py-2 px-4 lg:px-6'
        }`}>
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group" aria-label="JK Staffing Home">
              <Image
                src="/assets/images/logo.jpg"
                alt="JK Staffing Logo"
                width={280}
                height={80}
                quality={100}
                priority
                className="object-contain w-auto h-14 lg:h-16"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="nav-link-hover flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold text-foreground hover:text-secondary transition-colors duration-200"
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <Icon name="ChevronDownIcon" size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {servicesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-card-hover border border-border py-2 z-50">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setServicesOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:text-secondary hover:bg-muted transition-colors duration-150"
                          >
                            <span className="gold-dot" />
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="nav-link-hover px-3 py-2 rounded-lg text-sm font-semibold text-foreground hover:text-secondary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Link href="/for-candidates" className="btn-secondary text-sm py-2.5 px-5">
                Find a Job
              </Link>
              <Link href="/for-employers" className="btn-primary text-sm py-2.5 px-5">
                Request Staff
              </Link>
            </div>

            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/images/logo.jpg"
                  alt="JK Staffing Logo"
                  width={200}
                  height={60}
                  quality={100}
                  className="object-contain w-auto h-12 mix-blend-multiply"
                />
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
                aria-label="Close menu"
              >
                <Icon name="XMarkIcon" size={20} className="text-foreground" />
              </button>
            </div>
            <nav className="p-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-foreground hover:bg-muted hover:text-secondary transition-colors duration-150 min-h-[44px]"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="ml-4 flex flex-col gap-0.5">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-secondary hover:bg-muted transition-colors min-h-[44px]"
                        >
                          <span className="gold-dot" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="p-4 flex flex-col gap-3 border-t border-border mt-2">
              <Link href="/for-employers" onClick={() => setMobileOpen(false)} className="btn-primary justify-center py-3">
                Request Staff
              </Link>
              <Link href="/for-candidates" onClick={() => setMobileOpen(false)} className="btn-secondary justify-center py-3">
                Find a Job
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
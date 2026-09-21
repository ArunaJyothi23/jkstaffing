import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from './components/AboutHero';
import AboutStory from './components/AboutStory';
import AboutAim from './components/AboutAim';
import AboutObjectives from './components/AboutObjectives';
import AboutValues from './components/AboutValues';
import AboutCompliance from './components/AboutCompliance';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — People, Service & Opportunity | JK Staffing',
  description: 'Learn about JK Staffing & Services Management Ltd — a UK-based workforce agency established in April 2021, providing staffing, recruitment and workforce management services.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutStory />
        <AboutAim />
        <AboutObjectives />
        <AboutValues />
        <AboutCompliance />
      </main>
      <Footer />
    </>
  );
}
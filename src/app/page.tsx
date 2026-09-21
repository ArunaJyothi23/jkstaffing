import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import TrustStrip from './components/TrustStrip';
import AudienceCTA from './components/AudienceCTA';
import ServicesSection from './components/ServicesSection';
import AboutPreview from './components/AboutPreview';
import IndustriesSection from './components/IndustriesSection';
import ObjectivesSection from './components/ObjectivesSection';
import CoreValues from './components/CoreValues';
import ComplianceSection from './components/ComplianceSection';
import HomeCTA from './components/HomeCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JK Staffing — UK Staffing & Workforce Management Services',
  description: 'JK Staffing & Services Management Ltd connects UK businesses with reliable staff and helps job seekers find employment opportunities. Staffing, recruitment, security and workforce management.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustStrip />
        <AudienceCTA />
        <ServicesSection />
        <AboutPreview />
        <IndustriesSection />
        <ObjectivesSection />
        <CoreValues />
        <ComplianceSection />
        <HomeCTA />
      </main>
      <Footer />
    </>
  );
}
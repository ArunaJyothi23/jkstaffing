import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServicesHero from './components/ServicesHero';
import ServicesDetail from './components/ServicesDetail';
import ServicesCTA from './components/ServicesCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services — Staffing & Workforce Solutions | JK Staffing',
  description: 'JK Staffing offers staffing & recruitment, temporary staffing, permanent recruitment, security staffing, workforce management and HR support across the UK.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesDetail />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  );
}
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | JK Staffing',
  description: 'Get in touch with JK Staffing & Services Management Ltd. Whether you are an employer needing staff or a candidate looking for work, our team is here to help.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
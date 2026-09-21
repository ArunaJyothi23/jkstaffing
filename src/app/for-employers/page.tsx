import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmployerHero from './components/EmployerHero';
import EmployerProcess from './components/EmployerProcess';
import RequestStaffForm from './components/RequestStaffForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Employers — Request Staff | JK Staffing',
  description: 'Looking to hire reliable staff? JK Staffing provides temporary staffing, permanent recruitment, security personnel and workforce management services across the UK.',
};

export default function ForEmployersPage() {
  return (
    <>
      <Header />
      <main>
        <EmployerHero />
        <EmployerProcess />
        <RequestStaffForm />
      </main>
      <Footer />
    </>
  );
}
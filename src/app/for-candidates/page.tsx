import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CandidateHero from './components/CandidateHero';
import JobSearch from './components/JobSearch';
import SubmitCVForm from './components/SubmitCVForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Jobs & Submit Your CV | JK Staffing',
  description: 'Looking for work in the UK? JK Staffing helps candidates find temporary, permanent and contract roles across security, logistics, hospitality, healthcare and more.',
};

export default function ForCandidatesPage() {
  return (
    <>
      <Header />
      <main>
        <CandidateHero />
        <JobSearch />
        <SubmitCVForm />
      </main>
      <Footer />
    </>
  );
}
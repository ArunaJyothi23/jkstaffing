'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const categories = [
  { icon: 'ShieldCheckIcon', title: 'Security & Facilities', count: 'Multiple roles available' },
  { icon: 'TruckIcon', title: 'Logistics & Warehousing', count: 'Multiple roles available' },
  { icon: 'SparklesIcon', title: 'Hospitality & Catering', count: 'Multiple roles available' },
  { icon: 'HeartIcon', title: 'Healthcare & Social Care', count: 'Multiple roles available' },
  { icon: 'BuildingOfficeIcon', title: 'Facilities & Cleaning', count: 'Multiple roles available' },
  { icon: 'ComputerDesktopIcon', title: 'Office & Administration', count: 'Multiple roles available' },
];

export default function JobSearch() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('submit-cv');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section-padding bg-muted" id="job-search" aria-label="Job search">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">Find Your Role</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">Search Available Positions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Use the search below to find roles matching your skills, or browse by sector.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-card rounded-2xl p-6 border border-border shadow-card mb-12 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Icon name="MagnifyingGlassIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="input-field pl-9"
                placeholder="Job title, keyword..."
                aria-label="Job title or keyword"
              />
            </div>
            <div className="relative">
              <Icon name="MapPinIcon" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field pl-9"
                placeholder="Location..."
                aria-label="Location"
              />
            </div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-field"
              aria-label="Employment type"
            >
              <option value="">All Types</option>
              <option>Temporary</option>
              <option>Permanent</option>
              <option>Contract</option>
            </select>
          </div>
          <button type="submit" className="btn-primary mt-4 w-full justify-center py-3">
            Search Jobs
            <Icon name="MagnifyingGlassIcon" size={16} />
          </button>
        </form>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href="#submit-cv"
              className="bg-card rounded-2xl p-5 border border-border shadow-card card-lift flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                <Icon name={cat.icon as Parameters<typeof Icon>[0]['name']} size={22} className="text-accent" />
              </div>
              <div>
                <div className="font-bold text-sm text-primary group-hover:text-secondary transition-colors">{cat.title}</div>
                <div className="text-xs text-muted-foreground">{cat.count}</div>
              </div>
              <Icon name="ChevronRightIcon" size={14} className="text-muted-foreground ml-auto group-hover:translate-x-1 transition-transform" />
            </a>
          ))}
        </div>

        <div className="mt-8 bg-secondary/5 border border-secondary/15 rounded-2xl p-5 text-center max-w-2xl mx-auto">
          <Icon name="InformationCircleIcon" size={18} className="text-secondary inline mr-2" />
          <span className="text-sm text-muted-foreground">
            Roles are updated regularly. Submit your CV below and we will match you with suitable opportunities as they become available.
          </span>
        </div>
      </div>
    </section>
  );
}
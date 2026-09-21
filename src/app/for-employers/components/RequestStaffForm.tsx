'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function RequestStaffForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: '', company: '', email: '', phone: '',
    staffCount: '', role: '', industry: '', employmentType: '',
    startDate: '', location: '', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section-padding bg-background" id="request-staff" aria-label="Request staff form">
      <div className="container max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">Get In Touch</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">Request Staff</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Fill in the form below and our team will be in touch to discuss your staffing requirements.
          </p>
        </div>

        {submitted ? (
          <div className="bg-card rounded-3xl p-12 border border-border shadow-card text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={32} className="text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Request Submitted</h3>
            <p className="text-muted-foreground">Thank you for your enquiry. Our team will review your requirements and be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 border border-border shadow-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                <input id="fullName" name="fullName" type="text" required value={form.fullName} onChange={handleChange} className="input-field" placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">Company Name *</label>
                <input id="company" name="company" type="text" required value={form.company} onChange={handleChange} className="input-field" placeholder="Your company name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="input-field" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className="input-field" placeholder="+44 XXXX XXXXXX" />
              </div>
              <div>
                <label htmlFor="staffCount" className="block text-sm font-semibold text-foreground mb-2">Number of Staff Required</label>
                <input id="staffCount" name="staffCount" type="number" min="1" value={form.staffCount} onChange={handleChange} className="input-field" placeholder="e.g. 5" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-foreground mb-2">Job Role / Position *</label>
                <input id="role" name="role" type="text" required value={form.role} onChange={handleChange} className="input-field" placeholder="e.g. Security Officer" />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-semibold text-foreground mb-2">Industry / Sector</label>
                <select id="industry" name="industry" value={form.industry} onChange={handleChange} className="input-field">
                  <option value="">Select industry...</option>
                  <option>Security & Facilities</option>
                  <option>Logistics & Warehousing</option>
                  <option>Hospitality & Catering</option>
                  <option>Healthcare & Social Care</option>
                  <option>Facilities & Cleaning</option>
                  <option>Office & Administration</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="employmentType" className="block text-sm font-semibold text-foreground mb-2">Employment Type</label>
                <select id="employmentType" name="employmentType" value={form.employmentType} onChange={handleChange} className="input-field">
                  <option value="">Select type...</option>
                  <option>Temporary</option>
                  <option>Permanent</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-semibold text-foreground mb-2">Required Start Date</label>
                <input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-foreground mb-2">Location *</label>
                <input id="location" name="location" type="text" required value={form.location} onChange={handleChange} className="input-field" placeholder="e.g. London, Manchester" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">Additional Information</label>
                <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} className="input-field resize-none" placeholder="Any additional details about your staffing requirements..." />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button type="submit" className="btn-primary text-base py-3.5 px-8">
                Submit Request
                <Icon name="PaperAirplaneIcon" size={16} />
              </button>
              <p className="text-xs text-muted-foreground">We aim to respond within 1 business day.</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
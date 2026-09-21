'use client';

import React, { useState, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    enquiryType: '', message: '',
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section-padding bg-background" aria-label="Contact form">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="section-label mb-4">Contact Details</div>
              <h2 className="text-section-title font-extrabold text-primary mb-4">We&apos;re Here to Help</h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Our team is available during office hours to assist with staffing enquiries, candidate registrations, and general questions.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { icon: 'EnvelopeIcon', label: 'Email', value: '[Insert Company Email]' },
                { icon: 'PhoneIcon', label: 'Phone', value: '[Insert Telephone Number]' },
                { icon: 'MapPinIcon', label: 'Address', value: '[Insert Business Address]' },
                { icon: 'ClockIcon', label: 'Office Hours', value: 'Monday – Friday\n10:00 AM – 6:00 PM' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as Parameters<typeof Icon>[0]['name']} size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{item.label}</div>
                    <div className="text-sm text-foreground font-medium whitespace-pre-line">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
              <div className="font-bold text-base mb-2">Urgent Staffing Need?</div>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                If you have an immediate staffing requirement, please call us directly during office hours for a faster response.
              </p>
              <div className="text-accent font-bold text-sm">[Insert Telephone Number]</div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-card rounded-3xl p-12 border border-border shadow-card text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircleIcon" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Enquiry Submitted</h3>
                <p className="text-muted-foreground max-w-sm">Thank you for getting in touch. A member of our team will respond to your enquiry within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 border border-border shadow-card">
                <h3 className="font-bold text-xl text-primary mb-6">Send Us an Enquiry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="input-field" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">Company Name</label>
                    <input id="company" name="company" type="text" value={form.company} onChange={handleChange} className="input-field" placeholder="Your company (if applicable)" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="input-field" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="input-field" placeholder="+44 XXXX XXXXXX" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="enquiryType" className="block text-sm font-semibold text-foreground mb-2">I Am a *</label>
                    <select id="enquiryType" name="enquiryType" required value={form.enquiryType} onChange={handleChange} className="input-field">
                      <option value="">Please select...</option>
                      <option>Employer Looking for Staff</option>
                      <option>Candidate Looking for Work</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">Message *</label>
                    <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className="input-field resize-none" placeholder="Please describe your enquiry in detail..." />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Upload CV (Candidates Only)</label>
                    <div
                      className="input-field cursor-pointer flex items-center gap-3 hover:border-secondary transition-colors"
                      onClick={() => fileRef.current?.click()}
                    >
                      <Icon name="DocumentArrowUpIcon" size={18} className="text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground truncate">{fileName || 'Click to upload CV (PDF, DOC, DOCX) — optional'}</span>
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFile}
                      className="hidden"
                      aria-label="Upload CV"
                    />
                  </div>
                </div>
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button type="submit" className="btn-primary text-base py-3.5 px-8">
                    Submit Enquiry
                    <Icon name="PaperAirplaneIcon" size={16} />
                  </button>
                  <p className="text-xs text-muted-foreground">We aim to respond within 1 business day during office hours.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
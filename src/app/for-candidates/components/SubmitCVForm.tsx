'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { subscribeDocument } from '@/lib/firebase/db';

export default function SubmitCVForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', location: '',
    areaOfWork: '', preference: '', experience: '', message: '',
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState({
    formTitle: 'Submit Your CV',
    formText: 'Register your details and upload your CV. We will review your profile and contact you when a suitable opportunity becomes available.',
  });

  useEffect(() => {
    const unsubscribe = subscribeDocument('site_content', 'candidates_page', (doc) => {
      if (doc) setContent(prev => ({ ...prev, ...doc }));
    });
    return () => unsubscribe();
  }, []);

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
    <section className="section-padding bg-background" id="submit-cv" aria-label="Submit CV form">
      <div className="container max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4">Start Your Journey</div>
          <h2 className="text-section-title font-extrabold text-primary mb-4">{content.formTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {content.formText}
          </p>
        </div>

        {submitted ? (
          <div className="bg-card rounded-3xl p-12 border border-border shadow-card text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={32} className="text-accent" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">CV Submitted Successfully</h3>
            <p className="text-muted-foreground">Thank you for registering with JK Staffing. We will review your profile and be in touch when a suitable opportunity arises.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card rounded-3xl p-8 border border-border shadow-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                <input id="fullName" name="fullName" type="text" required value={form.fullName} onChange={handleChange} className="input-field" placeholder="Your full name" />
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
                <label htmlFor="location" className="block text-sm font-semibold text-foreground mb-2">Location *</label>
                <input id="location" name="location" type="text" required value={form.location} onChange={handleChange} className="input-field" placeholder="e.g. London, Manchester" />
              </div>
              <div>
                <label htmlFor="areaOfWork" className="block text-sm font-semibold text-foreground mb-2">Area of Work</label>
                <select id="areaOfWork" name="areaOfWork" value={form.areaOfWork} onChange={handleChange} className="input-field">
                  <option value="">Select sector...</option>
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
                <label htmlFor="preference" className="block text-sm font-semibold text-foreground mb-2">Employment Preference</label>
                <select id="preference" name="preference" value={form.preference} onChange={handleChange} className="input-field">
                  <option value="">Select preference...</option>
                  <option>Temporary</option>
                  <option>Permanent</option>
                  <option>Contract</option>
                  <option>Any</option>
                </select>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-semibold text-foreground mb-2">Years of Experience</label>
                <select id="experience" name="experience" value={form.experience} onChange={handleChange} className="input-field">
                  <option value="">Select...</option>
                  <option>Less than 1 year</option>
                  <option>1–2 years</option>
                  <option>3–5 years</option>
                  <option>5–10 years</option>
                  <option>10+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Upload CV</label>
                <div
                  className="input-field cursor-pointer flex items-center gap-3 hover:border-secondary transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  <Icon name="DocumentArrowUpIcon" size={18} className="text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground truncate">{fileName || 'Click to upload CV (PDF, DOC, DOCX)'}</span>
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
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">Additional Information</label>
                <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} className="input-field resize-none" placeholder="Tell us about your skills, availability, or any other relevant information..." />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <button type="submit" className="btn-primary text-base py-3.5 px-8">
                Submit CV
                <Icon name="PaperAirplaneIcon" size={16} />
              </button>
              <p className="text-xs text-muted-foreground">Your information will be handled in accordance with our Privacy Policy.</p>
            </div>
          </form>
        )}
      </div>
    </section>
    );
}
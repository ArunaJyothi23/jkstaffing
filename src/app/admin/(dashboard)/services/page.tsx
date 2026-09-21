'use client';

import { useState, useEffect, useRef } from 'react';
import { getDocument, setDocument } from '@/lib/firebase/db';

export default function ServicesContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [content, setContent] = useState({
    heroTitle: 'Our Workforce Services',
    heroText: 'Flexible staffing and workforce solutions designed around your organisation. From temporary cover to permanent recruitment, security staffing to HR support — we provide end-to-end workforce services across the UK.',
    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1b79077ab-1767420515885.png',
    
    ctaTitle: 'Ready to Discuss Your Requirements?',
    ctaText: 'Contact our team to discuss which services best fit your business or career needs.',

    servicesList: [
      {
        id: 'staffing-recruitment',
        icon: 'UserGroupIcon',
        title: 'Staffing & Recruitment',
        tagline: 'End-to-end recruitment solutions',
        desc: 'We provide full end-to-end recruitment solutions designed to remove the burden of hiring from your internal teams. We source, screen and interview candidates before introducing them to your organisation.',
        offerings: [
          'Candidate sourcing from multiple channels',
          'CV screening and assessment',
          'Background and reference checks',
          'Initial interviews and assessments',
          'Shortlisting and candidate presentation',
          'Placement coordination and support',
        ],
        cta: 'Request Staffing',
        href: '/for-employers',
      },
      {
        id: 'temporary-staffing',
        icon: 'ClockIcon',
        title: 'Temporary Staffing',
        tagline: 'Flexible workforce cover when you need it',
        desc: 'When operational demand spikes or unexpected absences occur, our temporary staffing solutions offer quick, reliable workforce support to keep your operations running smoothly.',
        offerings: [
          'Peak season workforce cover',
          'Event and project staffing',
          'Project-based contract placements',
          'Emergency and same-day cover',
          'Sickness and absence fills',
        ],
        cta: 'Request Temporary Staff',
        href: '/for-employers',
      },
      {
        id: 'permanent-recruitment',
        icon: 'BriefcaseIcon',
        title: 'Permanent Recruitment',
        tagline: 'Long-term talent acquisition',
        desc: 'Finding long-term talent requires a detailed understanding of both technical capability and company culture. We identify and present qualified candidates looking for long-term career growth.',
        offerings: [
          'Detailed role requirement analysis',
          'Targeted and proactive candidate searches',
          'Comprehensive shortlisting process',
          'Interview scheduling and coordination',
          'Offer management and placement support',
        ],
        cta: 'Find Permanent Staff',
        href: '/for-employers',
      },
      {
        id: 'security-staffing',
        icon: 'ShieldCheckIcon',
        title: 'Security Staffing',
        tagline: 'Qualified, verified security personnel',
        desc: 'We provide qualified security personnel to protect physical sites, events and assets. All security staff undergo strict vetting and SIA licence verification prior to deployment.',
        offerings: [
          'Security officers for commercial sites',
          'SIA-licensed door supervisors',
          'Event and venue security teams',
          'Corporate reception security',
          'Mobile patrol services',
          'Site and construction security',
        ],
        note: 'All security personnel undergo SIA licence verification and sector-specific compliance checks prior to deployment.',
        cta: 'Request Security Staff',
        href: '/for-employers',
      },
      {
        id: 'workforce-management',
        icon: 'ChartBarIcon',
        title: 'Workforce Management',
        tagline: 'Operational workforce coordination',
        desc: 'Beyond filling roles, we assist businesses in managing day-to-day workforce logistics to streamline operational efficiency and reduce administrative burden.',
        offerings: [
          'Shift scheduling and rota management',
          'Attendance tracking and monitoring',
          'Timesheet administration',
          'Workforce performance reporting',
          'Candidate onboarding support',
        ],
        cta: 'Discuss Workforce Management',
        href: '/for-employers',
      },
      {
        id: 'hr-support',
        icon: 'DocumentTextIcon',
        title: 'HR Support',
        tagline: 'Practical HR administrative assistance',
        desc: 'Practical administrative and human resources assistance for organisations needing support with workforce management processes and personnel administration.',
        offerings: [
          'Recruitment process administration',
          'Personnel documentation management',
          'Employee onboarding support and coordination',
          'HR records administration',
        ],
        cta: 'Discuss HR Support',
        href: '/for-employers',
      }
    ]
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const doc = await getDocument('site_content', 'services_page');
      if (doc) {
        setContent({ ...content, ...doc });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDocument('site_content', 'services_page', content);
      setActiveModal({ type: 'success', message: 'Services page content saved successfully!' });
    } catch (error) {
      console.error(error);
      setActiveModal({ type: 'error', message: 'Failed to save content.' });
    } finally {
      setSaving(false);
    }
  };

  // Upload Logic Helper
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<keyof typeof content | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setContent({ ...content, [uploadTarget]: data.url });
    } catch (error) {
      console.error(error);
      setActiveModal({ type: 'error', message: 'Image upload failed.' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploadTarget(null);
    }
  };

  const triggerUpload = (target: keyof typeof content) => {
    setUploadTarget(target);
    fileInputRef.current?.click();
  };

  // Helper to handle list editing
  const updateService = (index: number, field: string, value: any) => {
    const newList = [...content.servicesList];
    newList[index] = { ...newList[index], [field]: value };
    setContent({ ...content, servicesList: newList });
  };

  

  return (
    <div className="pb-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Services Page Content</h1>
      
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Hero Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
            <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.heroText} onChange={e => setContent({...content, heroText: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Background Image</label>
            <div className="flex gap-2">
              <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.heroImage} onChange={e => setContent({...content, heroImage: e.target.value})} />
              <button type="button" onClick={() => triggerUpload('heroImage')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded-lg font-medium text-sm">Upload</button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Services List</h2>
        <div className="space-y-8">
          {content.servicesList.map((service, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Title</label>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-[#FF6B2C] outline-none" value={service.title} onChange={e => updateService(idx, 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Tagline</label>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-[#FF6B2C] outline-none" value={service.tagline} onChange={e => updateService(idx, 'tagline', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description</label>
                  <textarea rows={2} className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-[#FF6B2C] outline-none" value={service.desc} onChange={e => updateService(idx, 'desc', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Offerings (one per line)</label>
                  <textarea rows={4} className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-[#FF6B2C] outline-none" value={service.offerings.join('\n')} onChange={e => updateService(idx, 'offerings', e.target.value.split('\n'))} />
                </div>
                {service.note !== undefined && (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Note (Optional)</label>
                    <input type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-[#FF6B2C] outline-none" value={service.note} onChange={e => updateService(idx, 'note', e.target.value)} />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">CTA Text</label>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-[#FF6B2C] outline-none" value={service.cta} onChange={e => updateService(idx, 'cta', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Icon Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-[#FF6B2C] outline-none" value={service.icon} onChange={e => updateService(idx, 'icon', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Bottom CTA</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.ctaTitle} onChange={e => setContent({...content, ctaTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.ctaText} onChange={e => setContent({...content, ctaText: e.target.value})} />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="max-w-4xl mt-8 pt-6 border-t border-gray-100">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#FF6B2C] hover:bg-[#E55A1F] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-sm w-full sm:w-auto"
        >
          {saving ? 'Saving...' : 'Save Services Page Content'}
        </button>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-in fade-in zoom-in duration-200">
            {activeModal.type === 'success' ? (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Success!</h3>
                <p className="text-sm text-gray-500 mb-6">{activeModal.message}</p>
                <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[#FF6B2C] hover:bg-[#E55A1F] transition-colors w-full">Got it</button>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Oops!</h3>
                <p className="text-sm text-gray-500 mb-6">{activeModal.message}</p>
                <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors w-full">Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

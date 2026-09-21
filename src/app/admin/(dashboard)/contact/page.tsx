'use client';

import { useState, useEffect, useRef } from 'react';
import { getDocument, setDocument } from '@/lib/firebase/db';

export default function ContactContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [content, setContent] = useState({
    heroTitle: 'Let\'s Discuss Your Staffing Requirements',
    heroText: 'Have a query about our services, need to request staff urgently, or want to register as a job candidate? Reach out to our team today.',
    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',
    
    contactEmail: '[Insert Company Email]',
    contactPhone: '[Insert Telephone Number]',
    contactAddress: '[Insert Business Address]',
    contactHours: 'Monday – Friday\n10:00 AM – 6:00 PM',

    urgentText: 'If you have an immediate staffing requirement, please call us directly during office hours for a faster response.',
    
    formTitle: 'Send Us an Enquiry'
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const doc = await getDocument('site_content', 'contact_page');
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
      await setDocument('site_content', 'contact_page', content);
      setActiveModal({ type: 'success', message: 'Contact page content saved successfully!' });
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

  

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Page Content</h1>
      
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
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.heroText} onChange={e => setContent({...content, heroText: e.target.value})} />
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

      {/* Contact Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Contact Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.contactEmail} onChange={e => setContent({...content, contactEmail: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.contactPhone} onChange={e => setContent({...content, contactPhone: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.contactAddress} onChange={e => setContent({...content, contactAddress: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Office Hours</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.contactHours} onChange={e => setContent({...content, contactHours: e.target.value})} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Urgent Text (Box)</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.urgentText} onChange={e => setContent({...content, urgentText: e.target.value})} />
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Contact Form Intro</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.formTitle} onChange={e => setContent({...content, formTitle: e.target.value})} />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="max-w-4xl mt-8 pt-6 border-t border-gray-100">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#FF6B2C] hover:bg-[#E55A1F] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-sm"
        >
          {saving ? 'Saving...' : 'Save Contact Page Content'}
        </button>
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
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

'use client';

import { useState, useEffect, useRef } from 'react';
import { getDocument, setDocument } from '@/lib/firebase/db';
import Icon from '@/components/ui/AppIcon';

export default function EmployersContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [content, setContent] = useState({
    heroTitle: 'Find the Right People for Your Business',
    heroText: 'Whether you need short-term cover, permanent recruitment, specialist security personnel or complete workforce coordination, JK Staffing provides tailored staffing solutions built around your business requirements.',
    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_133b1e7cf-1768750078214.png',
    
    processTitle: 'Our Staffing Process',
    processText: 'A clear, straightforward approach to finding and placing the right people for your business.',
    processSteps: [
      { num: '01', icon: 'ChatBubbleLeftRightIcon', title: 'Tell Us Your Requirements', desc: 'Share your staffing needs — roles, numbers, skills required, start date and any sector-specific requirements.' },
      { num: '02', icon: 'MagnifyingGlassIcon', title: 'Candidate Sourcing', desc: 'We search our network and actively recruit suitable candidates matching your specific criteria.' },
      { num: '03', icon: 'ClipboardDocumentCheckIcon', title: 'Screening & Verification', desc: 'Candidates undergo appropriate identity, right-to-work, reference and sector-specific compliance checks.' },
      { num: '04', icon: 'UserGroupIcon', title: 'Shortlisting', desc: 'We present you with a shortlist of qualified candidates ready for your review or interview.' },
      { num: '05', icon: 'CheckBadgeIcon', title: 'Placement', desc: 'Successful candidates are placed with your organisation with full coordination and onboarding support.' },
      { num: '06', icon: 'ArrowPathIcon', title: 'Ongoing Support', desc: 'We provide continued workforce support, including temporary cover, scheduling and HR administration.' },
    ],

    formTitle: 'Request Staff',
    formText: 'Fill in the form below and our team will be in touch to discuss your staffing requirements.'
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const doc = await getDocument('site_content', 'employers_page');
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
      await setDocument('site_content', 'employers_page', content);
      setActiveModal({ type: 'success', message: 'Employers page content saved successfully!' });
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

  // Array Handlers
  const addArrayItem = (key: string, defaultItem: any) => {
    setContent({ ...content, [key]: [...(content as any)[key], defaultItem] });
  };
  const updateArrayItem = (key: string, index: number, field: string, value: any) => {
    const newList: any = [...(content as any)[key]];
    newList[index][field] = value;
    setContent({ ...content, [key]: newList });
  };
  const removeArrayItem = (key: string, index: number) => {
    const newList: any = [...(content as any)[key]];
    newList.splice(index, 1);
    setContent({ ...content, [key]: newList });
  };

  

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">For Employers Page Content</h1>
      
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

      {/* Process Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Process Section</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.processTitle} onChange={e => setContent({...content, processTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.processText} onChange={e => setContent({...content, processText: e.target.value})} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Process Steps</label>
            <div className="space-y-3">
              {content.processSteps?.map((item, index) => (
                <div key={index} className="flex gap-2 items-start p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <input type="text" placeholder="Num (e.g. 01)" className="w-16 border border-gray-200 rounded p-1.5 text-sm" value={item.num} onChange={e => updateArrayItem('processSteps', index, 'num', e.target.value)} />
                      <input type="text" placeholder="Title" className="flex-1 border border-gray-200 rounded p-1.5 text-sm" value={item.title} onChange={e => updateArrayItem('processSteps', index, 'title', e.target.value)} />
                      <input type="text" placeholder="Icon" className="w-24 border border-gray-200 rounded p-1.5 text-sm" value={item.icon} onChange={e => updateArrayItem('processSteps', index, 'icon', e.target.value)} />
                    </div>
                    <textarea rows={1} placeholder="Description" className="w-full border border-gray-200 rounded p-1.5 text-sm" value={item.desc} onChange={e => updateArrayItem('processSteps', index, 'desc', e.target.value)} />
                  </div>
                  <button type="button" onClick={() => removeArrayItem('processSteps', index)} className="text-red-500 mt-1"><Icon name="TrashIcon" size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('processSteps', { num: '00', title: 'New Step', desc: 'Description', icon: 'CheckIcon' })} className="text-sm text-[#FF6B2C] font-medium">+ Add Step</button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Request Form Intro</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Title</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.formTitle} onChange={e => setContent({...content, formTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Subtitle</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.formText} onChange={e => setContent({...content, formText: e.target.value})} />
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
          {saving ? 'Saving...' : 'Save Employers Page Content'}
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

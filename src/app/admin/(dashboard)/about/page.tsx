'use client';

import { useState, useEffect, useRef } from 'react';
import { getDocument, setDocument } from '@/lib/firebase/db';
import Icon from '@/components/ui/AppIcon';

export default function AboutContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [content, setContent] = useState({
    heroTitle: 'People, Service & Opportunity',
    heroSubtitle: 'Learn about JK Staffing & Services Management Ltd — a UK-based workforce agency established in April 2021.',
    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_180e0c8b0-1768822557344.png',
    
    storyTitle: 'A UK Workforce Agency Built on Trust',
    storyText1: 'JK Staffing & Services Management Ltd provides human resources management, staffing solutions, and private security activities across the UK. We bridge the gap between businesses seeking dependable staff and individuals seeking meaningful work.',
    storyText2: 'Since our establishment in April 2021, we have built our reputation on responsiveness, compliance, and genuine understanding of our clients and candidates needs.',
    storyImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d516d798-1768437649458.png',

    vision: 'To be a trusted recruitment and workforce partner known for integrity, high compliance standards, and strong long-term business relationships.',
    mission: 'To deliver flexible, high-quality recruitment and HR support that helps employers maintain operational success while empowering job seekers to achieve their employment goals.',
    aim: 'To become a trusted staffing and workforce services partner for employers while creating meaningful employment opportunities for candidates. We seek to understand the needs of organisations, identify appropriate talent and provide responsive workforce solutions that support operational continuity and long-term development.',

    compTitle: 'Our Commitment to Compliance',
    compText: 'We recognise the importance of responsible recruitment and appropriate candidate verification. Depending on the role and sector, relevant checks may include the following.',
    compFeatures: [
      { icon: 'ShieldCheckIcon', title: 'Role-Specific Verification', desc: 'All checks are tailored to the specific requirements of each role and sector.' },
      { icon: 'DocumentMagnifyingGlassIcon', title: 'Thorough Screening', desc: 'We take screening seriously to ensure suitable candidate-employer matches are made.' },
      { icon: 'ScaleIcon', title: 'Legal Compliance', desc: 'All processes are conducted in accordance with applicable UK employment law and regulations.' },
    ],
    compChecks: [
      'Right-to-work verification',
      'Identity verification',
      'References',
      'Qualification verification',
      'Licence verification',
      'DBS checks where applicable',
      'SIA licence verification where applicable',
      'Sector-specific checks',
      'Employment history',
      'Training/certification checks',
    ]
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const doc = await getDocument('site_content', 'about_page');
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
      await setDocument('site_content', 'about_page', content);
      setActiveModal({ type: 'success', message: 'About page content saved successfully!' });
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
  const updateStringArrayItem = (key: string, index: number, value: string) => {
    const newList: any = [...(content as any)[key]];
    newList[index] = value;
    setContent({ ...content, [key]: newList });
  };
  const addStringArrayItem = (key: string) => {
    setContent({ ...content, [key]: [...(content as any)[key], 'New Item'] });
  };

  

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">About Page Content</h1>
      
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
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.heroSubtitle} onChange={e => setContent({...content, heroSubtitle: e.target.value})} />
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

      {/* Story Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Who We Are (Story)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.storyTitle} onChange={e => setContent({...content, storyTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 1</label>
            <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.storyText1} onChange={e => setContent({...content, storyText1: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraph 2</label>
            <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.storyText2} onChange={e => setContent({...content, storyText2: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Story Image</label>
            <div className="flex gap-2">
              <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.storyImage} onChange={e => setContent({...content, storyImage: e.target.value})} />
              <button type="button" onClick={() => triggerUpload('storyImage')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded-lg font-medium text-sm">Upload</button>
            </div>
          </div>
        </div>
      </div>

      {/* Values & Goals */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Vision, Mission & Aim</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.vision} onChange={e => setContent({...content, vision: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.mission} onChange={e => setContent({...content, mission: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aim</label>
            <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.aim} onChange={e => setContent({...content, aim: e.target.value})} />
          </div>
        </div>
      </div>

      {/* Compliance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Compliance Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 outline-none" value={content.compTitle} onChange={e => setContent({...content, compTitle: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 outline-none" value={content.compText} onChange={e => setContent({...content, compText: e.target.value})} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">Features List</label>
              <div className="space-y-3">
                {content.compFeatures?.map((item, index) => (
                  <div key={index} className="flex gap-2 items-start p-3 border border-gray-100 rounded-lg bg-gray-50">
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <input type="text" placeholder="Title" className="flex-1 border border-gray-200 rounded p-1.5 text-sm" value={item.title} onChange={e => updateArrayItem('compFeatures', index, 'title', e.target.value)} />
                        <input type="text" placeholder="Icon" className="w-24 border border-gray-200 rounded p-1.5 text-sm" value={item.icon} onChange={e => updateArrayItem('compFeatures', index, 'icon', e.target.value)} />
                      </div>
                      <textarea rows={1} placeholder="Description" className="w-full border border-gray-200 rounded p-1.5 text-sm" value={item.desc} onChange={e => updateArrayItem('compFeatures', index, 'desc', e.target.value)} />
                    </div>
                    <button type="button" onClick={() => removeArrayItem('compFeatures', index)} className="text-red-500 mt-1"><Icon name="TrashIcon" size={16} /></button>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('compFeatures', { title: 'New Feature', desc: 'Description', icon: 'CheckIcon' })} className="text-sm text-[#FF6B2C] font-medium">+ Add Feature</button>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Candidate Checks List</label>
            <div className="space-y-2">
              {content.compChecks?.map((check, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2 text-sm outline-none" value={check} onChange={e => updateStringArrayItem('compChecks', index, e.target.value)} />
                  <button type="button" onClick={() => removeArrayItem('compChecks', index)} className="text-red-500 hover:bg-red-50 px-2 rounded-lg"><Icon name="TrashIcon" size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => addStringArrayItem('compChecks')} className="text-sm text-[#FF6B2C] font-medium mt-2">+ Add Check</button>
            </div>
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
          {saving ? 'Saving...' : 'Save About Page Content'}
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

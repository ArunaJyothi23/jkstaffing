'use client';

import { useState, useEffect } from 'react';
import { getDocument, setDocument } from '@/lib/firebase/db';

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  
  const [content, setContent] = useState({
    heroTitle: 'Connecting Businesses with Reliable People & Candidates with Great Opportunities',
    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',
    aboutTitle: 'People. Service. Opportunity.',
    aboutDescription: 'JK Staffing & Services Management Ltd provides human resources management, staffing solutions, and private security activities across the UK. We bridge the gap between businesses seeking dependable staff and individuals seeking meaningful work.',
    aboutVision: 'To be a trusted recruitment and workforce partner known for integrity, high compliance standards, and strong long-term business relationships.',
    aboutMission: 'To deliver flexible, high-quality recruitment and HR support that helps employers maintain operational success while empowering job seekers.',
    aboutImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a1c35946-1769214275939.png',
    footerEmail: '[Insert Company Email]',
    footerHours: 'Mon-Fri: 10:00-18:00',
    footerDescription: 'Connecting businesses with reliable people and candidates with great opportunities across the UK.'
  });
  
  const [activeModal, setActiveModal] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      // Assuming a single document for global site content
      const doc = await getDocument('site_content', 'global');
      if (doc) {
        setContentId(doc.id);
        setContent({
          heroTitle: doc.heroTitle || content.heroTitle,
          heroImage: doc.heroImage || content.heroImage,
          aboutTitle: doc.aboutTitle || content.aboutTitle,
          aboutDescription: doc.aboutDescription || content.aboutDescription,
          aboutVision: doc.aboutVision || content.aboutVision,
          aboutMission: doc.aboutMission || content.aboutMission,
          aboutImage: doc.aboutImage || content.aboutImage,
          footerEmail: doc.footerEmail || content.footerEmail,
          footerHours: doc.footerHours || content.footerHours,
          footerDescription: doc.footerDescription || content.footerDescription,
        });
      }
    } catch (error) {
      console.error("Failed to load content", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDocument('site_content', 'global', content);
      setActiveModal({ type: 'success', message: 'Content saved successfully!' });
    } catch (error) {
      console.error("Failed to save", error);
      setActiveModal({ type: 'error', message: 'Failed to save content.' });
    } finally {
      setSaving(false);
    }
  };

  

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Site Overview & Content</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Hero Section</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
            <textarea 
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none"
              rows={3}
              value={content.heroTitle}
              onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero Background Image URL</label>
            <input 
              type="text"
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none"
              value={content.heroImage}
              onChange={(e) => setContent({ ...content, heroImage: e.target.value })}
              placeholder="Paste URL from Images & Media"
            />
            {content.heroImage && (
              <div className="mt-2 relative h-32 rounded-lg overflow-hidden border border-gray-200">
                <img src={content.heroImage} alt="Hero Preview" className="object-cover w-full h-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">About Us Section</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Title</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.aboutTitle} onChange={e => setContent({...content, aboutTitle: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Description</label>
              <textarea rows={4} className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.aboutDescription} onChange={e => setContent({...content, aboutDescription: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Image URL</label>
              <input type="text" placeholder="URL from Images & Media" className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.aboutImage} onChange={e => setContent({...content, aboutImage: e.target.value})} />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Our Vision</label>
              <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.aboutVision} onChange={e => setContent({...content, aboutVision: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Our Mission</label>
              <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.aboutMission} onChange={e => setContent({...content, aboutMission: e.target.value})} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Footer Section</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.footerEmail} onChange={e => setContent({...content, footerEmail: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.footerHours} onChange={e => setContent({...content, footerHours: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Footer Description</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.footerDescription} onChange={e => setContent({...content, footerDescription: e.target.value})} />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-[#FF6B2C] hover:bg-[#E55A1F] text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors shadow-sm"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* CUSTOM MODAL OVERLAY */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-in fade-in zoom-in duration-200">
            {activeModal.type === 'success' && (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Success!</h3>
                <p className="text-sm text-gray-500 mb-6">{activeModal.message}</p>
                <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[#FF6B2C] hover:bg-[#E55A1F] transition-colors w-full">Got it</button>
              </div>
            )}
            {activeModal.type === 'error' && (
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

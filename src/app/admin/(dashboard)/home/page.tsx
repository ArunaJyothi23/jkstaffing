'use client';

import { useState, useEffect, useRef } from 'react';
import { getDocument, setDocument } from '@/lib/firebase/db';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

export default function HomeContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeModal, setActiveModal] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [content, setContent] = useState({
    // Hero
    heroTitle: 'Connecting Businesses with Reliable People & Candidates with Great Opportunities',
    heroImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d0346ec5-1772458054183.png',
    heroBadges: [
      { label: 'Staffing', icon: 'UserGroupIcon' },
      { label: 'Recruitment', icon: 'BriefcaseIcon' },
      { label: 'Workforce', icon: 'BuildingOfficeIcon' },
      { label: 'Security', icon: 'ShieldCheckIcon' },
      { label: 'HR Support', icon: 'DocumentTextIcon' }
    ],
    heroTrust: [
      { text: 'Est. April 2021', icon: 'CalendarIcon' },
      { text: 'UK-Based Agency', icon: 'MapPinIcon' },
      { text: 'Multi-Sector Staffing', icon: 'BuildingOffice2Icon' }
    ],

    // Trust Strip
    trustItemsList: [
      { icon: 'ShieldCheckIcon', title: 'Professional Standards', desc: 'Rigorous candidate screening including identity, right-to-work, reference and sector-specific checks.' },
      { icon: 'BoltIcon', title: 'Responsive Service', desc: 'Fast, reliable support for staffing shortages and immediate operational requirements.' },
      { icon: 'AdjustmentsHorizontalIcon', title: 'Tailored Solutions', desc: 'Workforce support built around your business needs, schedules and budget.' },
      { icon: 'HandshakeIcon', title: 'Compliance-Focused', desc: 'All recruitment processes follow appropriate legal and sector-specific compliance requirements.' },
    ],

    // Audience CTA (Employers)
    empTitle: 'Need Reliable Staff?',
    empText: 'Whether you need short-term cover, permanent recruitment, specialist security personnel or workforce coordination, we can help you find the right staffing solution.',
    empImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_111288e54-1776866345849.png',
    empChecklist: ['Temporary & Permanent Roles', 'Security Personnel', 'Workforce Coordination', 'Fast Placement'],
    
    // Audience CTA (Candidates)
    candTitle: 'Looking for Your Next Opportunity?',
    candText: 'Explore employment opportunities that match your skills, experience and career goals across multiple sectors throughout the UK.',
    candImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_11c2c4670-1778965269126.png',
    candChecklist: ['Temporary & Permanent Roles', 'Multiple Sectors', 'Career Guidance', 'Fast Application'],

    // Industries
    indTitle: 'Industries We Serve',
    indText: 'We provide specialized staffing solutions across a variety of sectors.',
    industriesList: [
      {
        title: 'Security & Facilities',
        img: "https://img.rocket.new/generatedImages/rocket_gen_img_11c1d13fc-1785550297802.png",
        roles: 'Security officers, Door supervisors, Site guards, Corporate reception',
        icon: 'ShieldCheckIcon'
      },
      {
        title: 'Logistics & Warehousing',
        img: "https://img.rocket.new/generatedImages/rocket_gen_img_1c3494f48-1772541068284.png",
        roles: 'Warehouse operatives, Pickers/packers, Forklift operators, Stock control',
        icon: 'TruckIcon'
      },
      {
        title: 'Hospitality & Catering',
        img: "https://img.rocket.new/generatedImages/rocket_gen_img_198a71793-1773232115350.png",
        roles: 'Event staff, Kitchen assistants, Front-of-house, Floor staff',
        icon: 'SparklesIcon'
      },
      {
        title: 'Healthcare & Social Care',
        img: "https://img.rocket.new/generatedImages/rocket_gen_img_10c945f5d-1784580521819.png",
        roles: 'Support roles, Care assistants, Administrative support, Compliance-verified',
        icon: 'HeartIcon'
      },
      {
        title: 'Facilities & Cleaning',
        img: "https://img.rocket.new/generatedImages/rocket_gen_img_1120d767b-1786319157185.png",
        roles: 'Commercial cleaners, Industrial cleaners, Facilities maintenance, Site services',
        icon: 'BuildingOfficeIcon'
      },
      {
        title: 'Office & Administration',
        img: "https://img.rocket.new/generatedImages/rocket_gen_img_1cc420a95-1772191564593.png",
        roles: 'Administrative assistants, Data entry clerks, Receptionists, Customer support',
        icon: 'ComputerDesktopIcon'
      }
    ],
    
    // Core Values
    valTitle: 'Our Core Values',
    valText: 'The principles that guide everything we do.',
    coreValuesList: [
      { title: 'Integrity', text: 'We operate with complete transparency and honesty in all our dealings.', icon: 'ShieldCheckIcon' },
      { title: 'Excellence', text: 'We strive for the highest quality in our service delivery.', icon: 'StarIcon' },
      { title: 'Reliability', text: 'You can count on us to deliver consistent, dependable results.', icon: 'CheckBadgeIcon' },
      { title: 'Partnership', text: 'We build long-term relationships based on mutual trust.', icon: 'HandshakeIcon' }
    ],

    // Compliance
    compTitle: 'Commitment to Compliance',
    compText: 'We maintain the highest standards of regulatory compliance and operational excellence.',
    compImage: 'https://img.rocket.new/generatedImages/rocket_gen_img_15caab975-1776993510521.png',

    // Objectives
    objTitle: 'Our Strategic Objectives',
    objText: 'What we aim to achieve for our clients and candidates.',
    objectivesList: [
      { title: 'Quality Placements', text: 'Ensuring the perfect match between candidate skills and employer requirements.', icon: 'CheckBadgeIcon' },
      { title: 'Speed & Efficiency', text: 'Delivering rapid staffing solutions without compromising on quality.', icon: 'LightningBoltIcon' }
    ],

    // Home CTA
    ctaTitle: 'Ready to Transform Your Workforce?',
    ctaText: 'Partner with JK Staffing & Services Management Ltd today.',
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const doc = await getDocument('site_content', 'homepage');
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
      await setDocument('site_content', 'homepage', content);
      setActiveModal({ type: 'success', message: 'Homepage content saved successfully!' });
    } catch (error) {
      console.error(error);
      setActiveModal({ type: 'error', message: 'Failed to save content.' });
    } finally {
      setSaving(false);
    }
  };

  // Upload Logic Helper
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<any>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTarget) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      
      if (typeof uploadTarget === 'string') {
        setContent({ ...content, [uploadTarget]: data.url });
      } else if (typeof uploadTarget === 'object') {
        // Handle array upload
        const { listKey, index, field } = uploadTarget;
        const newList: any = [...(content as any)[listKey]];
        newList[index][field] = data.url;
        setContent({ ...content, [listKey]: newList });
      }
    } catch (error) {
      console.error(error);
      setActiveModal({ type: 'error', message: 'Image upload failed.' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
      setUploadTarget(null);
    }
  };

  const triggerUpload = (target: any) => {
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

  // String Array Handlers (for checklists)
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Homepage Sections Content</h1>
      
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Hero Section</h2>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (Use &lt;span class=&quot;text-accent&quot;&gt; for highlighted text)</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.heroTitle} onChange={e => setContent({...content, heroTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
            {content.heroImage && (
              <div className="mb-2 relative w-32 h-20 rounded-md overflow-hidden border border-gray-200">
                <Image src={content.heroImage} alt="Preview" fill className="object-cover" />
              </div>
            )}
            <div className="flex gap-2">
              <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.heroImage} onChange={e => setContent({...content, heroImage: e.target.value})} />
              <button type="button" onClick={() => triggerUpload('heroImage')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded-lg font-medium text-sm">Upload</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Hero Badges (Card)</h3>
            <div className="space-y-2">
              {content.heroBadges?.map((b, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" placeholder="Label" className="flex-1 border border-gray-200 rounded p-2 text-sm" value={b.label} onChange={e => updateArrayItem('heroBadges', index, 'label', e.target.value)} />
                  <input type="text" placeholder="Icon" className="w-24 border border-gray-200 rounded p-2 text-sm" value={b.icon} onChange={e => updateArrayItem('heroBadges', index, 'icon', e.target.value)} />
                  <button type="button" onClick={() => removeArrayItem('heroBadges', index)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Icon name="TrashIcon" size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('heroBadges', { label: 'New Badge', icon: 'StarIcon' })} className="text-sm text-[#FF6B2C] font-medium">+ Add Badge</button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Trust Indicators (Under Buttons)</h3>
            <div className="space-y-2">
              {content.heroTrust?.map((t, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" placeholder="Text" className="flex-1 border border-gray-200 rounded p-2 text-sm" value={t.text} onChange={e => updateArrayItem('heroTrust', index, 'text', e.target.value)} />
                  <input type="text" placeholder="Icon" className="w-24 border border-gray-200 rounded p-2 text-sm" value={t.icon} onChange={e => updateArrayItem('heroTrust', index, 'icon', e.target.value)} />
                  <button type="button" onClick={() => removeArrayItem('heroTrust', index)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Icon name="TrashIcon" size={16} /></button>
                </div>
              ))}
              <button type="button" onClick={() => addArrayItem('heroTrust', { text: 'New Trust Item', icon: 'CheckCircleIcon' })} className="text-sm text-[#FF6B2C] font-medium">+ Add Item</button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Strip */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Trust Strip</h2>
        <div className="space-y-3">
          {content.trustItemsList?.map((item, index) => (
            <div key={index} className="flex gap-3 items-start border border-gray-100 p-3 rounded-lg bg-gray-50">
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <input type="text" placeholder="Title" className="flex-1 border border-gray-200 rounded p-2 text-sm" value={item.title} onChange={e => updateArrayItem('trustItemsList', index, 'title', e.target.value)} />
                  <input type="text" placeholder="Icon" className="w-32 border border-gray-200 rounded p-2 text-sm" value={item.icon} onChange={e => updateArrayItem('trustItemsList', index, 'icon', e.target.value)} />
                </div>
                <textarea rows={2} placeholder="Description" className="w-full border border-gray-200 rounded p-2 text-sm" value={item.desc} onChange={e => updateArrayItem('trustItemsList', index, 'desc', e.target.value)} />
              </div>
              <button type="button" onClick={() => removeArrayItem('trustItemsList', index)} className="text-red-500 hover:bg-red-100 p-2 rounded"><Icon name="TrashIcon" size={18} /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('trustItemsList', { title: 'New Trust Factor', desc: 'Description', icon: 'ShieldCheckIcon' })} className="text-sm text-[#FF6B2C] font-medium mt-2">+ Add Trust Factor</button>
        </div>
      </div>

      {/* Audience CTA */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Audience Actions (Employers & Candidates)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Employers */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Employers Block</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.empTitle} onChange={e => setContent({...content, empTitle: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.empText} onChange={e => setContent({...content, empText: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
              {content.empImage && (
                <div className="mb-2 relative w-32 h-20 rounded-md overflow-hidden border border-gray-200">
                  <Image src={content.empImage} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex gap-2">
                <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.empImage} onChange={e => setContent({...content, empImage: e.target.value})} />
                <button type="button" onClick={() => triggerUpload('empImage')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded-lg font-medium text-sm">Upload</button>
              </div>
            </div>
            
            {/* Checklist */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Items</label>
              <div className="space-y-2">
                {content.empChecklist.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2 text-sm outline-none" value={item} onChange={e => updateStringArrayItem('empChecklist', index, e.target.value)} />
                    <button type="button" onClick={() => removeArrayItem('empChecklist', index)} className="text-red-500 hover:bg-red-50 px-2 rounded-lg"><Icon name="TrashIcon" size={16} /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addStringArrayItem('empChecklist')} className="text-sm text-[#FF6B2C] font-medium mt-2">+ Add Item</button>
            </div>
          </div>

          {/* Candidates */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Candidates Block</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.candTitle} onChange={e => setContent({...content, candTitle: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.candText} onChange={e => setContent({...content, candText: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
              {content.candImage && (
                <div className="mb-2 relative w-32 h-20 rounded-md overflow-hidden border border-gray-200">
                  <Image src={content.candImage} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex gap-2">
                <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={content.candImage} onChange={e => setContent({...content, candImage: e.target.value})} />
                <button type="button" onClick={() => triggerUpload('candImage')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded-lg font-medium text-sm">Upload</button>
              </div>
            </div>

            {/* Checklist */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Checklist Items</label>
              <div className="space-y-2">
                {content.candChecklist.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2 text-sm outline-none" value={item} onChange={e => updateStringArrayItem('candChecklist', index, e.target.value)} />
                    <button type="button" onClick={() => removeArrayItem('candChecklist', index)} className="text-red-500 hover:bg-red-50 px-2 rounded-lg"><Icon name="TrashIcon" size={16} /></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addStringArrayItem('candChecklist')} className="text-sm text-[#FF6B2C] font-medium mt-2">+ Add Item</button>
            </div>
          </div>
        </div>
      </div>

      {/* Industries */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Industries Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 outline-none" value={content.indTitle} onChange={e => setContent({...content, indTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 outline-none" value={content.indText} onChange={e => setContent({...content, indText: e.target.value})} />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-800 mb-2 border-b pb-2">Industries List</label>
          {content.industriesList.map((ind, index) => (
            <div key={index} className="border border-gray-200 rounded-xl p-4 bg-gray-50 relative">
              <button type="button" onClick={() => removeArrayItem('industriesList', index)} className="absolute top-4 right-4 text-red-500 hover:bg-red-100 p-2 rounded-lg transition-colors"><Icon name="TrashIcon" size={18} /></button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-10">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
                  <input type="text" className="w-full border border-gray-200 rounded-md p-2 text-sm" value={ind.title} onChange={e => updateArrayItem('industriesList', index, 'title', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Icon Name (Heroicons)</label>
                  <input type="text" className="w-full border border-gray-200 rounded-md p-2 text-sm" value={ind.icon} onChange={e => updateArrayItem('industriesList', index, 'icon', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Roles (comma separated)</label>
                  <input type="text" className="w-full border border-gray-200 rounded-md p-2 text-sm" value={ind.roles} onChange={e => updateArrayItem('industriesList', index, 'roles', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
                  {ind.img && (
                    <div className="mb-2 relative w-32 h-20 rounded-md overflow-hidden border border-gray-200">
                      <Image src={ind.img} alt="Preview" fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input type="text" className="flex-1 border border-gray-200 rounded-md p-2 text-sm" value={ind.img} onChange={e => updateArrayItem('industriesList', index, 'img', e.target.value)} />
                    <button type="button" onClick={() => triggerUpload({ listKey: 'industriesList', index, field: 'img' })} className="bg-gray-200 text-gray-700 px-3 rounded-md text-xs font-bold">Upload</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('industriesList', { title: 'New Industry', img: '', roles: 'Role 1, Role 2', icon: 'StarIcon' })} className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:bg-gray-50 hover:border-[#FF6B2C] hover:text-[#FF6B2C] transition-colors">
            + Add Industry
          </button>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 outline-none" value={content.valTitle} onChange={e => setContent({...content, valTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 outline-none" value={content.valText} onChange={e => setContent({...content, valText: e.target.value})} />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-800 mb-2 border-b pb-2">Values List</label>
          {content.coreValuesList.map((val, index) => (
            <div key={index} className="flex gap-4 items-start border-b border-gray-100 pb-4 last:border-0">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Title" className="border border-gray-200 rounded-md p-2 text-sm" value={val.title} onChange={e => updateArrayItem('coreValuesList', index, 'title', e.target.value)} />
                <input type="text" placeholder="Icon Name" className="border border-gray-200 rounded-md p-2 text-sm" value={val.icon} onChange={e => updateArrayItem('coreValuesList', index, 'icon', e.target.value)} />
                <textarea rows={2} placeholder="Description" className="md:col-span-2 border border-gray-200 rounded-md p-2 text-sm" value={val.text} onChange={e => updateArrayItem('coreValuesList', index, 'text', e.target.value)} />
              </div>
              <button type="button" onClick={() => removeArrayItem('coreValuesList', index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg mt-1"><Icon name="TrashIcon" size={18} /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('coreValuesList', { title: 'New Value', text: 'Value Description', icon: 'StarIcon' })} className="text-sm text-[#FF6B2C] font-medium">+ Add Value</button>
        </div>
      </div>

      {/* Compliance & Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Compliance</h2>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge Image</label>
              {content.compImage && (
                <div className="mb-2 relative w-20 h-20 rounded-md overflow-hidden border border-gray-200">
                  <Image src={content.compImage} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <div className="flex gap-2">
                <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2.5 outline-none" value={content.compImage} onChange={e => setContent({...content, compImage: e.target.value})} />
                <button type="button" onClick={() => triggerUpload('compImage')} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 rounded-lg font-medium text-sm">Upload</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Objectives</h2>
          <div className="space-y-4 mb-4">
            <input type="text" placeholder="Title" className="w-full border border-gray-200 rounded-lg p-2.5 outline-none" value={content.objTitle} onChange={e => setContent({...content, objTitle: e.target.value})} />
            <textarea rows={2} placeholder="Description" className="w-full border border-gray-200 rounded-lg p-2.5 outline-none" value={content.objText} onChange={e => setContent({...content, objText: e.target.value})} />
          </div>
          
          <div className="space-y-3">
            {content.objectivesList.map((obj, index) => (
              <div key={index} className="border border-gray-200 p-3 rounded-lg flex gap-2 items-start bg-gray-50">
                 <div className="flex-1 space-y-2">
                   <input type="text" placeholder="Title" className="w-full border border-gray-200 rounded p-2 text-sm" value={obj.title} onChange={e => updateArrayItem('objectivesList', index, 'title', e.target.value)} />
                   <input type="text" placeholder="Icon" className="w-full border border-gray-200 rounded p-2 text-sm" value={obj.icon} onChange={e => updateArrayItem('objectivesList', index, 'icon', e.target.value)} />
                   <textarea rows={2} placeholder="Text" className="w-full border border-gray-200 rounded p-2 text-sm" value={obj.text} onChange={e => updateArrayItem('objectivesList', index, 'text', e.target.value)} />
                 </div>
                 <button type="button" onClick={() => removeArrayItem('objectivesList', index)} className="text-red-500"><Icon name="TrashIcon" size={16} /></button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('objectivesList', { title: 'New Objective', text: '', icon: 'StarIcon' })} className="text-sm text-[#FF6B2C] font-medium">+ Add Objective</button>
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
          {saving ? 'Saving...' : 'Save Homepage Content'}
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

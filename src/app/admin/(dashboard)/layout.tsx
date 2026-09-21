'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  const links = [
    { name: 'Overview', href: '/admin', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> },
    { name: 'Home Page', href: '/admin/home', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> },
    { name: 'About Page', href: '/admin/about', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg> },
    { name: 'Employers', href: '/admin/employers', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
    { name: 'Candidates', href: '/admin/candidates', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> },
    { name: 'Contact Page', href: '/admin/contact', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> },
    { name: 'Job Postings', href: '/admin/jobs', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> },
    { name: 'Services', href: '/admin/services', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
    { name: 'Images & Media', href: '/admin/images', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg> },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shrink-0 z-10">
        <Link href="/admin" className="flex items-center ml-4">
          <Image 
            src="/assets/images/logo.jpg" 
            alt="JK Staffing" 
            width={100} 
            height={40} 
            className="object-contain w-[100px] h-auto mix-blend-multiply"
            priority
          />
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/admin/jobs?action=new" className="bg-[#FF6B2C] hover:bg-[#E55A1F] text-white px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
            <span className="text-lg leading-none mb-[2px]">+</span> Post
          </Link>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto">
          <nav className="flex flex-col gap-1 p-3 mt-2">
            {links.map((link) => {
              // Exact match for overview, prefix match for others
              const isActive = link.href === '/admin' ? pathname === '/admin' : pathname?.startsWith(link.href);
              
              return (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={`px-4 py-3 flex items-center gap-3 rounded-xl font-medium text-[15px] transition-colors ${
                    isActive 
                      ? 'bg-[#FFF3EC] text-[#FF6B2C]' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <div className={`w-5 h-5 flex items-center justify-center ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                    {link.icon}
                  </div>
                  {link.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto p-3 mb-2">
            <button 
              onClick={() => setShowSignOutModal(true)}
              className="text-gray-500 hover:text-red-600 font-medium text-[15px] flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors hover:bg-red-50"
            >
               <div className="w-5 h-5 flex items-center justify-center opacity-60">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </div>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#F8F9FB]">
          {children}
        </main>
      </div>

      {/* SIGN OUT MODAL */}
      {showSignOutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Out?</h3>
              <p className="text-sm text-gray-500 mb-6">Are you sure you want to sign out of the admin dashboard?</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => setShowSignOutModal(false)} className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors w-full">Cancel</button>
                <button onClick={() => { window.location.href = '/' }} className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors w-full">Sign Out</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

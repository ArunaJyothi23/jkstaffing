'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      console.error("Firebase Auth Error:", err);
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-100 px-4">
      {/* Centered Box */}
      <div className="w-[65%] max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex" style={{ height: '85vh', maxHeight: '520px' }}>
        
        {/* Left Panel - Branding */}
        <div className="hidden md:flex md:w-[42%] relative flex-col items-center justify-center p-6 bg-white">
          <div className="text-center">
            {/* Back to Home */}
            <div className="flex justify-center mb-5">
              <Link href="/" className="inline-flex items-center gap-1.5 text-gray-600 hover:text-[#0D2353] hover:border-[#0D2353] transition-all text-xs font-medium border border-gray-300 rounded-full px-4 py-1.5 bg-white shadow-sm hover:shadow">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back to Home
              </Link>
            </div>

            <h1 className="text-base font-bold text-[#0D2353] mb-1.5">JK Staffing & Services Management Ltd</h1>
            <p className="text-gray-400 text-xs leading-relaxed mb-5">
              The secure portal for managing your enterprise content and operations.
            </p>

            {/* Logo Image */}
            <div className="rounded-lg overflow-hidden shadow-sm border border-gray-100 mx-auto max-w-[220px]">
              <Image
                src="/assets/images/logo.jpg"
                alt="JK Staffing Logo"
                width={220}
                height={150}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="hidden md:block w-px bg-gray-200" />

        {/* Right Panel - Login Form */}
        <div className="w-full md:w-[58%] flex items-center justify-center px-8 py-6">
          <div className="w-full max-w-xs">
            
            {/* Mobile Back to Home */}
            <Link href="/" className="md:hidden flex items-center gap-1.5 text-gray-500 hover:text-[#0D2353] transition-colors text-xs font-medium mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Home
            </Link>

            {/* Logo */}
            <div className="flex justify-center mb-3">
              <Image
                src="/assets/images/app_logo.png"
                alt="JK Staffing Logo"
                width={100}
                height={50}
                className="h-10 w-auto object-contain"
                priority
              />
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-5">
              <h2 className="text-lg font-bold text-[#0D2353]">Welcome Back</h2>
              <p className="text-gray-400 mt-0.5 text-xs">Sign in to continue to Admin Dashboard</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-xs font-medium flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0D2353]/15 focus:border-[#0D2353] outline-none transition-all text-gray-700 placeholder-gray-400 text-sm"
                    placeholder="Enter the email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0D2353]/15 focus:border-[#0D2353] outline-none transition-all text-gray-700 placeholder-gray-400 text-sm"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0D2353] text-white font-semibold py-2.5 rounded-lg hover:bg-[#1A4B9E] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In To Dashboard'
                )}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-gray-400 text-[10px] mt-6">
              © {new Date().getFullYear()} JK Staffing & Services Management Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

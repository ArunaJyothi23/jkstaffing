'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCollection, createDocument, updateDocument, deleteDocument } from '@/lib/firebase/db';

type Job = {
  id?: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string;
};

import { Suspense } from 'react';

export default function JobsAdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobsAdminContent />
    </Suspense>
  );
}

function JobsAdminContent() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job>({
    title: '', location: '', type: 'Full-time', salary: '', description: ''
  });
  
  const [activeModal, setActiveModal] = useState<{ type: 'delete' | 'success' | 'error', id?: string, message?: string } | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    fetchJobs();
    
    // Check if coming from the "+ Post" header button
    if (searchParams.get('action') === 'new') {
      setIsEditing(true);
    }
  }, [searchParams]);

  const fetchJobs = async () => {
    try {
      const data = await getCollection<Job>('job_postings');
      setJobs(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentJob.id) {
        await updateDocument('job_postings', currentJob.id, currentJob);
      } else {
        await createDocument('job_postings', currentJob);
      }
      setIsEditing(false);
      fetchJobs();
      setActiveModal({ type: 'success', message: 'Job saved successfully!' });
    } catch (e) {
      console.error(e);
      setActiveModal({ type: 'error', message: 'Failed to save job.' });
    }
  };

  const handleEdit = (job: Job) => {
    setCurrentJob(job);
    setIsEditing(true);
  };

  const confirmDelete = (id: string) => {
    setActiveModal({ type: 'delete', id });
  };

  const executeDelete = async () => {
    if (!activeModal?.id) return;
    try {
      await deleteDocument('job_postings', activeModal.id);
      fetchJobs();
      setActiveModal({ type: 'success', message: 'Job deleted successfully.' });
    } catch (e) {
      console.error(e);
      setActiveModal({ type: 'error', message: 'Failed to delete job.' });
    }
  };

  const handleAddNew = () => {
    setCurrentJob({ title: '', location: '', type: 'Full-time', salary: '', description: '' });
    setIsEditing(true);
  };

  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Postings</h1>
        {!isEditing && (
          <button onClick={handleAddNew} className="bg-[#FF6B2C] hover:bg-[#E55A1F] text-white px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
            <span>+ New Job</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-4xl">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input required type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={currentJob.title} onChange={e => setCurrentJob({...currentJob, title: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input required type="text" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={currentJob.location} onChange={e => setCurrentJob({...currentJob, location: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={currentJob.type} onChange={e => setCurrentJob({...currentJob, type: e.target.value})}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Temporary</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
              <input type="text" placeholder="e.g. £30,000 - £40,000" className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={currentJob.salary} onChange={e => setCurrentJob({...currentJob, salary: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea required rows={5} className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FF6B2C] outline-none" value={currentJob.description} onChange={e => setCurrentJob({...currentJob, description: e.target.value})} />
            </div>
            <div className="flex gap-3 pt-4">
              <button type="submit" className="bg-[#FF6B2C] hover:bg-[#E55A1F] text-white px-6 py-2.5 rounded-lg font-medium transition-colors">Save Job</button>
              <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-lg font-medium transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
              <tr>
                <th className="p-4 font-medium">Job Title</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{job.title}</td>
                  <td className="p-4 text-gray-600">{job.location}</td>
                  <td className="p-4 text-gray-600">
                    <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-medium">{job.type}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleEdit(job)} className="text-blue-500 hover:text-blue-700 font-medium text-sm mr-4">Edit</button>
                    <button onClick={() => confirmDelete(job.id!)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No jobs posted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* CUSTOM MODAL OVERLAY */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-in fade-in zoom-in duration-200">
            
            {activeModal.type === 'delete' && (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Job?</h3>
                <p className="text-sm text-gray-500 mb-6">This action cannot be undone. Are you sure you want to delete this job posting?</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors w-full">Cancel</button>
                  <button onClick={executeDelete} className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors w-full">Delete</button>
                </div>
              </div>
            )}

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

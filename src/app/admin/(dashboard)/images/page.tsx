'use client';

import { useState, useEffect, useRef } from 'react';

export default function ImagesMediaPage() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Modal State
  const [activeModal, setActiveModal] = useState<{ type: 'delete' | 'success' | 'error', url?: string, message?: string } | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/images');
      if (!res.ok) throw new Error('Failed to fetch images');
      const data = await res.json();
      setImages(data.urls || []);
    } catch (error) {
      console.error("Failed to load images", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!res.ok) throw new Error('Upload failed');
        
        await fetchImages();
        setActiveModal({ type: 'success', message: 'Image uploaded successfully!' });
      } catch (error) {
        console.error("Upload failed", error);
        setActiveModal({ type: 'error', message: 'Upload failed. Please try again.' });
      } finally {
        setUploading(false);
        // Reset input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const copyToClipboard = (url: string) => {
    const absoluteUrl = url.startsWith('http') ? url : window.location.origin + url;
    navigator.clipboard.writeText(absoluteUrl);
    setActiveModal({ type: 'success', message: 'URL copied to clipboard!' });
  };

  const confirmDelete = (url: string) => {
    setActiveModal({ type: 'delete', url });
  };

  const executeDelete = async () => {
    if (!activeModal?.url) return;
    try {
      const filename = activeModal.url.split('/').pop();
      if (!filename) return;

      const res = await fetch(`/api/images/${filename}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      
      await fetchImages();
      setActiveModal({ type: 'success', message: 'Image deleted successfully.' });
    } catch (error) {
      console.error("Delete failed", error);
      setActiveModal({ type: 'error', message: 'Failed to delete image.' });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Images & Media</h1>
        <button 
          onClick={handleUploadClick}
          disabled={uploading}
          className="bg-[#FF6B2C] hover:bg-[#E55A1F] text-white px-5 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <span>{uploading ? 'Uploading...' : '+ Upload Image'}</span>
        </button>
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-gray-100 rounded-xl aspect-square animate-pulse border border-gray-200"></div>
          ))}
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((url, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
              <div className="aspect-square bg-gray-50 relative">
                <img src={url} alt={`Media ${i}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => copyToClipboard(url)} className="bg-white text-gray-800 p-2 rounded-lg hover:bg-gray-100" title="Copy URL">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  </button>
                  <button onClick={() => confirmDelete(url)} className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600" title="Delete Image">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          </div>
          <h3 className="text-gray-800 font-bold text-lg mb-1">No images uploaded yet</h3>
          <p className="text-gray-500 text-sm">Upload images to use them across your website.</p>
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Image?</h3>
                <p className="text-sm text-gray-500 mb-6">This action cannot be undone. Are you sure you want to permanently delete this image?</p>
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

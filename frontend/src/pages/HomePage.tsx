import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrls from '../components/UserUrls';

export default function HomePage(){
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-xl font-bold mb-4">TinyLink — URL Shortener</h1>
          <UrlForm onCreated={()=>{ /* optionally refresh */ }} />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-3">Your Links</h2>
          <UserUrls />
        </div>
      </div>
    </div>
  );
}

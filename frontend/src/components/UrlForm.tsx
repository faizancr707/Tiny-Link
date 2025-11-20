import React, { useState } from 'react';
import { createShortLink } from '../api/links.api';

export default function UrlForm({ onCreated }:{ onCreated?:()=>void }){
  const [url, setUrl] = useState('https://');
  const [code, setCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    setError('');
    // basic validation
    try {
      setLoading(true);
      if (!/^https?:\/\//i.test(url)) throw new Error('URL must start with http:// or https://');
      if (code && !/^[A-Za-z0-9]{6,8}$/.test(code)) throw new Error('Custom code must be 6-8 alphanumeric chars');
      const res = await createShortLink(url, code || undefined);
      setShortUrl(res.shortUrl);
      setCode('');
      setUrl('');
      onCreated?.();
    } catch (err:any) {
      setError(err.response?.data?.message || err.message || 'Failed to create');
    } finally { setLoading(false); }
  };

  const copy = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm">Long URL</label>
        <input className="w-full p-2 border" value={url} onChange={e=>setUrl(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Custom code (optional)</label>
        <input className="w-full p-2 border" placeholder="6-8 alphanumeric" value={code} onChange={e=>setCode(e.target.value)} />
      </div>
      <div>
        <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Creating...' : 'Shorten URL'}
        </button>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {shortUrl && (
        <div className="mt-2">
          <input className="p-2 border w-full" readOnly value={shortUrl} />
          <div className="mt-1">
            <button className="mt-1 px-3 py-1 border" onClick={copy} type="button">Copy</button>
          </div>
        </div>
      )}
    </form>
  );
}

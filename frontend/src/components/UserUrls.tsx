import React, { useEffect, useState } from 'react';
import { listLinks, deleteLink } from '../api/links.api';

export default function UserUrls(){
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await listLinks();
      setLinks(data);
    } catch (err:any) {
      setError(err.message || 'Failed to load');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load() }, []);

  const onDelete = async (code:string) => {
    if(!confirm('Delete this link?')) return;
    await deleteLink(code);
    load();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (links.length===0) return <div>No links yet</div>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 text-left">Code</th>
            <th className="px-2 py-1 text-left">Target</th>
            <th className="px-2 py-1 text-left">Clicks</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map(l => (
            <tr key={l.code} className="border-t">
              <td className="px-2 py-1"><a href={l.code}>{l.code}</a></td>
              <td className="px-2 py-1 truncate max-w-xs">{l.url}</td>
              <td className="px-2 py-1">{l.clicks}</td>
              <td className="px-2 py-1">
                <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={()=>onDelete(l.code)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

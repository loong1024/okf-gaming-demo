import type { SearchResponse, ContextResponse } from '../types';

export async function searchCatalog(query: string, limit = 5): Promise<SearchResponse> {
  const res = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, limit }),
  });
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function getContext(entryName: string): Promise<ContextResponse> {
  const res = await fetch(`/api/context?entry_name=${encodeURIComponent(entryName)}`);
  if (!res.ok) throw new Error('Context lookup failed');
  return res.json();
}

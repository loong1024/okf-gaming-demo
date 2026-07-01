import { useState, useCallback } from 'react';
import type { SearchResult, ContextResponse } from './types';
import { searchCatalog, getContext } from './utils/api';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import ContextDetail from './components/ContextDetail';
import { SearchSkeleton, ContextSkeleton } from './components/LoadingState';
import ErrorToast from './components/ErrorToast';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<SearchResult | null>(null);
  const [context, setContext] = useState<ContextResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingContext, setIsLoadingContext] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);
    setError(null);
    setHasSearched(true);
    setSelectedEntry(null);
    setContext(null);

    try {
      const data = await searchCatalog(searchQuery);
      setResults(data.results);
    } catch {
      setError('Search failed. Please try again.');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSelectResult = useCallback(async (result: SearchResult) => {
    setSelectedEntry(result);
    setIsLoadingContext(true);
    setError(null);

    try {
      const data = await getContext(result.entry_name);
      setContext(data);
    } catch {
      setError('Failed to load entry details.');
      setSelectedEntry(null);
    } finally {
      setIsLoadingContext(false);
    }
  }, []);

  const handleCloseContext = useCallback(() => {
    setSelectedEntry(null);
    setContext(null);
    setIsLoadingContext(false);
  }, []);

  const handleDismissError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="app">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-brand">
          <svg className="top-bar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
          <span className="top-bar-title">Dataplex</span>
        </div>
      </header>

      {/* Search Area */}
      <div className="search-area">
        <SearchBar
          onSearch={handleSearch}
          initialQuery={query}
        />
        {hasSearched && (
          <span className="search-subtitle">Natural language search results</span>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="results-panel">
          {!hasSearched && (
            <div className="initial-state">
              <svg
                className="initial-state-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="initial-state-text">
                Enter a search query to discover data assets
              </p>
            </div>
          )}

          {hasSearched && isSearching && <SearchSkeleton />}

          {hasSearched && !isSearching && (
            <ResultsList
              results={results}
              query={query}
              onSelectResult={handleSelectResult}
            />
          )}
        </div>

        {/* Context Detail Panel */}
        {selectedEntry && isLoadingContext && <ContextSkeleton />}
        {selectedEntry && context && !isLoadingContext && (
          <ContextDetail context={context} onClose={handleCloseContext} />
        )}
      </div>

      {/* Error Toast */}
      {error && <ErrorToast message={error} onDismiss={handleDismissError} />}
    </div>
  );
}

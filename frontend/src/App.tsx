import { useState, useCallback, useEffect } from 'react';
import type { SearchResult, ContextResponse } from './types';
import { searchCatalog, getContext } from './utils/api';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';
import ContextDetail from './components/ContextDetail';
import { SearchSkeleton, ContextSkeleton } from './components/LoadingState';
import ErrorToast from './components/ErrorToast';
import ArchitectureDiagram from './components/ArchitectureDiagram';

const suggestedQueries = [
  'player retention analysis',
  'in-app purchase revenue',
  'level completion funnel',
  'user acquisition channels',
  'churn prediction',
  'daily active users',
];

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<SearchResult | null>(null);
  const [context, setContext] = useState<ContextResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingContext, setIsLoadingContext] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const goHome = useCallback(() => {
    setQuery('');
    setResults([]);
    setSelectedEntry(null);
    setContext(null);
    setHasSearched(false);
    setError(null);
  }, []);

  const performSearch = useCallback(async (searchQuery: string) => {
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

  const handleSearch = useCallback(async (searchQuery: string) => {
    window.history.pushState({ view: 'results', query: searchQuery }, '');
    performSearch(searchQuery);
  }, [performSearch]);

  const handleSelectResult = useCallback(async (result: SearchResult) => {
    window.history.pushState({ view: 'detail' }, '');
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
    window.history.back();
  }, []);

  const handleGoHome = useCallback(() => {
    window.history.pushState({ view: 'home' }, '');
    goHome();
  }, [goHome]);

  useEffect(() => {
    window.history.replaceState({ view: 'home' }, '');

    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;
      if (!state || state.view === 'home') {
        goHome();
      } else if (state.view === 'results') {
        setSelectedEntry(null);
        setContext(null);
        setIsLoadingContext(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [goHome]);

  const handleDismissError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="app">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar-brand" onClick={handleGoHome} style={{ cursor: 'pointer' }}>
          <svg className="top-bar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19h0c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75h0c1.55 0 2.74-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
          </svg>
          <span className="top-bar-title">Game Analytics Catalog</span>
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
            <div className="hero-section">
              <svg
                className="hero-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.58 16.09l-1.09-7.66C20.21 6.46 18.52 5 16.53 5H7.47C5.48 5 3.79 6.46 3.51 8.43l-1.09 7.66C2.2 17.63 3.39 19 4.94 19h0c.68 0 1.32-.27 1.8-.75L9 16h6l2.25 2.25c.48.48 1.13.75 1.8.75h0c1.55 0 2.74-1.37 2.53-2.91zM11 11H9v2H8v-2H6v-1h2V8h1v2h2v1zm4 2c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
              <h1 className="hero-title">Game Analytics Data Catalog</h1>
              <p className="hero-subtitle">
                Discover and understand your game data assets with natural language search
              </p>
              <p className="hero-stats">
                17 tables &middot; 4 data layers &middot; Powered by Knowledge Catalog
              </p>
              <div className="suggestion-chips">
                {suggestedQueries.map((sq) => (
                  <button
                    key={sq}
                    className="suggestion-chip"
                    onClick={() => handleSearch(sq)}
                  >
                    {sq}
                  </button>
                ))}
              </div>

              {/* Demo Info Section */}
              <div className="demo-info">
                <div className="demo-info-grid">
                  <div className="demo-info-card">
                    <div className="demo-info-card-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                    </div>
                    <h3 className="demo-info-card-title">演示场景</h3>
                    <p className="demo-info-card-text">
                      一家手游公司（Flood-It! 益智游戏）使用 Google Cloud 管理其分析数据资产。数据分析师和产品经理可以通过自然语言搜索发现任意数据表，无需了解表名或编写 SQL。
                    </p>
                  </div>

                  <div className="demo-info-card">
                    <div className="demo-info-card-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2 10H6v-2h12v2zm0-4H6v-2h12v2z" />
                      </svg>
                    </div>
                    <h3 className="demo-info-card-title">数据资产</h3>
                    <p className="demo-info-card-text">
                      涵盖 <strong>17 张 BigQuery 数据表</strong>、<strong>168 个字段</strong>，分为 4 个数据层：原始事件层（GA4/Firebase 打点）、聚合指标层（DAU、收入、留存、漏斗）、维度表、以及 ML 应用层（LTV 预测、流失风险、A/B 实验结果）。
                    </p>
                  </div>

                  <div className="demo-info-card">
                    <div className="demo-info-card-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                      </svg>
                    </div>
                    <h3 className="demo-info-card-title">涉及的 Google Cloud 服务</h3>
                    <p className="demo-info-card-text">
                      基于 <strong>Knowledge Catalog</strong> 提供语义搜索能力，元数据通过 <strong>OKF（Open Knowledge Format）</strong>标准格式定义。应用部署在 <strong>Cloud Run</strong> 上，数据存储于 <strong>BigQuery</strong>。
                    </p>
                  </div>

                  <div className="demo-info-card">
                    <div className="demo-info-card-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </svg>
                    </div>
                    <h3 className="demo-info-card-title">核心能力</h3>
                    <p className="demo-info-card-text">
                      <strong>语义搜索</strong> —— 理解搜索意图，而非简单的关键词匹配。例如搜索"如何降低玩家流失"，系统会自动找到流失预测、留存分析、用户参与度等相关数据表。
                    </p>
                  </div>
                </div>
              </div>

              {/* Architecture Diagram */}
              <ArchitectureDiagram />
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

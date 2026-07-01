import type { SearchResult } from '../types';
import ResultItem from './ResultCard';

interface ResultsListProps {
  results: SearchResult[];
  query: string;
  onSelectResult: (result: SearchResult) => void;
}

export default function ResultsList({ results, query, onSelectResult }: ResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="empty-state">
        <svg
          className="empty-state-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
        <h3 className="empty-state-title">No results found</h3>
        <p className="empty-state-text">
          No data assets match "{query}". Try different keywords.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="results-header">
        <span className="results-count">
          About {results.length} result{results.length !== 1 ? 's' : ''}
        </span>
      </div>
      <div className="results-list">
        {results.map((result) => (
          <ResultItem
            key={result.entry_name}
            result={result}
            onClick={onSelectResult}
          />
        ))}
      </div>
    </div>
  );
}

import type { SearchResult } from '../types';

interface ResultItemProps {
  result: SearchResult;
  onClick: (result: SearchResult) => void;
}

function getDisplayName(result: SearchResult): string {
  if (result.display_name) return result.display_name;
  // Fallback: last segment of entry_name
  const parts = result.entry_name.split('/');
  return parts[parts.length - 1] || result.entry_name;
}

export default function ResultItem({ result, onClick }: ResultItemProps) {
  return (
    <div
      className="result-item"
      onClick={() => onClick(result)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(result);
        }
      }}
    >
      {/* Row 1: icon + name + type chip */}
      <div className="result-item-header">
        <svg
          className="result-item-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
        </svg>
        <span className="result-item-name">{getDisplayName(result)}</span>
        {result.entry_type && (
          <span className="entry-type-chip">{result.entry_type}</span>
        )}
      </div>

      {/* Row 2: description */}
      {result.description && (
        <p className="result-item-description">{result.description}</p>
      )}

      {/* Row 3: metadata */}
      <div className="result-item-meta">
        {result.system && (
          <>
            <span>{result.system}</span>
            {(result.resource_path || result.fully_qualified_name) && (
              <span className="result-meta-separator">•</span>
            )}
          </>
        )}
        {result.resource_path && (
          <>
            <span>{result.resource_path}</span>
            {result.fully_qualified_name && (
              <span className="result-meta-separator">•</span>
            )}
          </>
        )}
        {result.fully_qualified_name && (
          <span>{result.fully_qualified_name}</span>
        )}
      </div>
    </div>
  );
}

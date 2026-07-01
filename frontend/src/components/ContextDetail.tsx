import { useEffect, useState, useCallback } from 'react';
import type { ContextResponse } from '../types';

interface ContextDetailProps {
  context: ContextResponse;
  onClose: () => void;
}

export default function ContextDetail({ context, onClose }: ContextDetailProps) {
  const [rawExpanded, setRawExpanded] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const parsed = context.context_parsed;
  const hasSchema = parsed?.columns && parsed.columns.length > 0;

  return (
    <div className="context-panel" role="dialog" aria-label="Entry details">
      {/* Header */}
      <div className="context-panel-header">
        <div className="context-panel-title-group">
          <h2 className="context-panel-name">{context.display_name || context.entry_name}</h2>
          {context.entry_type && (
            <span className="entry-type-chip">{context.entry_type}</span>
          )}
        </div>
        <button
          className="context-close-btn"
          onClick={onClose}
          aria-label="Close panel"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="context-panel-body">
        {/* Overview Section */}
        {parsed && (
          <div className="context-section">
            <h3 className="context-section-title">Overview</h3>
            <div className="context-kv-list">
              {parsed.system && (
                <div className="context-kv-row">
                  <span className="context-kv-key">System</span>
                  <span className="context-kv-value">{parsed.system}</span>
                </div>
              )}
              {parsed.fully_qualified_name && (
                <div className="context-kv-row">
                  <span className="context-kv-key">Fully Qualified Name</span>
                  <span className="context-kv-value mono">
                    {parsed.fully_qualified_name}
                  </span>
                </div>
              )}
              {parsed.parent && (
                <div className="context-kv-row">
                  <span className="context-kv-key">Parent</span>
                  <span className="context-kv-value mono">{parsed.parent}</span>
                </div>
              )}
              {parsed.description && (
                <div className="context-kv-row">
                  <span className="context-kv-key">Description</span>
                  <span className="context-kv-value">{parsed.description}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Schema Section */}
        {hasSchema && parsed?.columns && (
          <div className="context-section">
            <h3 className="context-section-title">
              Schema ({parsed.columns.length} column{parsed.columns.length !== 1 ? 's' : ''})
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="schema-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {parsed.columns.map((col) => (
                    <tr key={col.name}>
                      <td className="schema-col-name">{col.name}</td>
                      <td className="schema-col-type">{col.type}</td>
                      <td className="schema-col-desc">
                        {col.description || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Raw Context Section */}
        {context.context_raw && (
          <div className="context-section">
            <button
              className="raw-context-toggle"
              onClick={() => setRawExpanded(!rawExpanded)}
            >
              <svg
                className={`raw-context-chevron ${rawExpanded ? 'open' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              Raw Context
            </button>
            {rawExpanded && (
              <div className="raw-context-content">
                <pre className="raw-context-pre">{context.context_raw}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

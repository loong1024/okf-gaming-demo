export function SearchSkeleton() {
  return (
    <div>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="skeleton-item">
          <div className="skeleton-row">
            <div className="skeleton-block" style={{ width: 20, height: 20 }} />
            <div className="skeleton-block" style={{ width: 200, height: 16 }} />
            <div className="skeleton-block" style={{ width: 60, height: 16 }} />
          </div>
          <div className="skeleton-row" style={{ paddingLeft: 28 }}>
            <div className="skeleton-block" style={{ width: '80%', height: 14 }} />
          </div>
          <div className="skeleton-row" style={{ paddingLeft: 28 }}>
            <div className="skeleton-block" style={{ width: 80, height: 12 }} />
            <div className="skeleton-block" style={{ width: 120, height: 12 }} />
            <div className="skeleton-block" style={{ width: 160, height: 12 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContextSkeleton() {
  return (
    <div className="context-panel">
      <div className="context-skeleton-header">
        <div className="skeleton-block" style={{ width: '60%', height: 18, marginBottom: 8 }} />
        <div className="skeleton-block" style={{ width: 60, height: 16 }} />
      </div>
      <div className="context-skeleton-body">
        {/* Overview skeleton */}
        <div className="context-skeleton-section">
          <div className="skeleton-block" style={{ width: 80, height: 12, marginBottom: 16 }} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton-row">
              <div className="skeleton-block" style={{ width: 100, height: 12 }} />
              <div className="skeleton-block" style={{ width: 200, height: 12 }} />
            </div>
          ))}
        </div>
        {/* Schema skeleton */}
        <div className="context-skeleton-section">
          <div className="skeleton-block" style={{ width: 80, height: 12, marginBottom: 16 }} />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-row">
              <div className="skeleton-block" style={{ width: 80, height: 12 }} />
              <div className="skeleton-block" style={{ width: 60, height: 12 }} />
              <div className="skeleton-block" style={{ width: 160, height: 12 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

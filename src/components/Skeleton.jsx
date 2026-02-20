import './Skeleton.css';

const Skeleton = ({ width, height, borderRadius, className = '' }) => {
    return (
        <div
            className={`skeleton ${className}`}
            style={{
                width: width || '100%',
                height: height || '20px',
                borderRadius: borderRadius || 'var(--radius-md)',
            }}
        />
    );
};

export const SkeletonCard = ({ height = 140 }) => (
    <div className="skeleton-card" style={{ height }}>
        <Skeleton height="16px" width="60%" />
        <Skeleton height="32px" width="40%" />
        <Skeleton height="12px" width="80%" />
        <Skeleton height="12px" width="50%" />
    </div>
);

export const SkeletonTable = ({ rows = 5, cols = 5 }) => (
    <div className="skeleton-table">
        <div className="skeleton-table-header">
            {Array.from({ length: cols }).map((_, i) => (
                <Skeleton key={i} height="14px" width="80%" />
            ))}
        </div>
        {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="skeleton-table-row">
                {Array.from({ length: cols }).map((_, c) => (
                    <Skeleton key={c} height="14px" width={`${50 + Math.random() * 40}%`} />
                ))}
            </div>
        ))}
    </div>
);

export const SkeletonChart = ({ height = 200 }) => (
    <div className="skeleton-chart" style={{ height }}>
        <Skeleton height="14px" width="30%" />
        <div className="skeleton-chart-bars">
            {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton
                    key={i}
                    width="12%"
                    height={`${30 + Math.random() * 60}%`}
                    borderRadius="var(--radius-sm) var(--radius-sm) 0 0"
                />
            ))}
        </div>
    </div>
);

export default Skeleton;

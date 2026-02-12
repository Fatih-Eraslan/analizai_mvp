import './ScoreCard.css';

const ScoreCard = ({ score, label, size = 'md', trend = null }) => {
    const sizes = { sm: 64, md: 96, lg: 140 };
    const dim = sizes[size];
    const strokeWidth = size === 'lg' ? 6 : 4;
    const radius = (dim - strokeWidth * 2) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getColor = (s) => {
        if (s >= 75) return '#10b981';
        if (s >= 50) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className={`score-card score-card-${size}`}>
            <div className="score-ring" style={{ width: dim, height: dim }}>
                <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
                    <circle
                        className="score-track"
                        cx={dim / 2}
                        cy={dim / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        className="score-fill"
                        cx={dim / 2}
                        cy={dim / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        style={{ stroke: getColor(score) }}
                    />
                </svg>
                <span className={`score-value score-value-${size}`}>{score}</span>
            </div>
            {label && <p className="score-label">{label}</p>}
            {trend !== null && (
                <span className={`score-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
                    {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                </span>
            )}
        </div>
    );
};

export default ScoreCard;

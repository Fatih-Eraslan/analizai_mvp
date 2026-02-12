import './ChartPlaceholder.css';

const ChartPlaceholder = ({ type = 'bar', title = '', height = 200 }) => {
    const renderBars = () => (
        <div className="chart-bars">
            {[65, 40, 80, 55, 90, 45, 70].map((h, i) => (
                <div
                    key={i}
                    className="chart-bar"
                    style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.08}s`,
                    }}
                />
            ))}
        </div>
    );

    const renderLine = () => (
        <svg className="chart-line-svg" viewBox="0 0 300 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(99,102,241,0.3)" />
                    <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                </linearGradient>
            </defs>
            <path
                className="chart-line-area"
                d="M0,80 Q30,60 60,65 T120,40 T180,50 T240,25 T300,35 V100 H0 Z"
                fill="url(#lineGrad)"
            />
            <path
                className="chart-line-path"
                d="M0,80 Q30,60 60,65 T120,40 T180,50 T240,25 T300,35"
                fill="none"
                stroke="#818cf8"
                strokeWidth="2"
            />
        </svg>
    );

    const renderPie = () => (
        <div className="chart-pie">
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--bg-tertiary)" strokeWidth="20" />
                <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="20"
                    strokeDasharray="100 151"
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                />
                <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="20"
                    strokeDasharray="60 191"
                    strokeDashoffset="-100"
                    transform="rotate(-90 50 50)"
                />
                <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="20"
                    strokeDasharray="40 211"
                    strokeDashoffset="-160"
                    transform="rotate(-90 50 50)"
                />
            </svg>
        </div>
    );

    return (
        <div className="chart-placeholder" style={{ height }}>
            {title && <p className="chart-title">{title}</p>}
            <div className="chart-content">
                {type === 'bar' && renderBars()}
                {type === 'line' && renderLine()}
                {type === 'pie' && renderPie()}
            </div>
        </div>
    );
};

export default ChartPlaceholder;

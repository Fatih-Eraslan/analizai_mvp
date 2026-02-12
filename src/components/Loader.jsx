import './Loader.css';

const Loader = ({ size = 48, progress = null, label = '' }) => {
    const radius = (size - 6) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = progress !== null ? circumference - (progress / 100) * circumference : 0;

    return (
        <div className="loader-container">
            {progress !== null ? (
                <div className="loader-progress" style={{ width: size, height: size }}>
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                        <circle
                            className="loader-track"
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            strokeWidth="4"
                        />
                        <circle
                            className="loader-fill"
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            strokeWidth="4"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                        />
                    </svg>
                    <span className="loader-percentage">{Math.round(progress)}%</span>
                </div>
            ) : (
                <div className="loader-ring" style={{ width: size, height: size }}>
                    <div className="loader-ring-inner" />
                </div>
            )}
            {label && <p className="loader-label">{label}</p>}
        </div>
    );
};

export default Loader;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import Loader from '../components/Loader';
import './LoadingAnalysis.css';

const analysisSteps = [
    { label: 'Collecting business data', icon: Database, duration: 2000 },
    { label: 'Running AI analysis', icon: Brain, duration: 2500 },
    { label: 'Generating insights', icon: Sparkles, duration: 2000 },
    { label: 'Preparing results', icon: CheckCircle2, duration: 1000 },
];

const LoadingAnalysis = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [currentStepIdx, setCurrentStepIdx] = useState(0);

    useEffect(() => {
        const totalDuration = analysisSteps.reduce((s, st) => s + st.duration, 0);
        const interval = 50;
        let elapsed = 0;

        const timer = setInterval(() => {
            elapsed += interval;
            const pct = Math.min((elapsed / totalDuration) * 100, 100);
            setProgress(pct);

            // Determine current step
            let cumulative = 0;
            for (let i = 0; i < analysisSteps.length; i++) {
                cumulative += analysisSteps[i].duration;
                if (elapsed < cumulative) {
                    setCurrentStepIdx(i);
                    break;
                }
            }

            if (elapsed >= totalDuration) {
                clearInterval(timer);
                setTimeout(() => navigate('/results'), 500);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="loading-page">
            <div className="loading-bg-orb loading-orb-1" />
            <div className="loading-bg-orb loading-orb-2" />

            <div className="loading-content animate-scale-in">
                <Loader size={120} progress={progress} />

                <h2 className="loading-title">Analyzing Your Business</h2>
                <p className="loading-subtitle">Our AI is processing your data</p>

                <div className="loading-steps">
                    {analysisSteps.map((step, i) => {
                        const Icon = step.icon;
                        const status = i < currentStepIdx ? 'done' : i === currentStepIdx ? 'active' : 'pending';
                        return (
                            <div key={i} className={`loading-step ${status}`}>
                                <div className="loading-step-icon">
                                    {status === 'done' ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                                </div>
                                <span>{step.label}</span>
                                {status === 'active' && <div className="loading-step-pulse" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LoadingAnalysis;

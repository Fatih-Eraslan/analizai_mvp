import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Sparkles } from 'lucide-react';
import './Splash.css';

const Splash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 2800);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash">
            <div className="splash-bg-orb splash-orb-1" />
            <div className="splash-bg-orb splash-orb-2" />
            <div className="splash-bg-orb splash-orb-3" />

            <div className="splash-content">
                <div className="splash-logo-container">
                    <div className="splash-logo">
                        <BarChart3 size={40} />
                    </div>
                    <div className="splash-ring" />
                </div>

                <h1 className="splash-title">AnalizAI</h1>
                <p className="splash-tagline">
                    <Sparkles size={14} />
                    AI-Powered Business Intelligence
                </p>
            </div>

            <div className="splash-loader">
                <div className="splash-loader-bar" />
            </div>
        </div>
    );
};

export default Splash;

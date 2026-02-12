import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <div className="navbar-brand" onClick={() => navigate('/dashboard')}>
                    <div className="navbar-logo">
                        <BarChart3 size={24} />
                    </div>
                    <span className="navbar-title">AnalizAI</span>
                </div>

                <div className="navbar-links">
                    <button
                        className={`navbar-link ${currentPath === '/dashboard' ? 'active' : ''}`}
                        onClick={() => navigate('/dashboard')}
                    >
                        Panel
                    </button>
                    <button
                        className={`navbar-link ${currentPath === '/add-analysis' ? 'active' : ''}`}
                        onClick={() => navigate('/add-analysis')}
                    >
                        Yeni Analiz
                    </button>
                    <button
                        className={`navbar-link ${currentPath === '/profile' ? 'active' : ''}`}
                        onClick={() => navigate('/profile')}
                    >
                        Profil
                    </button>
                </div>

                <div className="navbar-profile" onClick={() => navigate('/profile')}>
                    <div className="navbar-avatar">A</div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

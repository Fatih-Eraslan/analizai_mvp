import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, User } from 'lucide-react';
import './BottomNav.css';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/add-analysis', label: 'Analyze', icon: PlusCircle },
    { path: '/profile', label: 'Profile', icon: User },
];

const BottomNav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                    <button
                        key={item.path}
                        className={`bottom-nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => navigate(item.path)}
                    >
                        <div className="bottom-nav-icon-wrap">
                            <Icon size={22} />
                            {isActive && <div className="bottom-nav-indicator" />}
                        </div>
                        <span className="bottom-nav-label">{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNav;

import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, DollarSign, MessageSquare,
    TrendingUp, Megaphone, FileText, CreditCard,
    ChevronLeft, ChevronRight, Store, LogOut, UserCircle
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/rakipler', label: 'Rakipler', icon: Users },
    { path: '/fiyat-analizi', label: 'Fiyat Analizi', icon: DollarSign },
    { path: '/yorum-analizi', label: 'Yorum Analizi', icon: MessageSquare },
    { path: '/mahalle-trendleri', label: 'Mahalle Trendleri', icon: TrendingUp },
    { path: '/kampanya-onerileri', label: 'Kampanya Önerileri', icon: Megaphone },
    { path: '/raporlar', label: 'Raporlar', icon: FileText },
    { path: '/abonelik', label: 'Abonelik', icon: CreditCard },
];

const Sidebar = ({ collapsed, onToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();

    /* Read user info from localStorage */
    let userName = 'Kullanıcı';
    let userPlan = 'Pro Plan';
    try {
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        if (stored.name) userName = stored.name;
        if (stored.plan) userPlan = stored.plan;
    } catch { /* ignore */ }

    const handleLogout = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <>
            <div className={`sidebar-overlay ${!collapsed ? 'visible' : ''}`} onClick={onToggle} />
            <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand" onClick={() => navigate('/dashboard')}>
                        <div className="sidebar-logo">
                            <Store size={22} />
                        </div>
                        <div className="sidebar-brand-text">
                            <span className="sidebar-title">Mahalle Rekabet</span>
                            <span className="sidebar-subtitle">Asistanı</span>
                        </div>
                    </div>
                    <button className="sidebar-toggle" onClick={onToggle}>
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                className={`sidebar-link ${isActive ? 'active' : ''}`}
                                onClick={() => navigate(item.path)}
                                title={collapsed ? item.label : ''}
                            >
                                <Icon size={20} />
                                <span className="sidebar-link-text">{item.label}</span>
                                {isActive && <div className="sidebar-active-indicator" />}
                            </button>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user" onClick={() => navigate('/profil')} style={{ cursor: 'pointer' }}>
                        <div className="sidebar-avatar">{userName.charAt(0).toUpperCase()}</div>
                        <div className="sidebar-user-info">
                            <span className="sidebar-user-name">{userName}</span>
                            <span className="sidebar-user-plan">{userPlan}</span>
                        </div>
                    </div>
                    <button className="sidebar-link sidebar-profile-link" onClick={() => navigate('/profil')} title={collapsed ? 'Profil' : ''}>
                        <UserCircle size={20} />
                        <span className="sidebar-link-text">Profil</span>
                    </button>
                    <button className="sidebar-link logout-link" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span className="sidebar-link-text">Çıkış</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Users, DollarSign, MessageSquare,
    TrendingUp, Megaphone, FileText, CreditCard,
    ChevronLeft, ChevronRight, Store, LogOut
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
    { path: '/mahalle', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/mahalle/rakipler', label: 'Rakipler', icon: Users },
    { path: '/mahalle/fiyat-analizi', label: 'Fiyat Analizi', icon: DollarSign },
    { path: '/mahalle/yorum-analizi', label: 'Yorum Analizi', icon: MessageSquare },
    { path: '/mahalle/trendler', label: 'Mahalle Trendleri', icon: TrendingUp },
    { path: '/mahalle/kampanyalar', label: 'Kampanya Önerileri', icon: Megaphone },
    { path: '/mahalle/raporlar', label: 'Raporlar', icon: FileText },
    { path: '/mahalle/abonelik', label: 'Abonelik', icon: CreditCard },
];

const Sidebar = ({ collapsed, onToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <div className={`sidebar-overlay ${!collapsed ? 'visible' : ''}`} onClick={onToggle} />
            <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-brand" onClick={() => navigate('/mahalle')}>
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
                    <div className="sidebar-user">
                        <div className="sidebar-avatar">M</div>
                        <div className="sidebar-user-info">
                            <span className="sidebar-user-name">Mehmet Bakkal</span>
                            <span className="sidebar-user-plan">Pro Plan</span>
                        </div>
                    </div>
                    <button className="sidebar-link logout-link" onClick={() => { localStorage.removeItem('mahalle_auth'); localStorage.removeItem('mahalle_user'); navigate('/mahalle/login'); }}>
                        <LogOut size={20} />
                        <span className="sidebar-link-text">Çıkış</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

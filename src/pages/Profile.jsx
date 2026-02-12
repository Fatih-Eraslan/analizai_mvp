import { useNavigate } from 'react-router-dom';
import {
    User, Mail, Bell, Palette, Globe, LogOut,
    ChevronRight, Shield, HelpCircle, Star
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import './Profile.css';

const settingsItems = [
    { label: 'Notifications', icon: Bell, description: 'Manage alerts & updates', toggle: true },
    { label: 'Appearance', icon: Palette, description: 'Dark mode & themes', toggle: true, defaultOn: true },
    { label: 'Language', icon: Globe, description: 'English (US)', toggle: false },
    { label: 'Privacy & Security', icon: Shield, description: 'Manage your data', toggle: false },
    { label: 'Help & Support', icon: HelpCircle, description: 'FAQs & Contact', toggle: false },
    { label: 'Rate AnalizAI', icon: Star, description: 'Share your feedback', toggle: false },
];

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="page-container profile-page">
            {/* Profile Header */}
            <div className="profile-header animate-fade-in-up">
                <div className="profile-avatar-large">
                    <span>A</span>
                </div>
                <h1 className="profile-name">Alex Johnson</h1>
                <p className="profile-email">
                    <Mail size={14} />
                    alex.johnson@example.com
                </p>
                <div className="profile-stats">
                    <div className="profile-stat">
                        <span className="profile-stat-value">24</span>
                        <span className="profile-stat-label">Analyses</span>
                    </div>
                    <div className="profile-stat-divider" />
                    <div className="profile-stat">
                        <span className="profile-stat-value">78.5</span>
                        <span className="profile-stat-label">Avg Score</span>
                    </div>
                    <div className="profile-stat-divider" />
                    <div className="profile-stat">
                        <span className="profile-stat-value">Pro</span>
                        <span className="profile-stat-label">Plan</span>
                    </div>
                </div>
            </div>

            {/* Settings */}
            <div className="profile-section animate-fade-in-up stagger-1">
                <h2 className="profile-section-title">Settings</h2>
                <Card hover={false} className="settings-card">
                    {settingsItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label} className="settings-item">
                                <div className="settings-left">
                                    <div className="settings-icon">
                                        <Icon size={18} />
                                    </div>
                                    <div className="settings-info">
                                        <span className="settings-label">{item.label}</span>
                                        <span className="settings-desc">{item.description}</span>
                                    </div>
                                </div>
                                {item.toggle ? (
                                    <label className="toggle-switch">
                                        <input type="checkbox" defaultChecked={item.defaultOn || false} />
                                        <span className="toggle-slider" />
                                    </label>
                                ) : (
                                    <ChevronRight size={18} className="settings-arrow" />
                                )}
                            </div>
                        );
                    })}
                </Card>
            </div>

            {/* Logout */}
            <div className="profile-logout animate-fade-in-up stagger-2">
                <Button
                    variant="outline"
                    fullWidth
                    size="lg"
                    icon={LogOut}
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Log Out
                </Button>
            </div>

            <p className="profile-version">AnalizAI v1.0.0</p>
        </div>
    );
};

export default Profile;
